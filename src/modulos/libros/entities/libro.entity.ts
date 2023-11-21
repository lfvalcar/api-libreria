import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryColumn } from "typeorm";
import { Url } from "url";


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

    @Column('numeric',{
        nullable: false
    })
    pageCount: number;

    publishedDate: Date;

    @Column('text',{
        nullable: false
    })
    thumbnailUrl: Url;

    shortDescription: string;

    longDescription: string;

    @Column('text',{
        nullable: false
    })
    status: string;

    @Column('numeric',{
        nullable: false
    })
    precio: number


    
}