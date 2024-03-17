import {
  IsIn,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Length,
  MinLength,
} from 'class-validator';

export class CreateLibroDto {
  @IsString()
  @Length(13)
  isbn: string;

  @IsString()
  @MinLength(3)
  title: string;

  @IsPositive()
  @IsNumber()
  pageCount: number;

  @IsPositive()
  @IsNumber()
  precio: number;

  @IsString()
  publishedDate: string;

  @IsString()
  @IsOptional()
  thumbnailUrl?: string;

  @IsString()
  @IsOptional()
  shortDescription?: string;

  @IsString()
  @IsOptional()
  longDescription?: string;

  @IsString()
  @IsIn(['PUBLISH', 'UNPUBLISH'])
  status: string;

  // Foráneas
  @IsString()
  @MinLength(1)
  autor: string;

  @IsString()
  @MinLength(1)
  categoria: string;

  @IsString()
  @MinLength(1)
  editorial: string;
}
