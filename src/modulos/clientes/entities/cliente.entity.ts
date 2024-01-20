import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({
    name:"CLIENTES"
})
export class Cliente {

    @PrimaryColumn()
    nif: string;

    @Column('text', { 
        unique: false,
        nullable: false
    })
    nombre: string;

    @Column('text', { 
        unique: false,
        nullable: false
    })
    apellidos: string;

    @Column('text', { 
        unique: false, 
        nullable: true
    })
    direccion: string;

    @Column('text', { 
        unique: false,
        nullable: false
    })
    localidad: string;

}
