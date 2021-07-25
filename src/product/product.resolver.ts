import { Args, Mutation, Resolver, Query, Int, ID } from '@nestjs/graphql';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { Product } from './product.model';
import { ProductService } from './product.service';

@Resolver('Product')
export class ProductResolver {
  constructor(private productService: ProductService) {}

  @Query(() => [Product])
  async products(): Promise<Product[]> {
    const products = await this.productService.findAllProducts();
    return products;
  }

  @Query(() => Product)
  async product(@Args('id', { type: () => ID }) id: string): Promise<Product> {
    const product = await this.productService.findProductById(id);
    return product;
  }

  @Query(() => Number)
  async countTotalProducts(): Promise<number> {
    const product = await this.productService.countAllProducts();

    return product;
  }

  @Query(() => [Product])
  async findProductsWithMinQuantity(): Promise<Product[]> {
    const product = await this.productService.findProductsWithMinQuantity();

    return product;
  }

  @Query(() => [Product])
  async findProductsWithMaxQuantity(): Promise<Product[]> {
    const product = await this.productService.findProductsWithMaxQuantity();

    return product;
  }

  @Query(() => [Product])
  async findProductsWithNoQuantity(): Promise<Product[]> {
    const product = await this.productService.findProductsWithNoQuantity();

    return product;
  }

  @Mutation(() => Product)
  async createProduct(
    @Args('data') data: CreateProductInput,
  ): Promise<Product> {
    const product = await this.productService.createProduct(data);

    return product;
  }

  @Mutation(() => Product)
  async updateProduct(
    @Args('id', { type: () => ID }) id: string,
    @Args('data') data: UpdateProductInput,
  ): Promise<Product> {
    const product = this.productService.updateProduct(id, data);

    return product;
  }

  @Mutation(() => Boolean)
  async deleteProduct(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<boolean> {
    const deleted = await this.productService.deleteProduct(id);
    return deleted;
  }
}
