import { IsString } from "class-validator";


export class LoginAuthDto {

    @IsString()
    email: string;
    

}