import {
  Injectable,
  InternalServerErrorException,
  Param,
} from '@nestjs/common';
import { CreateLibroDto } from './dto/create-libro.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Libro } from './entities/libro.entity';
import { AutoresService } from '../autores/autores.service';
import { CategoriasService } from '../categorias/categorias.service';
import { EditorialesService } from '../editoriales/editoriales.service';
import { FindOneOptions, Like, Repository } from 'typeorm';

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

  async getNewsLibros() {
    const libros = await this.librosRepository.find({
      order: { publishedDate: 'DESC' }, // Ordena por fecha de publicación en orden descendente
      take: 4, // Limita el resultado a los primeros 5 libros
      relations: ['autor', 'categoria', 'editorial'], // Carga las relaciones autor, categoria y editorial
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

  async findLibroByCategoria(@Param('cod') cod: string) {
    const libros = await this.librosRepository.find({
      where: {
        categoria: {
          cod: Like(`${cod}`),
        },
      },
      relations: ['autor', 'categoria', 'editorial'],
    } as FindOneOptions<Libro>);
    return libros;
  }

  async findLibroByEditorial(@Param('id') id: string) {
    const libros = await this.librosRepository.find({
      where: {
        editorial: {
          id: Like(`${id}`),
        },
      },
      relations: ['autor', 'categoria', 'editorial'],
    } as FindOneOptions<Libro>);
    return libros;
  }

  async findLibroByAutor(@Param('id') id: string) {
    const libros = await this.librosRepository.find({
      where: {
        autor: {
          id: Like(`${id}`),
        },
      },
      relations: ['autor', 'categoria', 'editorial'],
    } as FindOneOptions<Libro>);
    return libros;
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
