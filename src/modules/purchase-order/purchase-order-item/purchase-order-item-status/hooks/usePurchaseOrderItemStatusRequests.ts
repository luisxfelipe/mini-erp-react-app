import { URL_PURCHASE_ORDER_ITEM_STATUS } from '../../../../../shared/constants/urls';
import { MethodsEnum } from '../../../../../shared/enums/methods.enum';
import { useRequests } from '../../../../../shared/hooks/useRequests';
import {
    IPurchaseOrderItemStatus
} from '../../../../../shared/interfaces/PurchaseOrderItemStatusInterface';

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

  return {
    getPurchaseOrderItemStatus,
  };
};

export default usePurchaseOrderItemStatusRequests;
