export interface IIntegrationProductSupplierInsert {
  productId: number;
  productVariationId: number;
  supplierId: number;
  supplierPrice: number;
  supplierProductCode: string;
  inStockInTheSupplier: boolean;
  supplierProductLink?: string;
  blingProductId?: number;
}
