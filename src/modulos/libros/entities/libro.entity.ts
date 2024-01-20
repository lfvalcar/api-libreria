import { Autore } from "src/modulos/autores/entities/autore.entity";
import { BeforeInsert, Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";


@Entity({
    name:"LIBROS"
})
export class Libro {

    @PrimaryColumn('text', {
        unique: true
    })
    isbn: string;

    @Column('text',{
        unique: true
    })
    title: string;

    @Column({
        type: 'int',
        default: 0
    })
    pageCount: number;

    @Column('numeric',{
        nullable: true
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

    // @ManyToOne(
    //     () => Cliente,
    //     (cliente) => cliente.libros,
    //     { cascade: false }
    // )
    // cliente?: Cliente

    @ManyToOne (
        () => Autore,
        (autor) => autor.libros,
        {cascade: true}
    )
    autor?: Autore

    @BeforeInsert()
    checkTitle(){
        this.title = this.title.toUpperCase()
    }

    @BeforeInsert()
    precioIva(){
        this.precio = this.precio*1.21;
    }

    
}