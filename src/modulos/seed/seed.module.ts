import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { AutoresModule } from '../autores/autores.module';
import { EditorialesModule } from '../editoriales/editoriales.module';
import { LibrosModule } from '../libros/libros.module';
import { CategoriasModule } from '../categorias/categorias.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [LibrosModule, CategoriasModule, AutoresModule, EditorialesModule],
})
export class SeedModule {}
