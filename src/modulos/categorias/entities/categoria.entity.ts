import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Libro } from '../../libros/entities/libro.entity';

@Entity({
  name: 'CATEGORIAS',
})
export class Categoria {
  //    @PrimaryGeneratedColumn('uuid')
  //    id:string;
  @PrimaryColumn()
  cod: string;

  @Column('text', { unique: true })
  name: string;

  @Column('text')
  descripcion: string;

  @Column('text')
  logo: string;

  @OneToMany(() => Libro, (libro) => libro.categoria, { cascade: false })
  libros?: Libro[];
}
