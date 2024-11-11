import toast from 'react-hot-toast';

import {
  URL_PURCHASE_ORDER_ITEM_STATUS,
  URL_PURCHASE_ORDER_ITEM_STATUS_ID,
} from '../../../../../shared/constants/urls';
import { MethodsEnum } from '../../../../../shared/enums/methods.enum';
import { useRequests } from '../../../../../shared/hooks/useRequests';
import { IPurchaseOrderItemStatusInsert } from '../interfaces/PurchaseOrderItemStatusInsertInterface';
import { IPurchaseOrderItemStatus } from '../interfaces/PurchaseOrderItemStatusInterface';

const usePurchaseOrderItemStatusRequests = () => {
  const { request } = useRequests();

  const getPurchaseOrderItemStatus = async () => {
    const response = await request<IPurchaseOrderItemStatus[]>(
      URL_PURCHASE_ORDER_ITEM_STATUS,
      MethodsEnum.GET,
    );

    if (response) {
      return response;
    }
    return [];
  };

  const getPurchaseOrderItemStatusById = async (id: number) => {
    try {
      const response = await request<IPurchaseOrderItemStatus>(
        URL_PURCHASE_ORDER_ITEM_STATUS_ID.replace(
          '{purchaseOrderItemStatusId}',
          id.toString(),
        ),
        MethodsEnum.GET,
      );
      return response;
    } catch (error) {
      toast.error('Erro ao buscar o status do item da compra');
      throw new Error(`Erro ao buscar o status do item da compra: ${error}`);
    }
  };

  const savePurchaseOrderItemStatus = async (
    purchaseOrderItemStatus: IPurchaseOrderItemStatusInsert,
    id?: string,
  ) => {
    const url = id
      ? URL_PURCHASE_ORDER_ITEM_STATUS_ID.replace(
          '{purchaseOrderItemStatusId}',
          id,
        )
      : URL_PURCHASE_ORDER_ITEM_STATUS;
    const method = id ? MethodsEnum.PATCH : MethodsEnum.POST;

    try {
      const response = await request<IPurchaseOrderItemStatus>(
        url,
        method,
        purchaseOrderItemStatus,
      );
      return response;
    } catch (error) {
      throw new Error(`Erro ao salvar o status do item da compra: ${error}`);
    }
  };

  return {
    getPurchaseOrderItemStatus,
    getPurchaseOrderItemStatusById,
    savePurchaseOrderItemStatus,
  };
};

export default usePurchaseOrderItemStatusRequests;
