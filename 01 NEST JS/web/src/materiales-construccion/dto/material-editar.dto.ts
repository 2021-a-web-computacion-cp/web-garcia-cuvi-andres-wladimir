import {
  IsEmpty,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  IsDecimal,
  IsInt,
} from 'class-validator';

export class MaterialEditarDto {
  nombre: string;

  marca: string;

  precio: number;

  tipo: string;

  stock: boolean;
}
