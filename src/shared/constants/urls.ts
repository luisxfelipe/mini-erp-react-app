export const URL_BASE = import.meta.env.VITE_API_URL;

export const URL_CATEGORIES = `${URL_BASE}/categories`;
export const URL_CATEGORY_ID = `${URL_BASE}/categories/{categoryId}`;

export const URL_LOGIN = `${URL_BASE}/auth/signin`;

export const URL_PLATFORMS = `${URL_BASE}/platforms`;
export const URL_PLATFORM_ID = `${URL_BASE}/platforms/{platformId}`;

export const URL_PRICING = `${URL_BASE}/pricing`;
export const URL_PRICING_ID = `${URL_BASE}/pricing/{pricingId}`;

export const URL_PRODUCTS = `${URL_BASE}/products`;
export const URL_PRODUCT_ID = `${URL_BASE}/products/{productId}`;

export const URL_PRODUCT_VARIATIONS = `${URL_BASE}/products/{productId}/product-variations`;
export const URL_PRODUCT_VARIATION_ID = `${URL_BASE}/products/{productId}/product-variations/{productVariationId}`;

export const URL_PURCHASE_ORDERS = `${URL_BASE}/purchase-orders`;
export const URL_PURCHASE_ORDER_ID = `${URL_BASE}/purchase-orders/{purchaseOrderId}`;

export const URL_PURCHASE_ORDER_ITEMS = `${URL_BASE}/purchase-orders/{purchaseOrderId}/purchase-order-items`;
export const URL_PURCHASE_ORDER_ITEM_ID = `${URL_BASE}/purchase-orders/{purchaseOrderId}/purchase-order-items/{purchaseOrderItemId}`;

export const URL_PURCHASE_ORDER_ITEM_STATUS = `${URL_BASE}/purchase-order-item-status`;
export const URL_PURCHASE_ORDER_ITEM_STATUS_ID = `${URL_BASE}/purchase-order-item-status/{purchaseOrderItemStatusId}`;

export const URL_PURCHASE_ORDER_STATUS = `${URL_BASE}/purchase-order-status`;
export const URL_PURCHASE_ORDER_STATUS_ID = `${URL_BASE}/purchase-order-status/{purchaseOrderStatusId}`;

export const URL_SALE_ORDERS = `${URL_BASE}/sales-orders`;
export const URL_SALE_ORDER_ID = `${URL_BASE}/sales-orders/{saleOrderId}`;

export const URL_SALE_ORDER_ITEMS = `${URL_BASE}/sale-orders/{saleOrderId}/sale-order-items`;
export const URL_SALE_ORDER_ITEM_ID = `${URL_BASE}/sale-orders/{saleOrderId}/sale-order-items/{saleOrderItemId}`;

export const URL_SALE_ORDER_ITEM_STATUS = `${URL_BASE}/sale-order-item-status`;
export const URL_SALE_ORDER_ITEM_STATUS_ID = `${URL_BASE}/sale-order-item-status/{saleOrderItemStatusId}`;

export const URL_SALE_PLATFORM_COMMISSIONS = `${URL_BASE}/sales-platform-commissions`;
export const URL_SALE_PLATFORM_COMMISSION_ID = `${URL_BASE}/sales-platform-commissions/{salePlatformCommissionId}`;
export const URL_SALE_PLATFORM_COMMISSION_BY_PLATFORM_ID = `${URL_BASE}/sales-platform-commissions/by-platform/{platformId}`;

export const URL_SALE_STATUS = `${URL_BASE}/sale-status`;
export const URL_SALE_STATUS_ID = `${URL_BASE}/sale-status/{saleStatusId}`;

export const URL_STOCK_ITEMS = `${URL_BASE}/stock-items`;
export const URL_STOCK_ITEM_ID = `${URL_BASE}/stock-items/{stockItemId}`;

export const URL_STOCK_ITEM_IDENTIFIER_TYPES = `${URL_BASE}/stock-item-identifier-type`;
export const URL_STOCK_ITEM_IDENTIFIER_TYPE_ID = `${URL_BASE}/stock-item-identifier-type/{stockItemIdentifierTypeId}`;

export const URL_STOCK_ITEM_STATUS = `${URL_BASE}/stock-item-status`;
export const URL_STOCK_ITEM_STATUS_ID = `${URL_BASE}/stock-item-status/{stockItemStatusId}`;

export const URL_SUPPLIERS = `${URL_BASE}/suppliers`;
export const URL_SUPPLIER_ID = `${URL_BASE}/suppliers/{supplierId}`;

export const URL_INTEGRATION_PRODUCT_SUPPLIER_ERP = `${URL_BASE}/integration-product-supplier-erp`;
export const URL_INTEGRATION_PRODUCT_SUPPLIER_ERP_ID = `${URL_BASE}/integration-product-supplier-erp/{integrationProductSupplierErpId}`;

export const URL_INTEGRATION_STATUS = `${URL_BASE}/integration-status`;
export const URL_INTEGRATION_STATUS_ID = `${URL_BASE}/integration-status/{integrationStatusId}`;

export const URL_USERS = '/users';
