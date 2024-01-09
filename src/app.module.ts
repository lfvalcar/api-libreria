import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { SeedModule } from './modulos/seed/seed.module';
import { AutoresModule } from './modulos/autores/autores.module';
import { ClientesModule } from './modulos/clientes/clientes.module';
import { LibrosModule } from './modulos/libros/libros.module';
import { AuthModule } from './modulos/auth/auth.module';
import { UserModule } from './modulos/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: true
    }),
    SeedModule,
    AutoresModule,
    ClientesModule,
    LibrosModule,
    AuthModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
