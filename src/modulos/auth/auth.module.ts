import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '../user/entities/user.repository';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserRepository,
      UserModule
    ]),
    PassportModule.register({defaultStrategy:'jwt'}),
    // Configuramos el JWT
    // JwtModule.register({
    //   //--- privateKey: PRIVATE_KEY,
    //   //--- publicKey: PUBLIC_KEY,
    //   secret: process.env.JWT_SECRET,
    //   signOptions:{
    //     expiresIn: '1h',
    //     algorithm: 'HS256'
    //   }
    // })

    // Debido a la espera de leer el fichero .env
    JwtModule.registerAsync({
      imports:[ ConfigModule ],
      inject: [ ConfigService ],
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get('JWT_SECRET'),
          signOptions: {
            expiresIn: '2h',
            algorithm: 'HS256'
          }
        }
      }
    })


  ],
  controllers: [AuthController],
  providers: [AuthService, UserRepository],
})
export class AuthModule {}
