import { IPurchaseOrderStatus } from './PurchaseOrderStatusInterface';
import { ISupplier } from './SupplierInterface';

export interface IPurchaseOrder {
  id: number;
  date: Date;
  supplier: ISupplier;
  orderNumber?: string;
  trackingCode?: string;
  purchaseOrderStatus: IPurchaseOrderStatus;
  discount?: number;
  shippingCost?: number;
}
