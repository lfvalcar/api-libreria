import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Libro } from '../../libros/entities/libro.entity';

@Entity({
  name: 'EDITORIALES',
})
export class Editorial {
  @PrimaryColumn()
  id: string;

  @Column()
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
}
