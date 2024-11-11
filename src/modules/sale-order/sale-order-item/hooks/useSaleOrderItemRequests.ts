import { URL_SALE_ORDER_ITEM_ID, URL_SALE_ORDER_ITEMS } from '../../../../shared/constants/urls';
import { MethodsEnum } from '../../../../shared/enums/methods.enum';
import { useRequests } from '../../../../shared/hooks/useRequests';
import { ISaleOrderItemInsert } from '../interfaces/SaleOrderItemInsertInterface';
import { ISaleOrderItem } from '../interfaces/SaleOrderItemInterface';

const useSaleOrderItemRequests = () => {
  const { request } = useRequests();

  const getSaleOrderItemById = async (
    saleOrderId: number,
    saleOrderItemId: number,
  ) => {
    const response = await request<ISaleOrderItem>(
      URL_SALE_ORDER_ITEM_ID.replace(
        '{saleOrderId}',
        saleOrderId.toString(),
      ).replace('{saleOrderItemId}', saleOrderItemId.toString()),
      MethodsEnum.GET,
    );
    if (response) {
      return response;
    }
    return {} as ISaleOrderItem;
  };

  const getSaleOrderItems = async (orderId: number) => {
    const response = await request<ISaleOrderItem[]>(
      URL_SALE_ORDER_ITEMS.replace('{saleOrderId}', orderId.toString()),
      MethodsEnum.GET,
    );
    if (response) {
      return response;
    }
  };

  const saveSaleOrderItem = async (
    saleOrderItem: ISaleOrderItemInsert,
    saleOrderId: string,
    id?: string,
  ) => {
    let url = '';

    if (id) {
      url = URL_SALE_ORDER_ITEM_ID.replace(
        '{saleOrderId}',
        saleOrderId,
      ).replace('{saleOrderItemId}', id);
    } else {
      url = URL_SALE_ORDER_ITEMS.replace('{saleOrderId}', saleOrderId);
    }

    const method = id ? MethodsEnum.PATCH : MethodsEnum.POST;

    try {
      const response = await request<ISaleOrderItem>(
        url,
        method,
        saleOrderItem,
      );
      if (response) {
        return response;
      }
    } catch (error) {
      throw new Error(`Erro ao salvar o item da ordem de venda: ${error}`);
    }
  };

  return {
    getSaleOrderItemById,
    getSaleOrderItems,
    saveSaleOrderItem,
  };
};

export default useSaleOrderItemRequests;
