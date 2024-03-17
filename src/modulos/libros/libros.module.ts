import { Module } from '@nestjs/common';
import { LibrosService } from './libros.service';
import { LibrosController } from './libros.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Libro } from './entities/libro.entity';
import { AutoresModule } from '../autores/autores.module';
import { CategoriasModule } from '../categorias/categorias.module';
import { EditorialesModule } from '../editoriales/editoriales.module';

@Module({
  controllers: [LibrosController],
  providers: [LibrosService],
  imports: [
    CategoriasModule,
    AutoresModule,
    EditorialesModule,
    TypeOrmModule.forFeature([Libro]),
  ],
  exports: [LibrosService, TypeOrmModule],
})
export class LibrosModule {}
