import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SignupDTO } from './dtos/singup.dto';
import { LoginResponse } from './types/loginResponse';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/entities/user/user.entity';
import { Repository } from 'typeorm';
import { Tokens } from './types/tokens';
import { JwtService } from '@nestjs/jwt';
import { LoginDTO } from './dtos/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService
  ) {}
  
  private hashData(data: string): Promise<string> {
    return bcrypt.hash(data, 10);
  }
  
  async generateTokens(
    userId: number,
  ): Promise<Tokens> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
        },
        {
          secret: process.env.atSecret,
          expiresIn: 60 * 15,
        },
      ),

      this.jwtService.signAsync(
        {
          sub: userId,
        },
        {
          secret: process.env.rtSecret,
          expiresIn: 60 * 60 * 24 * 30,
        },
      ),
    ]);
    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    } as Tokens;
  }
  
  async signup(signupDTO: SignupDTO): Promise<{accessToken: string, refreshToken: string}> {
    if (await this.checkIfUserExists(signupDTO.email)) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    const newUser = await this.userRepository.save({
      ...signupDTO,
      password: await this.hashData(signupDTO.password),
    })
    const tokens = await this.generateTokens(
      newUser.id,
    );
    const hashedRt = await this.hashData(tokens.refreshToken);
    await this.userRepository.save({
      ...newUser,
      hashedRt,
    })
    
    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    }
  }

  private checkIfUserExists(email: string): Promise<User> {
    return this.userRepository.findOne({
      where: {
        email,
      },
    });
  }

  async login(loginDTO: LoginDTO): Promise<{accessToken: string, refreshToken: string}> {
    if (!(await this.checkIfUserExists(loginDTO.email))) {
      throw new HttpException('User does not exist', HttpStatus.BAD_REQUEST);
    }
    const user = await this.userRepository.findOne({
      where: {
        email: loginDTO.email,
      },
    })

    const passwordMatches = await bcrypt.compare(
      loginDTO.password,
      user.password,
    )
    if (!passwordMatches) {
      throw new HttpException('Wrong password', HttpStatus.BAD_REQUEST);
    }
    const tokens = await this.generateTokens(
      user.id,
    );
    const hashedRt = await this.hashData(tokens.refreshToken);
    await this.userRepository.save({
      ...user,
      hashedRt,
    })
    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    }
  }
  
  async validateAndDecodeJwt(token: string): Promise<any> {
    try {
      const validToken = await this.jwtService.verify(token, {
        secret: process.env.rtSecret,
      });
      console.log(validToken)
      return this.jwtService.decode(token);
    } catch (err) {
      throw new HttpException('Incorrect token', HttpStatus.FORBIDDEN);
    }
  }
 
  async refreshToken(userId: number, rt: string) {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    })
    const rtMatches = await bcrypt.compare(rt, user.hashedRt);
    if (!rtMatches) {
      throw new HttpException('Incorrect refresh token', HttpStatus.FORBIDDEN);
    }
    const tokens = await this.generateTokens(
      user.id,
    );
    const hashedRt = await this.hashData(tokens.refreshToken);
    await this.userRepository.save({
      ...user,
      hashedRt,
    })
    const response: LoginResponse = {
      accessToken: tokens.accessToken,
    };
    return response;
  }

  async logout(userId: number) {
    await this.userRepository.update({id: userId}, {
      hashedRt: null,
    })
  }
}
