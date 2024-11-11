import { IPlatform } from '../../modules/platform/interfaces/PlatformInterface';
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
