import { Autore } from "src/modulos/autores/entities/autore.entity";
import { BeforeInsert, Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";


@Entity()
export class Libro {

    @PrimaryColumn('text', {
        unique: true
    })
    isbn: string;

    @Column('text',{
        nullable: false
    })
    title: string;

    @Column({
        type: 'int',
        default: 0
    })
    pageCount: number;

    @Column('numeric',{
        nullable: false
    })
    precio: number;

    @Column('date',{
        nullable: true
    })
    publishedDate?: string;

    @Column('text',{
        nullable: true
    })
    thumbnailUrl?: string;

    @Column('text',{
        nullable: true
    })
    shortDescription?: string;

    @Column('text',{
        nullable: true
    })
    longDescription?: string;

    @Column('text',{
        nullable: false
    })
    status: string;

    @ManyToOne (
        () => Autore,
        (autor) => autor.libros,
        {cascade: true}
    )
    autor?: Autore[]

    @BeforeInsert()
    checkTitle(){
        this.title = this.title.toUpperCase()
    }
    
}