import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

@InputType()
export class CreateProductInput {
  @IsString()
  @IsNotEmpty({ message: 'Campo obrigatório' })
  nomeDoProduto: string;

  @IsString()
  @IsNotEmpty({ message: 'Campo obrigatório' })
  fabricante: string;

  @Field((type) => Int)
  @IsNumber()
  @IsNotEmpty({ message: 'Campo obrigatório' })
  quantidadeEstoque: number;

  @IsNumber()
  @IsNotEmpty({ message: 'Campo obrigatório' })
  valor: number;
}
