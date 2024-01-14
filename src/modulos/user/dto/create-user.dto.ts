import { IsArray, IsBoolean, IsDate, IsString } from "class-validator";

export class CreateUserDto {

    @IsString()
    email: string;

    @IsString()
    username: string;

    @IsString()
    password: string;

    @IsBoolean()
    isActive: boolean;

    @IsArray()
    roles: string;

    @IsString()
    logo: string;

    @IsString()
    instagram: string;

    @IsDate()
    createAt: Date;

    @IsDate()
    updateAt: Date;



}
