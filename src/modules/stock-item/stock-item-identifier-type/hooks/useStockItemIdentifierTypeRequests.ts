import { URL_STOCK_ITEM_IDENTIFIER_TYPES } from '../../../../shared/constants/urls';
import { MethodsEnum } from '../../../../shared/enums/methods.enum';
import { useRequests } from '../../../../shared/hooks/useRequests';
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

  return { getStockItemIdentifierTypes };
};
export default useStockItemIdentifierTypeRequests;
