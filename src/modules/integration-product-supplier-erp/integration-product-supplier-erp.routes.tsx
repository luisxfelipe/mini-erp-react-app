import { RouteObject } from 'react-router-dom';

import {
    IntegrationProductSupplierErpDetails
} from './screens/IntegrationProductSupplierErpDetails';
import { IntegrationProductSupplierErpList } from './screens/IntegrationProductSupplierErpList';

export enum IntegrationProductSupplierErpRoutesEnum {
  INTEGRATION_PRODUCT_SUPPLIER_ERP = 'integration-product-supplier-erp',
  INTEGRATION_PRODUCT_SUPPLIER_ERP_INSERT = '/integration-product-supplier-erp/insert',
}

export const integrationProductSupplierErpRoutes: RouteObject[] = [
  {
    path: IntegrationProductSupplierErpRoutesEnum.INTEGRATION_PRODUCT_SUPPLIER_ERP,
    element: <IntegrationProductSupplierErpList />,
  },
  {
    path: IntegrationProductSupplierErpRoutesEnum.INTEGRATION_PRODUCT_SUPPLIER_ERP_INSERT,
    element: <IntegrationProductSupplierErpDetails />,
  },
];
