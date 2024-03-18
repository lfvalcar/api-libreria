import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateEditorialeDto } from './dto/create-editoriale.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Editorial } from './entities/editoriale.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EditorialesService {
  constructor(
    @InjectRepository(Editorial)
    private readonly editorialRepository: Repository<Editorial>,
  ) {}

  async create(createEditorialeDto: CreateEditorialeDto) {
    try {
      const editorial = this.editorialRepository.create(createEditorialeDto);
      await this.editorialRepository.save(editorial);
      return {
        msg: 'Registro Insertado',
        data: editorial,
        status: 200,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'Pongase en contacto con el Sysadmin',
      );
    }
  }

  findAll() {
    const editoriales = this.editorialRepository.find({
      relations: {
        libros: true,
      },
    });
    return editoriales;
  }

  findOne(id: string) {
    const editorial = this.editorialRepository.findOne({
      where: {
        id,
      },
    });
    return editorial;
  }

  remove(id: number) {
    return `This action removes a #${id} editoriale`;
  }
}
