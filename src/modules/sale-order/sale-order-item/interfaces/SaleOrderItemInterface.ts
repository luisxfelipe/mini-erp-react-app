import { IProduct } from '../../../product/interfaces/ProductInterface';
import {
    IProductVariation
} from '../../../product/product-variation/interfaces/ProductVariationInterface';
import {
    ISaleOrderItemStatus
} from '../sale-order-item-status/interfaces/SaleOrderItemStatusInterface';

export interface ISaleOrderItem {
  id: number;
  saleOrderId: number;
  product: IProduct;
  productVariation: IProductVariation;
  saleOrderItemStatus: ISaleOrderItemStatus;
  price: number;
}
