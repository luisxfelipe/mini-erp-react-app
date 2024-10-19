import toast from 'react-hot-toast';

import { URL_PURCHASE_ORDER_ID, URL_PURCHASE_ORDERS } from '../../../shared/constants/urls';
import { MethodsEnum } from '../../../shared/enums/methods.enum';
import { useRequests } from '../../../shared/hooks/useRequests';
import { IPurchaseOrder } from '../../../shared/interfaces/PurchaseOrderInterface';
import { IPurchaseOrderInsert } from '../interfaces/PurchaseOrderInsertInterface';

const usePurchaseOrderRequests = () => {
  const { request } = useRequests();

  const getPurchaseOrders = async () => {
    const response = await request<IPurchaseOrder[]>(
      URL_PURCHASE_ORDERS,
      MethodsEnum.GET,
    );

    if (response) {
      return response;
    }
    return [];
  };

  const getPurchaseOrderById = async (id: number) => {
    try {
      const response = await request<IPurchaseOrder>(
        URL_PURCHASE_ORDER_ID.replace('{purchaseOrderId}', id.toString()),
        MethodsEnum.GET,
      );

      return response;
    } catch (error) {
      toast.error('Erro ao buscar a compra');
      throw new Error(`Erro ao buscar a compra: ${error}`);
    }
  };

  const savePurchaseOrder = async (
    purchaseOrder: IPurchaseOrderInsert,
    id?: string,
  ): Promise<IPurchaseOrder | Error | undefined> => {
    const url = id
      ? URL_PURCHASE_ORDER_ID.replace('{purchaseOrderId}', id)
      : URL_PURCHASE_ORDERS;
    const method = id ? MethodsEnum.PATCH : MethodsEnum.POST;

    try {
      const response = await request<IPurchaseOrder>(
        url,
        method,
        purchaseOrder,
      );
      return response;
    } catch (error) {
      return new Error(`Erro ao salvar a compra: ${error}`);
    }
  };

  return { getPurchaseOrders, getPurchaseOrderById, savePurchaseOrder };
};

export default usePurchaseOrderRequests;
