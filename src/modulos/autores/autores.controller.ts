import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { AutoresService } from './autores.service';
import { CreateAutoreDto } from './dto/create-autore.dto';

@Controller('autores')
export class AutoresController {
  constructor(private readonly autoresService: AutoresService) {}

  @Post()
  create(@Body() createAutoreDto: CreateAutoreDto) {
    return this.autoresService.create(createAutoreDto);
  }

  @Get()
  findAll() {
    return this.autoresService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.autoresService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.autoresService.remove(+id);
  }
}
