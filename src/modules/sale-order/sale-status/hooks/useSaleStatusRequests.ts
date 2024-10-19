import { URL_SALE_STATUS } from '../../../../shared/constants/urls';
import { MethodsEnum } from '../../../../shared/enums/methods.enum';
import { useRequests } from '../../../../shared/hooks/useRequests';
import { ISaleStatus } from '../interfaces/SaleStatusInterface';

const useSaleStatusRequests = () => {
  const { request } = useRequests();

  const getSaleStatus = async () => {
    const response = await request<ISaleStatus[]>(
      URL_SALE_STATUS,
      MethodsEnum.GET,
    );

    if (response) {
      return response;
    }
    return [];
  };

  return { getSaleStatus };
};

export default useSaleStatusRequests;
