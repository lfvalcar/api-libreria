import { Autore } from "src/modulos/autores/entities/autore.entity";
import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";


@Entity()
export class Libro {
    @PrimaryColumn()
    id: string;

    @Column('text',{
        nullable: false
    })
    title: string;

    @Column('text',{
        nullable: false
    })
    isbn: string;

    @Column('int',{
        nullable: false
    })
    pageCount: number;

    @Column('text',{
        nullable: true
    })
    publishedDate: string;

    @Column('text',{
        nullable: true
    })
    thumbnailUrl: string;

    @Column('text',{
        nullable: true
    })
    shortDescription: string;

    @Column('text',{
        nullable: true
    })
    longDescription: string;

    @Column('text',{
        nullable: false
    })
    status: string;

    @Column('numeric',{
        nullable: false
    })
    precio: number;

    @ManyToOne (
        () => Autore,
        (autor) => autor.libros,
        {cascade: true}
    )
    autor?: Autore[]
    
}