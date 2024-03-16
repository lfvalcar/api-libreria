import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
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

  @Get(':id')
  findOne(@Param('id') isbn: string) {
    return this.librosService.findOne(isbn);
  }

  @Delete(':isbn')
  remove(@Param('isbn') isbn: string) {
    return this.librosService.remove(isbn);
  }
}
