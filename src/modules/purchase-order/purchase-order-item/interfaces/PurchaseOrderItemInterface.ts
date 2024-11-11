import {
    IProductVariation
} from '../../../product/product-variation/interfaces/ProductVariationInterface';
import {
    IPurchaseOrderItemStatus
} from '../purchase-order-item-status/interfaces/PurchaseOrderItemStatusInterface';
import { IProduct } from './ProductInterface';

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
