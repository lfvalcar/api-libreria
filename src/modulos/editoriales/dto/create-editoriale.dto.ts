import { IsString, Length, MinLength } from 'class-validator';

export class CreateEditorialeDto {
  @IsString()
  id: string;
  
  @IsString()
  @MinLength(10)
  nombre: string;

  @IsString()
  @MinLength(10)
  localidad: string;

  @IsString()
  @Length(11)
  telefono: string;

  @IsString()
  @MinLength(10)
  sitioweb: string;

  @IsString()
  @MinLength(10)
  imagen: string;
}
