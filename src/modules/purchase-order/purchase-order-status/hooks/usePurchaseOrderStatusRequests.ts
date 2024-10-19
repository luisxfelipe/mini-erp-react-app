import toast from 'react-hot-toast';

import {
    URL_PURCHASE_ORDER_STATUS, URL_PURCHASE_ORDER_STATUS_ID
} from '../../../../shared/constants/urls';
import { MethodsEnum } from '../../../../shared/enums/methods.enum';
import { useRequests } from '../../../../shared/hooks/useRequests';
import { IPurchaseOrderStatusInsert } from '../interfaces/PurchaseOrderStatusInsertInterface';
import { IPurchaseOrderStatus } from '../interfaces/PurchaseOrderStatusInterface';

const usePurchaseOrderStatusRequests = () => {
  const { request } = useRequests();

  const getPurchaseOrderStatus = async () => {
    const response = await request<IPurchaseOrderStatus[]>(
      URL_PURCHASE_ORDER_STATUS,
      MethodsEnum.GET,
    );

    if (response) {
      return response;
    }
    return [];
  };

  const getPurchaseOrderStatusById = async (id: number) => {
    try {
      const response = await request<IPurchaseOrderStatus>(
        URL_PURCHASE_ORDER_STATUS_ID.replace(
          '{purchaseOrderStatusId}',
          id.toString(),
        ),
        MethodsEnum.GET,
      );
      return response;
    } catch (error) {
      toast.error('Erro ao buscar o status do pedido');
      throw new Error(`Erro ao buscar o status do pedido: ${error}`);
    }
  };

  const savePurchaseOrderStatus = async (
    purchaseOrderStatus: IPurchaseOrderStatusInsert,
    id?: string,
  ) => {
    const url = id
      ? URL_PURCHASE_ORDER_STATUS_ID.replace('{purchaseOrderStatusId}', id)
      : URL_PURCHASE_ORDER_STATUS;
    const method = id ? MethodsEnum.PATCH : MethodsEnum.POST;

    try {
      const response = await request<IPurchaseOrderStatus>(
        url,
        method,
        purchaseOrderStatus,
      );
      return response;
    } catch (error) {
      throw new Error(`Erro ao salvar o status do pedido: ${error}`);
    }
  };

  return {
    getPurchaseOrderStatus,
    getPurchaseOrderStatusById,
    savePurchaseOrderStatus,
  };
};

export default usePurchaseOrderStatusRequests;
