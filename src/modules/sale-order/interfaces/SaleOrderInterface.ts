import { IPlatform } from '../../platform/interfaces/PlatformInterface';
import { ISaleStatus } from '../sale-status/interfaces/SaleStatusInterface';

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
