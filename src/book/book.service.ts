import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {Books} from '@prisma/client'
import { BookDto } from './dto/create.dto';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class BookService {
    constructor(private readonly prisma: PrismaService, private jwtService: JwtService) { }
    
    async getAll(): Promise<Books[]> { 
        const all = await this.prisma.books.findMany()
        return all   
    }
    async create(body: BookDto, token: string): Promise<any> {
        const { title } = body
        console.log(token)
        const verifyedToken = await this.jwtService.verify(token, { secret: '1q2w3e4r' })
        const foundUserId = await this.prisma.users.findFirst({
            where:{email: verifyedToken}
        })
        if (!foundUserId) throw new NotFoundException('You have not permission to create book')
        await this.prisma.books.create({
            data: {
                title: title,
                created_by: foundUserId.id
            }
        })
        return {message: 'Successfully created book'}
    }
}
