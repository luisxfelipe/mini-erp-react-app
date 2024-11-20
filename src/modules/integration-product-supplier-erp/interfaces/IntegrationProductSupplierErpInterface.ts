import { IProduct } from '../../product/interfaces/ProductInterface';
import {
    IProductVariation
} from '../../product/product-variation/interfaces/ProductVariationInterface';
import { ISupplier } from '../../supplier/interfaces/SupplierInterface';

export interface IIntegrationProductSupplier {
  id: number;
  product: IProduct;
  productVariation: IProductVariation;
  supplier: ISupplier;
  supplierProductCode: string;
  inStockInTheSupplier: boolean;
  supplierProductLink?: string;
  blingProductId?: number;
}
