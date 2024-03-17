import { IsString, MinLength } from 'class-validator';

export class CreateAutoreDto {
  @IsString()
  @MinLength(1)
  id: string;
  
  @IsString()
  @MinLength(1)
  nif: string;

  @IsString()
  @MinLength(1)
  nombre: string;

  @IsString()
  @MinLength(1)
  foto: string;

  @IsString()
  @MinLength(1)
  localidad: string;
}
