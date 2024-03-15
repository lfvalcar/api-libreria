import { IsString, MinLength } from 'class-validator';

export class CreateCategoriaDto {
  @IsString()
  @MinLength(1)
  cod: string;

  @IsString()
  @MinLength(1)
  name: string;

  @IsString()
  @MinLength(1)
  descripcion: string;

  @IsString()
  @MinLength(1)
  logo: string;
}
