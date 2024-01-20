import { Cliente } from "src/modulos/clientes/entities/cliente.entity";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({
    name:"USERS"
})

export class User {

    @PrimaryGeneratedColumn('uuid',{
        name: 'id'
    })
    id: string;

    @Column('varchar',{
        name: 'email',
        nullable: false,
        unique: true, 
        length: 150
    })
    email: string;

    // @Column('varchar',{
    //     name: 'username',
    //     nullable: false,
    //     unique: true, 
    //     length: 150
    // })
    // username: string;

    @Column('varchar',{
        name: 'username',
        nullable: false,
        unique: false, 
        length: 150,
    })
    password: string;

    @Column('bool',{
        default: false
    })
    isActive: boolean;

    @Column('text',{
        array: true,
        // dto -> ['invitado','usuario','administrador','gestor']
        default: ['usuario']
    })
    roles: string[];

    @Column('varchar',{
        name: 'logo',
        nullable: true,
        unique: false, 
        length: 150
    })
    logo: string; // ruta relativa a "public/images"

    // redes sociales
    @Column('varchar',{
        name: 'instagram',
        nullable: true,
        unique: false, 
        length: 150
    })
    instagram: string;

    @CreateDateColumn({
        name: 'create_at'
    })
    createAt: Date; 

    @UpdateDateColumn({
        name: 'update_at'
    })
    updateAt: Date;

    // relación de 1 a 1 de Auth(User) <---> Cliente
    // cliente: Cliente;

}

