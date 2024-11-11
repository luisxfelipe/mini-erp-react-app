export interface IStockItem {
  id: number;
  purchaseOrderItemId: number;
  productId: number;
  productVariationId: number;
  saleOrderItemId: number;
  stockItemStatusId: number;
  identifier?: string;
  identifierTypeId?: number;
}
