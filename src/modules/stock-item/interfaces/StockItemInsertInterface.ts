export interface IStockItemInsert {
  purchaseOrderItemId: number;
  productId: number;
  productVariationId: number;
  stockItemStatusId: number;
  identifier?: string;
  identifierTypeId?: number;
}
