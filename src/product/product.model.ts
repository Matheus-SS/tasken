import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import {
  AutoIncrement,
  Column,
  PrimaryKey,
  Table,
  Model,
  CreatedAt,
  UpdatedAt,
  DataType,
} from 'sequelize-typescript';

@ObjectType()
@Table
export class Product extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
  @Field((type) => ID)
  id: number;

  @Column
  nomeDoProduto: string;

  @Column
  fabricante: string;

  @Field((type) => Int)
  @Column
  quantidadeEstoque: number;

  @Column({ type: DataType.FLOAT })
  valor: number;

  @CreatedAt
  criadoEm: Date;

  @UpdatedAt
  atualizadoEm: Date;
}
