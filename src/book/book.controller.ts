import { Controller, Get, Post, Put, Delete, Body, Param, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { BookService } from './book.service';
import { BookDto } from './dto/create.dto';
import { JwtGuard } from '../auth/guard/jwt.guard';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) { }

  @Get('get')
  getAll() {
    return this.bookService.getAll()
  }
  
  @UseGuards(JwtGuard)
  @Post('create')
  create(@Body() body: BookDto, @Req() req: any) {
    const token = String(req.headers.cookie).split('=')[1]
    return this.bookService.create(body, token)
  }
}
