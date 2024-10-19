import { IPlatform } from './PlatformInterface';
import { ISaleStatus } from './SaleStatusInterface';

export interface ISaleOrder {
  id: number;
  date: Date;
  platform: IPlatform;
  orderNumber?: string;
  trackingCode?: string;
  status: ISaleStatus;
  discount?: number;
  shippingCost?: number;
}
