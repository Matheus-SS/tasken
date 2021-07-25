import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

@InputType()
export class UpdateProductInput {
  @IsString()
  @IsNotEmpty({ message: 'Campo obrigatório' })
  @IsOptional()
  nomeDoProduto?: string;

  @IsString()
  @IsNotEmpty({ message: 'Campo obrigatório' })
  @IsOptional()
  fabricante?: string;

  @Field((type) => Int)
  @IsNumber()
  @IsNotEmpty({ message: 'Campo obrigatório' })
  @IsOptional()
  quantidadeEstoque?: number;

  @IsNumber()
  @IsNotEmpty({ message: 'Campo obrigatório' })
  @IsOptional()
  valor?: number;
}
