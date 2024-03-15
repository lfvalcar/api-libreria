import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';

@Controller('categorias')
export class CategoriasController {
  constructor(private readonly categoriasService: CategoriasService) {}

  @Post()
  create(@Body() createCategoriaDto: CreateCategoriaDto) {
    return this.categoriasService.create(createCategoriaDto);
  }

  @Get()
  findAll() {
    return this.categoriasService.findAll();
  }

  @Get(':cod')
  findOne(@Param('cod') cod: string) {
    return this.categoriasService.findOne(cod);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCategoriaDto: UpdateCategoriaDto) {
  //   return this.categoriasService.update(+id, updateCategoriaDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.categoriasService.remove(+id);
  // }
}
