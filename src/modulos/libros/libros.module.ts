import { Module } from '@nestjs/common';
import { LibrosService } from './libros.service';
import { LibrosController } from './libros.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Libro } from './entities/libro.entity';

@Module({
  controllers: [LibrosController],
  providers: [LibrosService],
  imports: [
    TypeOrmModule.forFeature([Libro])
  ],
  exports: [ LibrosService, TypeOrmModule ]
})
export class LibrosModule {}
