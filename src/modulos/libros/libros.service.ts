import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateLibroDto } from './dto/create-libro.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Libro } from './entities/libro.entity';
import { AutoresService } from '../autores/autores.service';
import { CategoriasService } from '../categorias/categorias.service';
import { EditorialesService } from '../editoriales/editoriales.service';
import { Repository } from 'typeorm';

@Injectable()
export class LibrosService {
  constructor(
    @InjectRepository(Libro)
    private readonly librosRepository: Repository<Libro>,
    private readonly autoresService: AutoresService,
    private readonly categoriasService: CategoriasService,
    private readonly editorialesService: EditorialesService,
  ) {}

  async create(createLibroDto: CreateLibroDto) {
    try {
      const { autor, categoria, editorial, ...campos } = createLibroDto;
      const libro = this.librosRepository.create({ ...campos });
      const autorobj = await this.autoresService.findOne(autor);
      const categoriaobj = await this.categoriasService.findOne(categoria);
      const editorialobj = await this.editorialesService.findOne(editorial);
      libro.editorial = editorialobj;
      libro.autor = autorobj;
      libro.categoria = categoriaobj;
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
        categoria: true,
        editorial: true,
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
        categoria: true,
        editorial: true,
      },
    });
    return autor;
  }
  // update(id: number, updateLibroDto: UpdateLibroDto) {
  //   return `This action updates a #${id} libro`;
  // }

  remove(isbn: string) {
    this.librosRepository.delete({ isbn });
    return `libro con el isbn ${isbn} borrado`;
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
