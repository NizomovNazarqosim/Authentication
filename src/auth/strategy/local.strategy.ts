import { Injectable } from "@nestjs/common";
import { PassportStrategy } from '@nestjs/passport'
import {Strategy} from 'passport-local'
import { CreateUserDto } from '../dto/auth.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super()
    }

    async validate(payload) {
        return payload
    }
}