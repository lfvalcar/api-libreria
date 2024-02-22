import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateLibroDto } from './dto/create-libro.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Libro } from './entities/libro.entity';
import { AutoresService } from '../autores/autores.service';

@Injectable()
export class LibrosService {
  constructor(
    @InjectRepository(Libro)
    private readonly librosRepository: Repository<Libro>,
    private readonly AutoresService: AutoresService,
  ) {}

  async create(createLibroDto: CreateLibroDto) {
    try {
      const { autor, ...campos } = createLibroDto;
      const libro = this.librosRepository.create({ ...campos });
      const autorobj = await this.AutoresService.findOne(autor);
      libro.autor = autorobj;
      await this.librosRepository.save(libro);
      return {
        msg: 'Registro Insertado',
        data: libro,
        status: 200,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'Pongase en contacto con el Sysadmin',
      );
    }
  }

  findAll() {
    const libros = this.librosRepository.find({
      relations: {
        autor: true,
      },
    });
    return libros;
  }

  findOne(isbn: string) {
    const autor = this.librosRepository.findOne({
      where: {
        isbn,
      },
      relations: {
        autor: true,
      },
    });
    return autor;
  }

  // update(id: number, updateLibroDto: UpdateLibroDto) {
  //   return `This action updates a #${id} libro`;
  // }

  remove(id: number) {
    return `This action removes a #${id} libro`;
  }

  async deleteAllLibros() {
    const query = this.librosRepository.createQueryBuilder('libro');
    try {
      return await query.delete().where({}).execute();
    } catch (error) {
      throw new InternalServerErrorException(
        'Pongase en contacto con el Sysadmin',
      );
    }
  }
}
