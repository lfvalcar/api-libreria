import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { SeedModule } from './modulos/seed/seed.module';
import { AutoresModule } from './modulos/autores/autores.module';
import { LibrosModule } from './modulos/libros/libros.module';
import { AuthModule } from './modulos/auth/auth.module';
import { JwtStrategy } from './modulos/auth/strategies/jwt-strategy/jwt-strategy';
import { CategoriasModule } from './modulos/categorias/categorias.module';
import { TiendasModule } from './modulos/tiendas/tiendas.module';
import { UsuariosModule } from './modulos/usuarios/usuarios.module';
import { EditorialesModule } from './modulos/editoriales/editoriales.module';

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
      synchronize: true,
      logging: false,
    }),
    SeedModule,
    AutoresModule,
    LibrosModule,
    AuthModule,
    CategoriasModule,
    TiendasModule,
    UsuariosModule,
    EditorialesModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule {}
