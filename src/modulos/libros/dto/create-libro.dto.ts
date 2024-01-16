import { IsIn, IsInt, IsNumber, IsOptional, IsPositive, IsString, Length, MaxLength, MinLength } from "class-validator"

export class CreateLibroDto {

    @IsString()
    @Length(13)
    isbn: string

    @IsString()
    @MinLength(3)
    title: string

    @IsPositive()
    @IsNumber()
    pageCount: number

    @IsPositive()
    @IsNumber()
    precio: number

    @IsString()
    publishedDate?: string
    
    @IsString()
    @IsOptional()
    thumbnailUrl?: string 
    
    @IsString()
    @IsOptional()
    shortDescription?: string

    @IsString()
    @IsOptional()
    longDescription?: string 

    @IsString()
    @MinLength(1)
    @IsIn(['PUBLISH','UNPUBLISH'])
    status: string 

    // Foráneas
    @IsString()
    @MinLength(1)
    autor?: string

}