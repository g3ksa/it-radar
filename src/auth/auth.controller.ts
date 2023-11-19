import { Body, Controller, HttpCode, HttpException, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDTO } from './dtos/singup.dto';
import { LoginResponse } from './types/loginResponse';
import { Request, Response } from 'express';
import { LoginDTO } from './dtos/login.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiCookieAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiCookieAuth('refreshToken')
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authservice: AuthService
  ) {}

  @Post('/signup')
  @HttpCode(HttpStatus.CREATED)
  @ApiOkResponse({
    description: 'Signup',
    type: LoginResponse,
    status: HttpStatus.CREATED
  })
  async signup(@Body() signupDTO: SignupDTO, @Res({ passthrough: true }) response: Response): Promise<LoginResponse> {
    const res = await this.authservice.signup(signupDTO);
    console.log(res)
    response.cookie('refreshToken', res.refreshToken, { httpOnly: true, maxAge: 2.592e+9 });
    response.send({
      accessToken: res.accessToken
    });
    return res
  }

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Login',
    type: LoginResponse,
    status: HttpStatus.OK
  })
  async login(@Body() loginDTO: LoginDTO, @Res({ passthrough: true }) response: Response): Promise<LoginResponse> {
    const res = await this.authservice.login(loginDTO);
    response.cookie('refreshToken', res.refreshToken, { httpOnly: true, maxAge: 2.592e+9 });
    return {
      accessToken: res.accessToken
    }
  }
  
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Update access token',
    type: LoginResponse,
    status: HttpStatus.OK
  })
  async refreshToken(@Req() req: Request): Promise<LoginResponse> {
    if (!req.cookies.refresh_token) {
      throw new HttpException(
        `Unauthorized`,
        HttpStatus.UNAUTHORIZED,
      );
    }
    const refreshToken = req.cookies.refresh_token.trim();
    const user = await this.authservice.validateAndDecodeJwt(refreshToken);
    return this.authservice.refreshToken(user.sub, refreshToken);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@Req() req: Request): Promise<void> {
    if (!req.cookies.refresh_token) {
      throw new HttpException(
        `Unauthorized`,
        HttpStatus.UNAUTHORIZED,
      );
    }
    const refreshToken = req.cookies.refresh_token;
    return this.authservice.logout(refreshToken);
  }
}
