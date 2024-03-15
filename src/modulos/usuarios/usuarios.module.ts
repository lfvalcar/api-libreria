import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuarioController } from './usuarios.controller';

@Module({
  controllers: [UsuarioController],
  providers: [UsuariosService],
})
export class UsuariosModule {}
