import { Injectable, InternalServerErrorException, Post } from '@nestjs/common';
import { CreateAutoreDto } from './dto/create-autore.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Autore } from './entities/autore.entity';

@Injectable()
export class AutoresService {
  constructor(
    @InjectRepository(Autore)
    private readonly autorRepository: Repository<Autore>,
  ) {}

  @Post()
  async create(createAutoreDto: CreateAutoreDto) {
    try {
      // El objeto (createAutoreDto) del controlador
      // Lo PREPARA en el objeto (autor) para ser INSERTADO en el SGBD
      const autor = this.autorRepository.create(createAutoreDto);

      // Lanza la petición de insercción a la BD
      // Mapea objeto autor <--> registro autor
      // Genera la consulta sql insert into Autor (id, nombre) values ("1","Glen Smidth");
      // Lo aplica la libreria de bd instalada en el proyecto --> libreria de postgres (pg)
      await this.autorRepository.save(autor);
      return {
        msg: 'Registro Insertado',
        data: autor,
        status: 200,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'Pongase en contacto con el Sysadmin',
      );
    }
  }

  findAll() {
    return `This action returns all autores`;
  }

  findOne(nif: string) {
    const autor = this.autorRepository.findOne({
      where: {
        nif,
      },
    });
    return autor;
  }

  remove(id: number) {
    return `This action removes a #${id} autore`;
  }

  async deleteAllAutores() {
    const query = this.autorRepository.createQueryBuilder('autor');
    try {
      return await query.delete().where({}).execute();
    } catch (error) {
      throw new InternalServerErrorException(
        'Pongase en contacto con el Sysadmin',
      );
    }
  }
}
