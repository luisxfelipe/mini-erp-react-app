import toast from 'react-hot-toast';

import {
  URL_SALE_PLATFORM_COMMISSION_BY_PLATFORM_ID,
  URL_SALE_PLATFORM_COMMISSION_ID,
  URL_SALE_PLATFORM_COMMISSIONS,
} from '../../../../shared/constants/urls';
import { MethodsEnum } from '../../../../shared/enums/methods.enum';
import { useRequests } from '../../../../shared/hooks/useRequests';
import { ISalePlatformCommissionInsert } from '../interfaces/SalePlatformCommissionInsertInterface';
import { ISalePlatformCommission } from '../interfaces/SalePlatformCommissionInterface';

const useSalePlatformCommissionRequests = () => {
  const { request } = useRequests();

  const getSalePlatformCommissions = async () => {
    const response = await request<ISalePlatformCommission[]>(
      URL_SALE_PLATFORM_COMMISSIONS,
      MethodsEnum.GET,
    );

    if (response) {
      return response;
    }
    return [];
  };

  const getSalePlatformCommissionById = async (id: number) => {
    try {
      const response = await request<ISalePlatformCommission>(
        URL_SALE_PLATFORM_COMMISSION_ID.replace(
          '{salePlatformCommissionId}',
          id.toString(),
        ),
        MethodsEnum.GET,
      );

      return response;
    } catch (error) {
      toast.error('Erro ao buscar a comissão');
      throw new Error(`Erro ao buscar a comissão: ${error}`);
    }
  };

  const getSalePlatformCommissionByPlatformId = async (platformId: number) => {
    try {
      const response = await request<ISalePlatformCommission>(
        URL_SALE_PLATFORM_COMMISSION_BY_PLATFORM_ID.replace(
          '{platformId}',
          platformId.toString(),
        ),
        MethodsEnum.GET,
      );

      return response;
    } catch (error) {
      toast.error('Erro ao buscar a comissão');
      throw new Error(`Erro ao buscar a comissão: ${error}`);
    }
  };

  const saveSalePlatformCommission = async (
    salePlatformCommission: ISalePlatformCommissionInsert,
    id?: string,
  ): Promise<ISalePlatformCommission | Error | undefined> => {
    const url = id
      ? URL_SALE_PLATFORM_COMMISSION_ID.replace(
          '{salePlatformCommissionId}',
          id,
        )
      : URL_SALE_PLATFORM_COMMISSIONS;
    const method = id ? MethodsEnum.PATCH : MethodsEnum.POST;

    try {
      const response = await request<ISalePlatformCommission>(
        url,
        method,
        salePlatformCommission,
      );
      return response;
    } catch (error) {
      return new Error(`Erro ao salvar a comissão: ${error}`);
    }
  };

  return {
    getSalePlatformCommissions,
    getSalePlatformCommissionById,
    getSalePlatformCommissionByPlatformId,
    saveSalePlatformCommission,
  };
};

export default useSalePlatformCommissionRequests;
