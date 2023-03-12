import { AuthGuard } from "@nestjs/passport";
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class JwtGuard implements CanActivate {
    canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest()
        const token = String(request.headers.cookie).split('=')[1]
        if (!token) throw new UnauthorizedException('You can not go this page man')
        return true
    }

}