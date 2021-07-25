import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Product } from './product.model';

import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import sequelize from 'sequelize';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product)
    private readonly productModel: typeof Product,
  ) {}

  async createProduct(data: CreateProductInput): Promise<Product> {
    const product = await this.productModel.create(data);
    if (!product) {
      throw new InternalServerErrorException('Erro ao criar produto');
    }

    return product;
  }

  async findProductById(id: string): Promise<Product> {
    const product = await this.productModel.findOne({ where: { id: id } });

    if (!product) {
      throw new NotFoundException('Produto não encontrado');
    }

    return product;
  }
  async findAllProducts(): Promise<Product[]> {
    const products = await this.productModel.findAll();
    return products;
  }

  async countAllProducts(): Promise<number> {
    const products = await this.productModel.findAndCountAll();

    return products.count;
  }

  async findProductsWithMinQuantity(): Promise<Product[]> {
    const product = await this.productModel.sequelize.query(
      'SELECT * FROM Products WHERE quantidadeEstoque = (SELECT MIN(quantidadeEstoque) FROM Products)',
      {
        model: Product,
        mapToModel: true,
        type: sequelize.QueryTypes.SELECT,
      },
    );

    return product;
  }

  async findProductsWithMaxQuantity(): Promise<Product[]> {
    const product = await this.productModel.sequelize.query(
      'SELECT * FROM Products WHERE quantidadeEstoque = (SELECT MAX(quantidadeEstoque) FROM Products)',
      {
        model: Product,
        mapToModel: true,
        type: sequelize.QueryTypes.SELECT,
      },
    );

    return product;
  }

  async findProductsWithNoQuantity(): Promise<Product[]> {
    const product = await this.productModel.findAll({
      where: {
        quantidadeEstoque: {
          [sequelize.Op.lt]: 5,
        },
      },
    });

    return product;
  }

  async updateProduct(id: string, data: UpdateProductInput): Promise<Product> {
    const product = await this.findProductById(id);

    const productUpdated = await product.update({ ...data });

    return productUpdated;
  }

  async deleteProduct(id: string): Promise<boolean> {
    const product = await this.findProductById(id);

    await product.destroy();

    return true;
  }
}
