import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuarioController } from './usuarios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rol } from './entities/rol.entity';
import { RolRepository } from './entities/rol.repository';
import { Usuario } from './entities/usuario.entity';
import { UsuarioRepository } from './entities/usuario.repository';

@Module({
  controllers: [UsuarioController],
  providers: [UsuariosService],
  imports: [
    TypeOrmModule.forFeature([Usuario, UsuarioRepository, Rol, RolRepository]),
  ],

  exports: [UsuariosService, TypeOrmModule],
})
export class UsuariosModule {}
