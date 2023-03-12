// import { PassportStrategy } from '@nestjs/passport';
// import { ExtractJwt, Strategy } from 'passport-jwt';
// import {Request} from 'express'
// import { Injectable } from '@nestjs/common';

export interface CustomRequest extends Request {
    userId: string;
}

// export class JwtStrategy extends PassportStrategy(Strategy) {
//     constructor() {
//         super({
//             jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//             ignoreExpiration: false,
//             secretOrKey: '1q2w3e4r',
//             passReqToCallback: true,
//             pass: true
//         })
//     }
//     async validate(req: CustomRequest, payload: any) {
//         console.log( 'payload pastdda', req)
//         req.userId = payload;
//         console.log(payload, 'payload ', req)
//         return payload
//     }
// }
// 
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
constructor() {
super({
  jwtFromRequest: ExtractJwt.fromExtractors([
    JwtStrategy.extractJWT,
    ExtractJwt.fromAuthHeaderAsBearerToken(),
  ]),
  secretOrKey: '1q2w3e4r',
});
}

private static extractJWT(req: Request): string | null {
if (req.cookies && 'token' in req.cookies) {
  return req.cookies.token;
}
return "You have no token";
}

async validate(req: Request ,payload: { id: string; email: string }) {
console.log(req.headers.cookie, 'jwtstrategy')
return payload;
}
}
