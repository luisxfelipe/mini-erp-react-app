import toast from 'react-hot-toast';

import {
  URL_SALE_STATUS,
  URL_SALE_STATUS_ID,
} from '../../../../shared/constants/urls';
import { MethodsEnum } from '../../../../shared/enums/methods.enum';
import { useRequests } from '../../../../shared/hooks/useRequests';
import { ISaleStatusInsert } from '../interfaces/SaleStatusInsertInterface';
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

  const getSaleStatusById = async (id: number) => {
    try {
      const response = await request<ISaleStatus>(
        URL_SALE_STATUS_ID.replace('{saleStatusId}', id.toString()),
        MethodsEnum.GET,
      );
      return response;
    } catch (error) {
      toast.error('Erro ao buscar o status da venda');
      throw new Error(`Erro ao buscar o status da venda: ${error}`);
    }
  };

  const saveSaleStatus = async (saleStatus: ISaleStatusInsert, id?: string) => {
    const url = id
      ? URL_SALE_STATUS_ID.replace('{saleStatusId}', id)
      : URL_SALE_STATUS;
    const method = id ? MethodsEnum.PATCH : MethodsEnum.POST;

    try {
      const response = await request<ISaleStatus>(url, method, saleStatus);
      return response;
    } catch (error) {
      throw new Error(`Erro ao salvar o status da venda: ${error}`);
    }
  };

  return { getSaleStatus, getSaleStatusById, saveSaleStatus };
};

export default useSaleStatusRequests;
