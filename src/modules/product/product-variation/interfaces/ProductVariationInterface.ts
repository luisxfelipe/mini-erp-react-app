import { IProduct } from './ProductInterface';

export interface IProductVariation {
  id?: number;
  name: string;
  product?: IProduct;
}
