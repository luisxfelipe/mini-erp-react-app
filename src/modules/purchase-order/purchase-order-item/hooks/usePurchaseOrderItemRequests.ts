import {
    URL_PURCHASE_ORDER_ITEM_ID, URL_PURCHASE_ORDER_ITEMS
} from '../../../../shared/constants/urls';
import { MethodsEnum } from '../../../../shared/enums/methods.enum';
import { useRequests } from '../../../../shared/hooks/useRequests';
import { IPurchaseOrderItemInsert } from '../interfaces/PurchaseOrderItemInsertInterface';
import { IPurchaseOrderItem } from '../interfaces/PurchaseOrderItemInterface';

const usePurchaseOrderItemRequests = () => {
  const { request } = useRequests();

  const getPurchaseOrderItemById = async (
    purchaseOrderId: number,
    purchaseOrderItemId: number,
  ) => {
    const response = await request<IPurchaseOrderItem>(
      URL_PURCHASE_ORDER_ITEM_ID.replace(
        '{purchaseOrderId}',
        purchaseOrderId.toString(),
      ).replace('{purchaseOrderItemId}', purchaseOrderItemId.toString()),
      MethodsEnum.GET,
    );
    if (response) {
      return response;
    }
    return {} as IPurchaseOrderItem;
  };

  const getPurchaseOrderItems = async (orderId: number) => {
    const response = await request<IPurchaseOrderItem[]>(
      URL_PURCHASE_ORDER_ITEMS.replace('{purchaseOrderId}', orderId.toString()),
      MethodsEnum.GET,
    );
    if (response) {
      return response;
    }
  };

  const savePurchaseOrderItem = async (
    purchaseOrderItem: IPurchaseOrderItemInsert,
    purchaseOrderId: string,
    id?: string,
  ) => {
    let url = '';

    if (id) {
      url = URL_PURCHASE_ORDER_ITEM_ID.replace(
        '{purchaseOrderId}',
        purchaseOrderId,
      ).replace('{purchaseOrderItemId}', id);
    } else {
      url = URL_PURCHASE_ORDER_ITEMS.replace(
        '{purchaseOrderId}',
        purchaseOrderId,
      );
    }

    const method = id ? MethodsEnum.PATCH : MethodsEnum.POST;

    try {
      const response = await request<IPurchaseOrderItem>(
        url,
        method,
        purchaseOrderItem,
      );
      if (response) {
        return response;
      }
    } catch (error) {
      throw new Error(`Erro ao salvar o item da ordem de compra: ${error}`);
    }
  };

  return {
    getPurchaseOrderItemById,
    getPurchaseOrderItems,
    savePurchaseOrderItem,
  };
};

export default usePurchaseOrderItemRequests;
