import toast from 'react-hot-toast';

import { URL_SUPPLIER_ID, URL_SUPPLIERS } from '../../../shared/constants/urls';
import { MethodsEnum } from '../../../shared/enums/methods.enum';
import { useRequests } from '../../../shared/hooks/useRequests';
import { ISupplierInsert } from '../interfaces/SupplierInsertInterface';
import { ISupplier } from '../interfaces/SupplierInterface';

const useSupplierRequests = () => {
  const { request } = useRequests();

  const getSuppliers = async () => {
    const response = await request<ISupplier[]>(URL_SUPPLIERS, MethodsEnum.GET);
    if (response) {
      return response;
    }
    return [];
  };

  const getSupplierById = async (id: number) => {
    try {
      const response = await request<ISupplier>(
        URL_SUPPLIER_ID.replace('{supplierId}', id.toString()),
        MethodsEnum.GET,
      );
      return response;
    } catch (error) {
      toast.error('Erro ao buscar o fornecedor');
      throw new Error(`Erro ao buscar o fornecedor: ${error}`);
    }
  };

  const saveSupplier = async (supplier: ISupplierInsert, id?: string) => {
    const url = id
      ? URL_SUPPLIER_ID.replace('{supplierId}', id)
      : URL_SUPPLIERS;
    const method = id ? MethodsEnum.PATCH : MethodsEnum.POST;

    try {
      const response = await request<ISupplier>(url, method, supplier);
      return response;
    } catch (error) {
      throw new Error(`Erro ao salvar o fornecedor: ${error}`);
    }
  };

  return { getSuppliers, getSupplierById, saveSupplier };
};

export default useSupplierRequests;
