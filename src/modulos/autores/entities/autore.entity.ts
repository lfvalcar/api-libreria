import { Editorial } from 'src/modulos/editoriales/entities/editoriale.entity';
import { Libro } from 'src/modulos/libros/entities/libro.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';

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
    unique: true,
  })
  foto: string;

  // Relaciones
  @OneToMany(() => Libro, (libro) => libro.autor, { eager: true })
  libros?: Libro[];

  @ManyToOne(() => Editorial, (editorial) => editorial.autores, {
    cascade: true,
  })
  editorial?: Editorial;
}
