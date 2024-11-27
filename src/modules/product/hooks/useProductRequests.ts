import toast from 'react-hot-toast';

import { URL_PRODUCT_ID, URL_PRODUCTS } from '../../../shared/constants/urls';
import { MethodsEnum } from '../../../shared/enums/methods.enum';
import { useRequests } from '../../../shared/hooks/useRequests';
import { IPaginationResponse } from '../../../shared/interfaces/PaginationResponseInteface';
import { IProductInsert } from '../interfaces/ProductInsertInterface';
import { IProduct } from '../interfaces/ProductInterface';

const useProductRequests = () => {
  const { request } = useRequests();

  const getProducts = async () => {
    const response = await request<IProduct[]>(URL_PRODUCTS, MethodsEnum.GET);

    if (response) {
      return response;
    }
    return [];
  };

  const getProductsPaginated = async (
    page: number,
    take: number,
    search?: string,
  ): Promise<IPaginationResponse<IProduct[]>> => {
    try {
      const response = await request<IPaginationResponse<IProduct[]>>(
        `${URL_PRODUCTS}/pages?search=${search || ''}&page=${page}&take=${take}`,
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

  const getProductById = async (id: number) => {
    const response = await request<IProduct>(
      URL_PRODUCT_ID.replace('{productId}', id.toString()),
      MethodsEnum.GET,
    );
    if (response) {
      return response;
    }
    return {} as IProduct;
  };

  const saveProduct = async (product: IProductInsert, id?: string) => {
    const url = id ? URL_PRODUCT_ID.replace('{productId}', id) : URL_PRODUCTS;
    const method = id ? MethodsEnum.PATCH : MethodsEnum.POST;

    try {
      const response = await request<IProduct>(url, method, product);
      toast.success('Produto salvo com sucesso!');
      return response;
    } catch (error) {
      toast.error('Erro ao salvar o produto');
      throw new Error(`Erro ao salvar o produto: ${error}`);
    }
  };

  return { getProducts, getProductsPaginated, getProductById, saveProduct };
};

export default useProductRequests;
