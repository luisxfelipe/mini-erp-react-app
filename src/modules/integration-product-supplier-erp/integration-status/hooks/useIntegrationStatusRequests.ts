import toast from 'react-hot-toast';

import {
  URL_INTEGRATION_STATUS,
  URL_INTEGRATION_STATUS_ID,
} from '../../../../shared/constants/urls';
import { MethodsEnum } from '../../../../shared/enums/methods.enum';
import { useRequests } from '../../../../shared/hooks/useRequests';
import { IIntegrationStatusInsert } from '../interfaces/IntegrationStatusInsertInterface';
import { IIntegrationStatus } from '../interfaces/IntegrationStatusInterface';

const useIntegrationStatusRequests = () => {
  const { request } = useRequests();

  const getIntegrationStatus = async () => {
    const response = await request<IIntegrationStatus[]>(
      URL_INTEGRATION_STATUS,
      MethodsEnum.GET,
    );
    if (response) {
      return response;
    }
    return [];
  };

  const getIntegrationStatusById = async (id: number) => {
    try {
      const response = await request<IIntegrationStatus>(
        URL_INTEGRATION_STATUS_ID.replace(
          '{integrationStatusId}',
          id.toString(),
        ),
        MethodsEnum.GET,
      );
      return response;
    } catch (error) {
      toast.error('Erro ao buscar o status de integração');
      throw new Error(`Erro ao buscar o status de integração: ${error}`);
    }
  };

  const saveIntegrationStatus = async (
    integrationStatus: IIntegrationStatusInsert,
    id?: string,
  ) => {
    const url = id
      ? URL_INTEGRATION_STATUS_ID.replace('{integrationStatusId}', id)
      : URL_INTEGRATION_STATUS;
    const method = id ? MethodsEnum.PATCH : MethodsEnum.POST;
    try {
      const response = await request<IIntegrationStatus>(
        url,
        method,
        integrationStatus,
      );
      return response;
    } catch (error) {
      toast.error('Erro ao salvar o status de integração');
      throw new Error(`Erro ao salvar o status de integração: ${error}`);
    }
  };

  return {
    getIntegrationStatus,
    getIntegrationStatusById,
    saveIntegrationStatus,
  };
};

export default useIntegrationStatusRequests;
