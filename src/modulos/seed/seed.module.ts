import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { AutoresModule } from '../autores/autores.module';
import { LibrosModule } from '../libros/libros.module';
import { TiendasModule } from '../tiendas/tiendas.module';
import { CategoriasModule } from '../categorias/categorias.module';
import { UsuariosModule } from '../usuarios/usuarios.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [
    AutoresModule,
    LibrosModule,
    TiendasModule,
    CategoriasModule,
    UsuariosModule,
  ],
})
export class SeedModule {}
