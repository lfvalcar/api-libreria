import { Injectable, InternalServerErrorException } from '@nestjs/common';
// Servicios
import { AutoresService } from '../autores/autores.service';
import { LibrosService } from '../libros/libros.service';
import { CategoriasService } from '../categorias/categorias.service';
import { EditorialesService } from '../editoriales/editoriales.service';
// Archivos JSON
import * as seedAutores from '../seed/data/autores.json';
import * as seedLibros from '../seed/data/libros.json';
import * as seedCategorias from '../seed/data/categorias.json';
import * as seedEditoriales from '../seed/data/editoriales.json';
// Dtos
import { CreateLibroDto } from '../libros/dto/create-libro.dto';
import { CreateAutoreDto } from '../autores/dto/create-autore.dto';
import { CreateCategoriaDto } from '../categorias/dto/create-categoria.dto';
import { CreateEditorialeDto } from '../editoriales/dto/create-editoriale.dto';

@Injectable()
export class SeedService {
  constructor(
    private readonly autoreService: AutoresService,
    private readonly librosService: LibrosService,
    private readonly categoriasService: CategoriasService,
    private readonly editorialesService: EditorialesService,
  ) {}

  public async loadData() {
    await this.deleteAll();
    await this.insertNewCategorias();
    await this.insertNewEditoriales();
    await this.insertNewAutores();
    await this.insertNewLibros();
  }

  private async deleteAll() {
    try {
      // Borrado masivo de libros
      await this.librosService.deleteAllLibros();
    } catch (error) {
      throw new InternalServerErrorException(
        'Pongase en contacto con el Sysadmin',
      );
    }
  }

  private async insertNewAutores() {
    try {
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

  private async insertNewEditoriales() {
    try {
      const insertPromisesEditoriales = [];
      seedEditoriales.forEach((editorial: CreateEditorialeDto) => {
        insertPromisesEditoriales.push(
          this.editorialesService.create(editorial),
        );
      });
      await Promise.all(insertPromisesEditoriales);
      return {
        msg: 'Load Data de editoriales ejecutado con éxito',
        data: insertPromisesEditoriales,
        status: 200,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'Pongase en contacto con el Sysadmin',
      );
    }
  }
}
