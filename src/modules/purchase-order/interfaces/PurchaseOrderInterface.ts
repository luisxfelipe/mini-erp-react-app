import { ISupplier } from '../../supplier/interfaces/SupplierInterface';
import { IPurchaseOrderStatus } from '../purchase-order-status/interfaces/PurchaseOrderStatusInterface';

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
