import { IsString, MinLength} from "class-validator";

export class CreateAutoreDto {

    @IsString()
    id: string;

    @IsString()
    nombre: string;

}
