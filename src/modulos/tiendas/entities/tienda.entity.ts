import { Libro } from 'src/modulos/libros/entities/libro.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'TIENDAS',
})
export class Tienda {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { unique: true })
  nombre: string;

  @Column('text', { unique: true })
  localidad: string;

  @Column('int')
  empleados: number;

  @ManyToMany(() => Libro, (libro) => libro.tiendas, { cascade: true })
  libros?: Libro[];
}
