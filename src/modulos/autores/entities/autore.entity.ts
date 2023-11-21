import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Autore {

    @PrimaryGeneratedColumn()
    id: string;

    @Column('text',{unique: true})
    nombre: string;

}
