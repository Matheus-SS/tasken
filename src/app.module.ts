import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { SequelizeModule } from '@nestjs/sequelize';
import { join } from 'path';
import { Product } from './product/product.model';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'remotemysql.com',
      port: 3306,
      username: 'sDlFmNxRuc',
      password: 'sEUy113yuo',
      database: 'sDlFmNxRuc',
      models: [Product],
      autoLoadModels: true,
      synchronize: true,
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    ProductModule,
  ],
})
export class AppModule {}
