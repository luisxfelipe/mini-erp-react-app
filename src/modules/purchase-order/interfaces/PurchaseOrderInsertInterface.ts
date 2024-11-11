export interface IPurchaseOrderInsert {
  date: string;
  supplierId: number;
  orderNumber?: string;
  trackingCode?: string;
  purchaseOrderStatusId: number;
  discount?: number;
  shippingCost?: number;
}
