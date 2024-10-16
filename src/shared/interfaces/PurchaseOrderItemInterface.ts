import { IProduct } from './ProductInterface';
import { IProductVariation } from './ProductVariationInterface';
import { IPurchaseOrderItemStatus } from './PurchaseOrderItemStatusInterface';

export interface IPurchaseOrderItem {
  id: number;
  purchaseOrderId: number;
  product: IProduct;
  productVariation: IProductVariation;
  supplierProductCode: string;
  price: number;
  purchaseOrderItemStatus: IPurchaseOrderItemStatus;
  productLink: string;
}
