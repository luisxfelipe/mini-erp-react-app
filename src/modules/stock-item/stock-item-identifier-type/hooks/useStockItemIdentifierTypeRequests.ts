import toast from 'react-hot-toast';

import {
    URL_STOCK_ITEM_IDENTIFIER_TYPE_ID, URL_STOCK_ITEM_IDENTIFIER_TYPES
} from '../../../../shared/constants/urls';
import { MethodsEnum } from '../../../../shared/enums/methods.enum';
import { useRequests } from '../../../../shared/hooks/useRequests';
import {
    IStockItemIdentifierTypeInsert
} from '../interfaces/StockItemIdentifierTypeInsertInterface';
import { IStockItemIdentifierType } from '../interfaces/StockItemIdentifierTypeInterface';

const useStockItemIdentifierTypeRequests = () => {
  const { request } = useRequests();

  const getStockItemIdentifierTypes = async () => {
    const response = await request<IStockItemIdentifierType[]>(
      URL_STOCK_ITEM_IDENTIFIER_TYPES,
      MethodsEnum.GET,
    );
    if (response) {
      return response;
    }
    return [];
  };

  const getStockItemIdentifierTypeById = async (id: number) => {
    try {
      const response = await request<IStockItemIdentifierType>(
        URL_STOCK_ITEM_IDENTIFIER_TYPE_ID.replace(
          '{stockItemIdentifierTypeId}',
          id.toString(),
        ),
        MethodsEnum.GET,
      );
      return response;
    } catch (error) {
      toast.error('Erro ao buscar o tipo de identificador: ');
      throw new Error(`Erro ao buscar o tipo de identificador: ${error}`);
    }
  };

  const saveStockItemIdentifierType = async (
    stockItemIdentifierType: IStockItemIdentifierTypeInsert,
    id?: string,
  ) => {
    const url = id
      ? URL_STOCK_ITEM_IDENTIFIER_TYPE_ID.replace(
          '{stockItemIdentifierTypeId}',
          id,
        )
      : URL_STOCK_ITEM_IDENTIFIER_TYPES;
    const method = id ? MethodsEnum.PATCH : MethodsEnum.POST;

    try {
      const response = await request<IStockItemIdentifierType>(
        url,
        method,
        stockItemIdentifierType,
      );
      return response;
    } catch (error) {
      throw new Error(`Erro ao salvar o tipo de identificador: ${error}`);
    }
  };

  return {
    getStockItemIdentifierTypes,
    getStockItemIdentifierTypeById,
    saveStockItemIdentifierType,
  };
};
export default useStockItemIdentifierTypeRequests;
