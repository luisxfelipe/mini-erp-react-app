import { RouteObject } from 'react-router-dom';

import { SupplierDetails } from './screens/SupplierDetails';
import { SupplierList } from './screens/SupplierList';

export enum SupplierRoutesEnum {
  SUPPLIERS = '/suppliers',
  SUPPLIER_INSERT = '/suppliers/insert',
  SUPPLIER_EDIT = '/suppliers/:supplierId',
}

export const supplierRoutes: RouteObject[] = [
  {
    path: SupplierRoutesEnum.SUPPLIERS,
    element: <SupplierList />,
  },
  {
    path: SupplierRoutesEnum.SUPPLIER_INSERT,
    element: <SupplierDetails />,
  },
  {
    path: SupplierRoutesEnum.SUPPLIER_EDIT,
    element: <SupplierDetails />,
  },
];
