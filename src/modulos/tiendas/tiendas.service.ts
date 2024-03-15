import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateTiendaDto } from './dto/create-tienda.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tienda } from './entities/tienda.entity';

@Injectable()
export class TiendasService {
  constructor(
    @InjectRepository(Tienda)
    private readonly tiendaRepository: Repository<Tienda>,
  ) {}

  async create(createTiendaDto: CreateTiendaDto) {
    try {
      const tienda = this.tiendaRepository.create(createTiendaDto);
      await this.tiendaRepository.save(tienda);
      return {
        msg: 'Registro Insertado',
        data: tienda,
        status: 200,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'Pongase en contacto con el Sysadmin',
      );
    }
  }

  findAll() {
    const tiendas = this.tiendaRepository.find({
      relations: {
        libros: true,
      },
    });
    return tiendas;
  }

  findOne(id: number) {
    return `This action returns a #${id} tienda`;
  }

  async deleteAllTiendas() {
    const query = this.tiendaRepository.createQueryBuilder('tienda');
    try {
      return await query.delete().where({}).execute();
    } catch (error) {
      throw new InternalServerErrorException(
        'Pongase en contacto con el Sysadmin',
      );
    }
  }
}
