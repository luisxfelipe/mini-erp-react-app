export interface IIntegrationProductSupplierInsert {
  productId: number;
  productVariationId: number;
  supplierId: number;
  supplierProductCode: string;
  statusId: number;
  supplierProductLink?: string;
  blingProductId?: number;
}
