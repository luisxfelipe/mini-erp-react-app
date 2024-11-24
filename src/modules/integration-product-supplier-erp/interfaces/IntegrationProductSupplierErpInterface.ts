import { IProduct } from '../../product/interfaces/ProductInterface';
import { IProductVariation } from '../../product/product-variation/interfaces/ProductVariationInterface';
import { ISupplier } from '../../supplier/interfaces/SupplierInterface';
import { IIntegrationStatus } from '../integration-status/interfaces/IntegrationStatusInterface';

export interface IIntegrationProductSupplier {
  id: number;
  product: IProduct;
  productVariation: IProductVariation;
  supplier: ISupplier;
  supplierProductCode: string;
  status: IIntegrationStatus;
  supplierProductLink?: string;
  blingProductId?: number;
}
