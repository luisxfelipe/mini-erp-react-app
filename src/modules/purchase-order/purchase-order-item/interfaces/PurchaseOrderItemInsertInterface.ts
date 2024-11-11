export interface IPurchaseOrderItemInsert {
  productId: number;
  productVariationId: number;
  quantity?: number;
  supplierProductCode?: string;
  price: number;
  purchaseOrderItemStatusId: number;
  productLink?: string;
}
