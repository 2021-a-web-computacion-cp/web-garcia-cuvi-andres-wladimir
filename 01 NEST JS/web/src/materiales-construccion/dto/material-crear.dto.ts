import {
  IsEmpty,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  IsDecimal,
  IsBoolean,
  IsOptional,
  IsPositive,
} from 'class-validator';

export class MaterialCrearDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(10)
  nombre: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(10)
  marca: string;

  @IsNotEmpty()
  @IsPositive()
  @IsDecimal()
  precio: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(10)
  tipo: string;

  @IsBoolean()
  @IsOptional()
  stock: boolean;

  @IsEmpty()
  fechaCreacion: string;
}
