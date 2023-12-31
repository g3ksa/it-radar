import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/database/entities/user/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { AtStrategy } from './strategies/at.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, AtStrategy],
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({})
  ],
})
export class AuthModule {}
