import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'src/modulos/user/entities/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(
        private readonly configService: ConfigService
    ){
        // Configuraciones
        super({
            // Obtiene el token jwt de la Request
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false, // Rechaza un token pasado de tiempo
            secretOrKEY: configService.get('JWT_SECRET')
        })
    }

    // Creamos un método validate, que valida el payload del token y que es 
    // Con la estructura de la entidad User
    async validate(payload: User){
        console.log(payload)

        // Devolvemos los campos del payload 
        return {
            id: payload.id,
            name: payload.username,
            email: payload.email
        }
    }

}
