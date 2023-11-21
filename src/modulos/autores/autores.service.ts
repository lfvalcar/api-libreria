import { Injectable, InternalServerErrorException, Post } from '@nestjs/common';
import { CreateAutoreDto } from './dto/create-autore.dto';
import { UpdateAutoreDto } from './dto/update-autore.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Autore } from './entities/autore.entity';

@Injectable()
export class AutoresService {
  constructor(
    @InjectRepository(Autore)
    private readonly autorRepository: Repository<Autore>
  ){

  }

  @Post()
  async create(createAutoreDto: CreateAutoreDto) {
    try {
      //el objeto (createAutoreDto) del controlador  
      //lo PREPARA en el objeto (autor) para ser INSERTADO en el SGBD
      const autor = this.autorRepository.create(createAutoreDto);

      //lanza la petición de insercción a la BD
      //mapea objeto autor <--> registro autor
      //Genera la consulta sql insert into Autor (id, nombre) values ("1","Glen Smidth");
      //lo aplica la libreria de bd instalada en el proyecto --> libreria de postgres (pg)
      await this.autorRepository.save(autor);
      return {
        msg: 'Registro Insertado',
        data: autor,
        status: 200
      }
    }catch(error){
      throw new InternalServerErrorException('Pongase en contacto con el Sysadmin')
    }
  }

  findAll() {
    return `This action returns all autores`;
  }

  findOne(id: number) {
    return `This action returns a #${id} autore`;
  }

  update(id: number, updateAutoreDto: UpdateAutoreDto) {
    return `This action updates a #${id} autore`;
  }

  remove(id: number) {
    return `This action removes a #${id} autore`;
  }

  async deleteAllAutores(){
    const query = this.autorRepository.createQueryBuilder('autor')
  }
}
