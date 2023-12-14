import { Libro } from "src/modulos/libros/entities/libro.entity";
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";

@Entity()
export class Autore {
// Entidades
    @PrimaryColumn()
    nif: string;

    @Column('text',{
        unique: true,
    })
    nombre: string;

// Relaciones
    @OneToMany (
        () => Libro,
        (libro) => libro.autor,
        { eager: true }
    )
    libros?: Libro[]
}
