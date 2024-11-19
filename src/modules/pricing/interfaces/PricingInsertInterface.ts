export interface IPricingInsert {
  productId: number;
  productVariationId: number;
  salePlatformId: number;
  costPrice: number;
  profitPercentage: number;
  additionalProfit?: number;
  salePrice: number;
}
