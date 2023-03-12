import { Controller, Post, Body, UseGuards, Res, Get, Req} from "@nestjs/common";
import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "./dto/auth.dto";
import { LocalGuard } from "./guard/local.guard";

@Controller('auth')
export class AuthController {
    constructor(private readonly service: AuthService) { }
    
    @UseGuards(LocalGuard)
    @Post('register')
    register(@Body() body: CreateUserDto, @Res() res: Response) {
        console.log(body)
       return this.service.create(body, res)
    }

    @UseGuards(LocalGuard)
    @Post('login')
    login(@Body() body: CreateUserDto, @Res() res: Response) {
        console.log(body)
       return this.service.login(body, res)
    }

    @Get('logout')
    logout(@Req() req: Request, @Res() res: Response) {
        return this.service.logout(req, res)
    }
    
}