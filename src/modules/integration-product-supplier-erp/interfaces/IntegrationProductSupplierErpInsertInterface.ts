export interface IIntegrationProductSupplierInsert {
  productId: number;
  productVariationId: number;
  supplierId: number;
  supplierProductCode: string;
  inStockInTheSupplier: boolean;
  supplierProductLink?: string;
  blingProductId?: number;
}
