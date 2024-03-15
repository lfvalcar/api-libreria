import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Categoria } from './entities/categoria.entity';

@Injectable()
export class CategoriasService {
  constructor(
    @InjectRepository(Categoria)
    private readonly categoriaRepository: Repository<Categoria>,
  ) {}

  async create(createCategoriaDto: CreateCategoriaDto) {
    try {
      const categoria = this.categoriaRepository.create(createCategoriaDto);
      await this.categoriaRepository.save(categoria);
      return {
        msg: 'Registro Insertado',
        data: categoria,
        status: 200,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'Pongase en contacto con el Sysadmin',
      );
    }
  }

  findAll() {
    const categorias = this.categoriaRepository.find({
      relations: {
        libros: true,
      },
    });
    return categorias;
  }

  findOne(cod: string) {
    const categoria = this.categoriaRepository.findOne({
      where: {
        cod,
      },
    });
    return categoria;
  }

  async deleteAllCategorias() {
    const query = this.categoriaRepository.createQueryBuilder('categoria');
    try {
      return await query.delete().where({}).execute();
    } catch (error) {
      throw new InternalServerErrorException(
        'Pongase en contacto con el Sysadmin',
      );
    }
  }
}
