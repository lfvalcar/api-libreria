import { Autore } from 'src/modulos/autores/entities/autore.entity';
import { Categoria } from 'src/modulos/categorias/entities/categoria.entity';
import { Editorial } from 'src/modulos/editoriales/entities/editoriale.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';

@Entity({
  name: 'LIBROS',
})
export class Libro {
  @PrimaryColumn('text', {
    unique: true,
  })
  isbn: string;

  @Column('text', {
    unique: true,
  })
  title: string;

  @Column({
    type: 'int',
    default: 0,
  })
  pageCount: number;

  @Column('numeric', {
    nullable: true,
  })
  precio: number;

  @Column('date', {
    nullable: true,
  })
  publishedDate?: string;

  @Column('text', {
    nullable: true,
  })
  thumbnailUrl?: string;

  @Column('text', {
    nullable: true,
  })
  shortDescription?: string;

  @Column('text', {
    nullable: true,
  })
  longDescription?: string;

  @Column('text', {
    nullable: false,
  })
  status: string;

  @ManyToOne(() => Autore, (autor) => autor.libros, { cascade: true })
  autor: Autore;

  @ManyToOne(() => Categoria, (categoria) => categoria.libros, {
    cascade: true,
  })
  categoria: Categoria;

  @ManyToOne(() => Editorial, (editorial) => editorial.libros, {
    cascade: true,
  })
  editorial: Editorial;

  @BeforeInsert()
  checkTitle() {
    this.title = this.title.toUpperCase();
  }

  @BeforeInsert()
  precioIva() {
    this.precio = this.precio * 1.21;
  }
}
