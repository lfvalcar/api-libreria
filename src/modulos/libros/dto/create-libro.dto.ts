import { IsInt, IsPositive, IsString, MaxLength, MinLength } from "class-validator"

export class CreateLibroDto {
    id: string;

    title: string

    isbn: string

    pageCount: number

    publishedDate: string
    
    thumbnailUrl: string 
    
    shortDescription: string

    longDescription: string 

    status: string 

    precio: number
}