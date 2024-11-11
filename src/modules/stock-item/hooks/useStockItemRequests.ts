import { URL_STOCK_ITEMS } from '../../../shared/constants/urls';
import { MethodsEnum } from '../../../shared/enums/methods.enum';
import { useRequests } from '../../../shared/hooks/useRequests';
import { IStockItemInsert } from '../interfaces/StockItemInsertInterface';
import { IStockItem } from '../interfaces/StockItemInterface';

const useStockItemRequests = () => {
  const { request } = useRequests();

  const getStockItems = async () => {
    const response = await request<IStockItem[]>(
      URL_STOCK_ITEMS,
      MethodsEnum.GET,
    );
    if (response) {
      return response;
    }
    return [];
  };

  // lançar itens no estoque
  const createStockItems = async (stockItems: IStockItemInsert[]) => {
    try {
      const response = await request<IStockItem[]>(
        URL_STOCK_ITEMS,
        MethodsEnum.POST,
        stockItems,
      );
      return response;
    } catch (error) {
      throw new Error(`Erro ao lançar itens no estoque: ${error}`);
    }
  };

  return { createStockItems, getStockItems };
};

export default useStockItemRequests;
