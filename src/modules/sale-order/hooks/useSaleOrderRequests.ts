import toast from 'react-hot-toast';

import {
  URL_SALE_ORDER_ID,
  URL_SALE_ORDERS,
} from '../../../shared/constants/urls';
import { MethodsEnum } from '../../../shared/enums/methods.enum';
import { useRequests } from '../../../shared/hooks/useRequests';
import { ISaleOrderInsert } from '../interfaces/SaleOrderInsertInterface';
import { ISaleOrder } from '../interfaces/SaleOrderInterface';

const useSaleOrderRequests = () => {
  const { request } = useRequests();

  const getSaleOrders = async () => {
    const response = await request<ISaleOrder[]>(
      URL_SALE_ORDERS,
      MethodsEnum.GET,
    );

    if (response) {
      return response;
    }
    return [];
  };

  const getSaleOrderById = async (id: number) => {
    try {
      const response = await request<ISaleOrder>(
        URL_SALE_ORDER_ID.replace('{saleOrderId}', id.toString()),
        MethodsEnum.GET,
      );

      return response;
    } catch (error) {
      toast.error('Erro ao buscar a venda');
      throw new Error(`Erro ao buscar a venda: ${error}`);
    }
  };

  const saveSaleOrder = async (
    saleOrder: ISaleOrderInsert,
    id?: string,
  ): Promise<ISaleOrder | Error | undefined> => {
    const url = id
      ? URL_SALE_ORDER_ID.replace('{saleOrderId}', id)
      : URL_SALE_ORDERS;
    const method = id ? MethodsEnum.PATCH : MethodsEnum.POST;

    try {
      const response = await request<ISaleOrder>(url, method, saleOrder);
      return response;
    } catch (error) {
      return new Error(`Erro ao salvar a venda: ${error}`);
    }
  };

  return { getSaleOrders, getSaleOrderById, saveSaleOrder };
};

export default useSaleOrderRequests;
