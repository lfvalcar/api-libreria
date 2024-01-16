import { DataSource, Repository } from "typeorm";
import { User } from "./user.entity";
import { Injectable, InternalServerErrorException } from "@nestjs/common";

@Injectable()
export class UserRepository extends Repository<User>{
    constructor (private datasource: DataSource){
        super(User, datasource.createEntityManager())
    }

    async findByEmail(email1: string){
        try{
            return await this.createQueryBuilder('USERS')
            .where(`email = :value`, {value: email1})
            .getOne()
            /*
                select *
                from USERS
                where email = $email1
                limit = 1
            */
        }catch (error){
            throw new InternalServerErrorException('Error al buscar el email');
        }
    }
}