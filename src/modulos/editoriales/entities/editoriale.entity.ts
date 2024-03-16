import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Libro } from '../../libros/entities/libro.entity';
import { Autore } from 'src/modulos/autores/entities/autore.entity';

@Entity({
  name: 'EDITORIALES',
})
export class Editorial {
  @PrimaryColumn()
  nombre: string;

  @Column('text')
  localidad: string;

  @Column('text')
  telefono: string;

  @Column('text')
  sitioweb: string;

  @Column('text')
  imagen: string;

  @OneToMany(() => Libro, (libro) => libro.editorial, { cascade: false })
  libros?: Libro[];

  @OneToMany(() => Autore, (autor) => autor.editorial, { cascade: false })
  autores?: Autore[];
}