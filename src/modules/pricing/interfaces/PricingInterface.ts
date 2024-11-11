import { IPlatform } from '../../platform/interfaces/PlatformInterface';
import { IProduct } from '../../product/interfaces/ProductInterface';
import { IProductVariation } from '../../product/product-variation/interfaces/ProductVariationInterface';

export interface IPricing {
  id: number;
  product: IProduct;
  productVariation: IProductVariation;
  salePlatform: IPlatform;
  costPrice: number;
  salePrice: number;
}
