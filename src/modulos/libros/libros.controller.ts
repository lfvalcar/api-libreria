import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { LibrosService } from './libros.service';
import { CreateLibroDto } from './dto/create-libro.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('libros')
export class LibrosController {
  constructor(private readonly librosService: LibrosService) {}

  @Post()
  @UseGuards(AuthGuard('jwt')) // Restringimos este método con token JWT
  create(@Body() createLibroDto: CreateLibroDto) {
    return this.librosService.create(createLibroDto);
  }

  @Get()
  findAll() {
    return this.librosService.findAll();
  }

  @Get('news')
  getNewsLibros() {
    return this.librosService.getNewsLibros();
  }

  @Get(':id')
  findOne(@Param('id') isbn: string) {
    return this.librosService.findOne(isbn);
  }

  @Get('categorias/:cod')
  getLibrosByCategoria(@Param('cod') cod: string) {
    return this.librosService.findLibroByCategoria(cod);
  }

  @Get('editoriales/:id')
  getLibrosByEditorial(@Param('id') id: string) {
    return this.librosService.findLibroByEditorial(id);
  }

  @Get('autores/:id')
  getLibrosByAutor(@Param('id') id: string) {
    return this.librosService.findLibroByAutor(id);
  }
}
