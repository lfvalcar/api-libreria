import { Module } from '@nestjs/common';
import { EditorialesService } from './editoriales.service';
import { EditorialesController } from './editoriales.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Editorial } from './entities/editoriale.entity';

@Module({
  controllers: [EditorialesController],
  providers: [EditorialesService],
  imports: [TypeOrmModule.forFeature([Editorial])],
  exports: [EditorialesService, TypeOrmModule],
})
export class EditorialesModule {}
