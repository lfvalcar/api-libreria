import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateSeedDto } from './dto/create-seed.dto';
import { UpdateSeedDto } from './dto/update-seed.dto';
// Servicios
import { AutoresService } from '../autores/autores.service';
import { LibrosService } from '../libros/libros.service';
// Archivos JSON
import * as seedAutores from '../seed/data/authors.json';
import * as seedLibros from '../seed/data/libros.json';
// Dtos
import { CreateLibroDto } from '../libros/dto/create-libro.dto'
import { CreateAutoreDto } from '../autores/dto/create-autore.dto';

@Injectable()
export class SeedService {
  constructor (private readonly autoreService: AutoresService,private readonly librosService: LibrosService){}

  public async loadData(){
    await this.insertNewLibros();
    await this.insertNewAutores();
  }

  private async insertNewAutores(){
  try{
    // Borrado masivo de autores
    await this.autoreService.deleteAllAutores();

    const insertPromisesAutores = [];
    seedAutores.forEach( (autor: CreateAutoreDto) => {
      // if (+autor.id > 30)
      insertPromisesAutores.push(this.autoreService.create(autor));
    });
    const results = await Promise.all(insertPromisesAutores);
    return {
      msg: 'Load Data de autores ejecutado con éxito',
      data: insertPromisesAutores,
      status: 200
    }
    }catch(error){
      throw new InternalServerErrorException('Pongase en contacto con el Sysadmin')
  }
}

  private async insertNewLibros(){
    try{
      // Borrado masivo de libros
      await this.librosService.deleteAllLibros();

      const insertPromisesLibros = [];
      seedLibros.forEach( (libro: CreateLibroDto) => {
        insertPromisesLibros.push(this.librosService.create(libro));
      });
      const results = await Promise.all(insertPromisesLibros);
      return {
        msg: 'Load Data de libros ejecutado con éxito',
        data: insertPromisesLibros,
        status: 200
      }
      }catch(error){
        throw new InternalServerErrorException('Pongase en contacto con el Sysadmin')
    }
  }

  create(createSeedDto: CreateSeedDto) {
    return 'This action adds a new seed';
  }

  findAll() {
    return `This action returns all seed`;
  }

  findOne(id: number) {
    return `This action returns a #${id} seed`;
  }

  update(id: number, updateSeedDto: UpdateSeedDto) {
    return `This action updates a #${id} seed`;
  }

  remove(id: number) {
    return `This action removes a #${id} seed`;
  }
}
