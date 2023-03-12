import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { PrismaService } from '../prisma/prisma.service';
import { JwtStrategy } from '../auth/strategy/jwt.strategy';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports:[JwtModule],
  controllers: [BookController],
  providers: [BookService, PrismaService, JwtStrategy, JwtService]
})
export class BookModule {}
