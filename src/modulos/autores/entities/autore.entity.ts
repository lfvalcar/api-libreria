import { Libro } from 'src/modulos/libros/entities/libro.entity';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

@Entity({
  name: 'AUTORES',
})
export class Autore {
  // Entidades
  @PrimaryColumn()
  nif: string;

  @Column('text', {
    unique: true,
  })
  nombre: string;

  @Column('text', {
    nullable: true,
  })
  foto: string;

  @Column('text', {
    nullable: true,
  })
  localidad: string;

  // Relaciones
  @OneToMany(() => Libro, (libro) => libro.autor, { eager: true })
  libros?: Libro[];
}
