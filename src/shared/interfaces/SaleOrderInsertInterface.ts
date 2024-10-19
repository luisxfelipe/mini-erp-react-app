export interface ISaleOrderInsert {
  date: string;
  platformId: number;
  orderNumber?: string;
  trackingCode?: string;
  statusId: number;
  discount?: number;
  shippingCost?: number;
}
