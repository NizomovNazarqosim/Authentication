import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { LocalStrategy } from './strategy/local.strategy';

@Module({
  imports: [PassportModule, JwtModule],
  controllers:[AuthController],
  providers: [AuthService, PrismaService, LocalStrategy],
})
export class AuthModule {}
