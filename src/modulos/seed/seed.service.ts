import { Injectable, InternalServerErrorException } from '@nestjs/common';
// Servicios
import { AutoresService } from '../autores/autores.service';
import { LibrosService } from '../libros/libros.service';
import { CategoriasService } from '../categorias/categorias.service';
import { TiendasService } from '../tiendas/tiendas.service';
// Archivos JSON
import * as seedAutores from '../seed/data/autores.json';
import * as seedLibros from '../seed/data/libros.json';
import * as seedCategorias from '../seed/data/categorias.json';
import * as seedTiendas from '../seed/data/tiendas.json';
// Dtos
import { CreateLibroDto } from '../libros/dto/create-libro.dto';
import { CreateAutoreDto } from '../autores/dto/create-autore.dto';
import { CreateCategoriaDto } from '../categorias/dto/create-categoria.dto';
import { CreateTiendaDto } from '../tiendas/dto/create-tienda.dto';

@Injectable()
export class SeedService {
  constructor(
    private readonly autoreService: AutoresService,
    private readonly librosService: LibrosService,
    private readonly categoriasService: CategoriasService,
    private readonly tiendasService: TiendasService,
  ) {}

  public async loadData() {
    await this.insertNewLibros();
    await this.insertNewAutores();
    await this.insertNewCategorias();
    await this.insertNewTiendas();
  }

  private async insertNewAutores() {
    try {
      // Borrado masivo de autores
      // await this.autoreService.deleteAllAutores();

      const insertPromisesAutores = [];
      seedAutores.forEach((autor: CreateAutoreDto) => {
        // if (+autor.id > 30)
        insertPromisesAutores.push(this.autoreService.create(autor));
      });
      await Promise.all(insertPromisesAutores);
      return {
        msg: 'Load Data de autores ejecutado con éxito',
        data: insertPromisesAutores,
        status: 200,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'Pongase en contacto con el Sysadmin',
      );
    }
  }

  private async insertNewLibros() {
    try {
      // Borrado masivo de libros
      await this.librosService.deleteAllLibros();

      const insertPromisesLibros = [];
      seedLibros.forEach((libro: CreateLibroDto) => {
        insertPromisesLibros.push(this.librosService.create(libro));
      });
      await Promise.all(insertPromisesLibros);
      return {
        msg: 'Load Data de libros ejecutado con éxito',
        data: insertPromisesLibros,
        status: 200,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'Pongase en contacto con el Sysadmin',
      );
    }
  }

  private async insertNewCategorias() {
    try {
      // await this.categoriasService.deleteAllCategorias();

      const insertPromisesCategorias = [];
      seedCategorias.forEach((categoria: CreateCategoriaDto) => {
        insertPromisesCategorias.push(this.categoriasService.create(categoria));
      });
      await Promise.all(insertPromisesCategorias);
      return {
        msg: 'Load Data de categorias ejecutado con éxito',
        data: insertPromisesCategorias,
        status: 200,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'Pongase en contacto con el Sysadmin',
      );
    }
  }

  private async insertNewTiendas() {
    try {
      await this.tiendasService.deleteAllTiendas();

      const insertPromisesTiendas = [];
      seedTiendas.forEach((tienda: CreateTiendaDto) => {
        insertPromisesTiendas.push(this.tiendasService.create(tienda));
      });
      await Promise.all(insertPromisesTiendas);
      return {
        msg: 'Load Data de tiendas ejecutado con éxito',
        data: insertPromisesTiendas,
        status: 200,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'Pongase en contacto con el Sysadmin',
      );
    }
  }
}
