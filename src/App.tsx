import type { Router as RemixRouter } from '@remix-run/router';
import { createBrowserRouter, RouteObject } from 'react-router-dom';

import { Screen } from './components/screen/Screen';
import { categoryRoutes } from './modules/category/category.routes';
import {
    integrationProductSupplierErpRoutes
} from './modules/integration-product-supplier-erp/integration-product-supplier-erp.routes';
import { loginRoutes } from './modules/login/routes';
import { platformRoutes } from './modules/platform/platform.routes';
import { pricingRoutes } from './modules/pricing/pricing.routes';
import {
    salePlatformCommissionRoutes
} from './modules/pricing/sale-platform-commission/sale-platform-commission.routes';
import {
    productVariationRoutes
} from './modules/product/product-variation/produc-variations.routes';
import { productRoutes } from './modules/product/product.routes';
import {
    purchaseOrderItemStatusRoutes
} from './modules/purchase-order/purchase-order-item/purchase-order-item-status/purchase-order-item-status.routes';
import {
    purchaseOrderItemRoutes
} from './modules/purchase-order/purchase-order-item/purchase-order-item.routes';
import {
    purchaseOrderStatusRoutes
} from './modules/purchase-order/purchase-order-status/purchase-order-status.routes';
import { purchaseOrderRoutes } from './modules/purchase-order/purchase-orders.routes';
import {
    saleOrderItemStatusRoutes
} from './modules/sale-order/sale-order-item/sale-order-item-status/sale-order-item-status.routes';
import { saleOrderRoutes } from './modules/sale-order/sale-orders.routes';
import { saleStatusRoutes } from './modules/sale-order/sale-status/sale-status.routes';
import {
    stockItemIdentifierTypeRoutes
} from './modules/stock-item/stock-item-identifier-type/stock-item-identifier-type.routes';
import {
    stockItemStatusRoutes
} from './modules/stock-item/stock-item-status/stock-item-status.routes';
import { stockItemRoutes } from './modules/stock-item/stock-item.routes';
import { supplierRoutes } from './modules/supplier/supplier.routes';
import { verifyLoggedIn } from './shared/functions/connection/auth';

const routes: RouteObject[] = [...loginRoutes];
const routesLoggedIn: RouteObject[] = [
  ...categoryRoutes,
  ...integrationProductSupplierErpRoutes,
  ...platformRoutes,
  ...pricingRoutes,
  ...productRoutes,
  ...productVariationRoutes,
  ...purchaseOrderRoutes,
  ...purchaseOrderItemRoutes,
  ...purchaseOrderItemStatusRoutes,
  ...purchaseOrderStatusRoutes,
  ...saleOrderRoutes,
  ...salePlatformCommissionRoutes,
  ...saleOrderItemStatusRoutes,
  ...saleStatusRoutes,
  ...stockItemRoutes,
  ...stockItemIdentifierTypeRoutes,
  ...stockItemStatusRoutes,
  ...supplierRoutes,
].map((route) => ({
  ...route,
  loader: verifyLoggedIn,
}));

const router: RemixRouter = createBrowserRouter([
  {
    element: <Screen />,
    children: [...routesLoggedIn],
  },
  ...routes,
]);

export { router };
