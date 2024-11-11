export interface ISalePlatformCommissionInsert {
  salePlatformId: number;
  commissionPercentage: number;
  costPerItemSold?: number;
  defaultProfitPercentage: number;
  additionalProfit?: number;
}
