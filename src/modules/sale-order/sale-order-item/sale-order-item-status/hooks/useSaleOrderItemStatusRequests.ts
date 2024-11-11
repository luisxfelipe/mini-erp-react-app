import toast from 'react-hot-toast';

import {
    URL_SALE_ORDER_ITEM_STATUS, URL_SALE_ORDER_ITEM_STATUS_ID
} from '../../../../../shared/constants/urls';
import { MethodsEnum } from '../../../../../shared/enums/methods.enum';
import { useRequests } from '../../../../../shared/hooks/useRequests';
import { ISaleOrderItemStatusInsert } from '../interfaces/SaleOrderItemStatusInsertInterface';
import { ISaleOrderItemStatus } from '../interfaces/SaleOrderItemStatusInterface';

const useSaleOrderItemStatusRequests = () => {
  const { request } = useRequests();

  const getSaleOrderItemStatus = async () => {
    const response = await request<ISaleOrderItemStatus[]>(
      URL_SALE_ORDER_ITEM_STATUS,
      MethodsEnum.GET,
    );

    if (response) {
      return response;
    }
    return [];
  };

  const getSaleOrderItemStatusById = async (id: number) => {
    try {
      const response = await request<ISaleOrderItemStatus>(
        URL_SALE_ORDER_ITEM_STATUS_ID.replace(
          '{saleOrderItemStatusId}',
          id.toString(),
        ),
        MethodsEnum.GET,
      );
      return response;
    } catch (error) {
      toast.error('Erro ao buscar o status do item da venda');
      throw new Error(`Erro ao buscar o status do item da venda: ${error}`);
    }
  };

  const saveSaleOrderItemStatus = async (
    saleOrderItemStatus: ISaleOrderItemStatusInsert,
    id?: string,
  ) => {
    const url = id
      ? URL_SALE_ORDER_ITEM_STATUS_ID.replace('{saleOrderItemStatusId}', id)
      : URL_SALE_ORDER_ITEM_STATUS;
    const method = id ? MethodsEnum.PATCH : MethodsEnum.POST;

    try {
      const response = await request<ISaleOrderItemStatus>(
        url,
        method,
        saleOrderItemStatus,
      );
      return response;
    } catch (error) {
      throw new Error(`Erro ao salvar o status do item da venda: ${error}`);
    }
  };

  return {
    getSaleOrderItemStatus,
    getSaleOrderItemStatusById,
    saveSaleOrderItemStatus,
  };
};

export default useSaleOrderItemStatusRequests;
