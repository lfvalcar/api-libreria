import { IsString } from 'class-validator';

export class CreateUsuarioDto {
  @IsString()
  email: string;

  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsString()
  rol: string;

  //....
}
