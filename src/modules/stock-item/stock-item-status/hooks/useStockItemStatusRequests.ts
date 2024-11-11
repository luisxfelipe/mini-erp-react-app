import toast from 'react-hot-toast';

import { URL_STOCK_ITEM_STATUS, URL_STOCK_ITEM_STATUS_ID } from '../../../../shared/constants/urls';
import { MethodsEnum } from '../../../../shared/enums/methods.enum';
import { useRequests } from '../../../../shared/hooks/useRequests';
import { IStockItemStatusInsert } from '../interfaces/StockItemStatusInsertInterface';
import { IStockItemStatus } from '../interfaces/StockItemStatusInterface';

const useStockItemStatusRequests = () => {
  const { request } = useRequests();

  const getStockItemStatus = async () => {
    const response = await request<IStockItemStatus[]>(
      URL_STOCK_ITEM_STATUS,
      MethodsEnum.GET,
    );

    if (response) {
      return response;
    }
    return [];
  };

  const getStockItemStatusById = async (id: number) => {
    try {
      const response = await request<IStockItemStatus>(
        URL_STOCK_ITEM_STATUS_ID.replace('{stockItemStatusId}', id.toString()),
        MethodsEnum.GET,
      );
      return response;
    } catch (error) {
      toast.error('Erro ao buscar o status do item de estoque');
      throw new Error(`Erro ao buscar o status do item de estoque: ${error}`);
    }
  };

  const saveStockItemStatus = async (
    stockItemStatus: IStockItemStatusInsert,
    id?: string,
  ) => {
    const url = id
      ? URL_STOCK_ITEM_STATUS_ID.replace('{stockItemStatusId}', id)
      : URL_STOCK_ITEM_STATUS;
    const method = id ? MethodsEnum.PATCH : MethodsEnum.POST;

    try {
      const response = await request<IStockItemStatus>(
        url,
        method,
        stockItemStatus,
      );
      return response;
    } catch (error) {
      throw new Error(`Erro ao salvar o status do item de estoque: ${error}`);
    }
  };

  return {
    getStockItemStatus,
    getStockItemStatusById,
    saveStockItemStatus,
  };
};

export default useStockItemStatusRequests;
