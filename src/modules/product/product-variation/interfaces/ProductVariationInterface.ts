import { IProduct } from '../../interfaces/ProductInterface';

export interface IProductVariation {
  id?: number;
  name: string;
  product?: IProduct;
}
