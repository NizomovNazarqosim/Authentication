import { Injectable, BadRequestException } from '@nestjs/common'
import {JwtService} from '@nestjs/jwt'
import { CreateUserDto } from './dto/auth.dto'
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt'
import { Request, Response } from 'express';

@Injectable()
export class AuthService {
    constructor(private readonly prisma: PrismaService, private readonly jwtService: JwtService) { }
    // hashing password
    async hashPassword(password: string) {
        const saltOrRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltOrRounds)
        return hashedPassword;
    }
    // compare password 
    async comparePassword(args: {
        password: string, hash: string
    }) {
        const { password, hash } = args
        return await bcrypt.compare(password, hash)
    }
    // make token
    async signToken(email: string) {
        return this.jwtService.signAsync(email, {secret: '1q2w3e4r'})
    }
    // this user is have or not
    async isHaveUser(payload: { email: string, password: string }) {
        const { email, password } = payload
        const foundUser = await this.prisma.users.findFirst({
            where:{email: email}
        })
        return foundUser
    }
    // createnew user
    async create(body: CreateUserDto, res: Response) {
        const { password, username, email } = body
        const isHave = await this.isHaveUser({ email: email, password: password })
        if (isHave) {
            throw new BadRequestException('You are already registered')
        }
        const hashedPassword = await this.hashPassword(password)
        const created = await this.prisma.users.create({
            data: {
                name: username,
                password: hashedPassword,
                email: email,
            }
        })
        console.log(created)
        const token = await this.signToken(email)
        res.cookie('token', token)
        res.send({message: 'You are registered successfully'})
    }
    async login(body: CreateUserDto, res: Response) {
        const { email, password } = body
        const isHave = await this.isHaveUser({ email: email, password: password })
        if (!isHave) {
            throw new BadRequestException('You are not registered')
        }
        const token = await this.signToken(email)
        res.cookie('token', token)
        res.send({message: 'You are login'})
    }
    async logout(req: Request, res: Response) {
        res.clearCookie('token')
        res.send({message: 'You are logged out'})
    }
  
}
