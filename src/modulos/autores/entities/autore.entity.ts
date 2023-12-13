import { Libro } from "src/modulos/libros/entities/libro.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Autore {

    @PrimaryGeneratedColumn()
    id: string;

    @Column('text',{
        nullable: false
    })
    nombre: string;

    @OneToMany (
        () => Libro,
        (libro) => libro.autor
    )
    libros?: Libro[]
}
