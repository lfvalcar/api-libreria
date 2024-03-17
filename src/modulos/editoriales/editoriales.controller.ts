import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { EditorialesService } from './editoriales.service';
import { CreateEditorialeDto } from './dto/create-editoriale.dto';

@Controller('editoriales')
export class EditorialesController {
  constructor(private readonly editorialesService: EditorialesService) {}

  @Post()
  create(@Body() createEditorialeDto: CreateEditorialeDto) {
    return this.editorialesService.create(createEditorialeDto);
  }

  @Get()
  findAll() {
    return this.editorialesService.findAll();
  }

  @Get(':nombre')
  findOne(@Param('nombre') nombre: string) {
    return this.editorialesService.findOne(nombre);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.editorialesService.remove(+id);
  }
}
