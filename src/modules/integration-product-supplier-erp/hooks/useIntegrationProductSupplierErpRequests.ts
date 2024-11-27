import {
  URL_INTEGRATION_PRODUCT_SUPPLIER_ERP,
  URL_INTEGRATION_PRODUCT_SUPPLIER_ERP_ID,
} from '../../../shared/constants/urls';
import { MethodsEnum } from '../../../shared/enums/methods.enum';
import { useRequests } from '../../../shared/hooks/useRequests';
import { IPaginationResponse } from '../../../shared/interfaces/PaginationResponseInteface';
import { IIntegrationProductSupplierInsert } from '../interfaces/IntegrationProductSupplierErpInsertInterface';
import { IIntegrationProductSupplier } from '../interfaces/IntegrationProductSupplierErpInterface';

const useIntegrationProductSupplierErpRequests = () => {
  const { request } = useRequests();

  const getIntegrationProductSupplierErp = async () => {
    const response = await request<IIntegrationProductSupplier[]>(
      URL_INTEGRATION_PRODUCT_SUPPLIER_ERP,
      MethodsEnum.GET,
    );
    if (response) {
      return response;
    }
  };

  const getIntegrationProductSupplierErpPaginated = async (
    page: number,
    take: number,
    search?: string,
  ): Promise<IPaginationResponse<IIntegrationProductSupplier[]>> => {
    try {
      const response = await request<
        IPaginationResponse<IIntegrationProductSupplier[]>
      >(
        `${URL_INTEGRATION_PRODUCT_SUPPLIER_ERP}/pages?search=${search || ''}&page=${page}&take=${take}`,
        MethodsEnum.GET,
      );
      if (!response) {
        throw new Error('Requisição falhou');
      }
      return response;
    } catch (error) {
      throw new Error(error as string);
    }
  };

  const getIntegrationProductSupplierErpById = async (
    integrationProductSupplierErp: number,
  ) => {
    const response = await request<IIntegrationProductSupplier>(
      URL_INTEGRATION_PRODUCT_SUPPLIER_ERP_ID.replace(
        '{integrationProductSupplierErpId}',
        integrationProductSupplierErp.toString(),
      ),
      MethodsEnum.GET,
    );
    if (response) {
      return response;
    }
    return {} as IIntegrationProductSupplier;
  };

  const saveIntegrationProductSupplierErp = async (
    integrationProductSupplierErp: IIntegrationProductSupplierInsert,
    id?: string,
  ) => {
    let url = '';

    if (id) {
      url = URL_INTEGRATION_PRODUCT_SUPPLIER_ERP_ID.replace(
        '{integrationProductSupplierErpId}',
        id,
      );
    } else {
      url = URL_INTEGRATION_PRODUCT_SUPPLIER_ERP;
    }

    const method = id ? MethodsEnum.PATCH : MethodsEnum.POST;

    try {
      const response = await request<IIntegrationProductSupplier>(
        url,
        method,
        integrationProductSupplierErp,
      );
      if (response) {
        return response;
      }
    } catch (error) {
      throw new Error(`Erro ao salvar o código do produto: ${error}`);
    }
  };

  return {
    getIntegrationProductSupplierErpById,
    getIntegrationProductSupplierErp,
    getIntegrationProductSupplierErpPaginated,
    saveIntegrationProductSupplierErp,
  };
};

export default useIntegrationProductSupplierErpRequests;
