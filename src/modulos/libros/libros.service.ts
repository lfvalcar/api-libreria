import { Injectable, InternalServerErrorException, Post } from '@nestjs/common';
import { CreateLibroDto } from './dto/create-libro.dto';
import { UpdateLibroDto } from './dto/update-libro.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Libro } from './entities/libro.entity';
import { AutoresService } from '../autores/autores.service';

@Injectable()
export class LibrosService {
  constructor(
    @InjectRepository(Libro)
    private readonly libroRepository: Repository<Libro>,
    private readonly AutoresService: AutoresService
  ){}

  @Post()
  async create(createLibroDto: CreateLibroDto) {
    try {
      const {autor, ...campos} = createLibroDto;
      const libro = this.libroRepository.create(createLibroDto);
      const autorobj = await this.AutoresService.findOne(autor);
      libro.autor = autorobj;
      await this.libroRepository.save(libro);
      return {
        msg: 'Registro Insertado',
        data: libro,
        status: 200
      }
    }catch(error){
      throw new InternalServerErrorException('Pongase en contacto con el Sysadmin')
    }
  }

  findAll() {
    return `This action returns all libros`;
  }

  findOne(id: number) {
    return `This action returns a #${id} libro`;
  }

  update(id: number, updateLibroDto: UpdateLibroDto) {
    return `This action updates a #${id} libro`;
  }

  remove(id: number) {
    return `This action removes a #${id} libro`;
  }

  async deleteAllLibros(){
    const query = this.libroRepository.createQueryBuilder('libro');
    try{
      return await query 
        .delete()
        .where({})
        .execute()
    }catch(error){
      throw new InternalServerErrorException('Pongase en contacto con el Sysadmin')
    }
  }
}
