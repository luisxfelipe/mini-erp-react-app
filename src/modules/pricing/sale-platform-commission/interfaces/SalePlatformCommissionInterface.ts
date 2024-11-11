import { IPlatform } from '../../../platform/interfaces/PlatformInterface';

export interface ISalePlatformCommission {
  id: number;
  salePlatform: IPlatform;
  commissionPercentage: number;
  costPerItemSold?: number;
  defaultProfitPercentage: number;
  additionalProfit?: number;
}
