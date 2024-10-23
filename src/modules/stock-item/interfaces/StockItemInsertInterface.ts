import { IProduct } from '../../product/interfaces/ProductInterface';
import { IProductVariation } from '../../product/product-variation/interfaces/ProductVariationInterface';

export interface IStockItemInsert {
  purchaseOrderItemId: number;
  product: IProduct;
  productVariation: IProductVariation;
  stockItemStatusId: number;
  identifier?: string;
  identifierTypeId?: number;
}
