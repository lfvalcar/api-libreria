import { IsInt, IsPositive, IsString, MaxLength, MinLength } from "class-validator"

export class CreateLibroDto {
    @IsString()
    isbn: string

    @IsString()
    title: string

    @IsInt()
    @IsPositive()
    pageCount: number

    @IsInt()
    @IsPositive()
    precio: number

}