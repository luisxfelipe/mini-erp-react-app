import toast from 'react-hot-toast';

import {
  URL_CATEGORIES,
  URL_CATEGORY_ID,
} from '../../../shared/constants/urls';
import { MethodsEnum } from '../../../shared/enums/methods.enum';
import { useRequests } from '../../../shared/hooks/useRequests';
import { ICategoryInsert } from '../interfaces/CategoryInsertInterface';
import { ICategory } from '../interfaces/CategoryInterface';

const useCategoryRequests = () => {
  const { request } = useRequests();

  const getCategories = async () => {
    const response = await request<ICategory[]>(
      URL_CATEGORIES,
      MethodsEnum.GET,
    );

    if (response) {
      return response;
    }
    return [];
  };

  const getCategoryById = async (id: number) => {
    try {
      const response = await request<ICategory>(
        URL_CATEGORY_ID.replace('{categoryId}', id.toString()),
        MethodsEnum.GET,
      );
      return response;
    } catch (error) {
      toast.error('Erro ao buscar a categoria');
      throw new Error(`Erro ao buscar a categoria: ${error}`);
    }
  };

  const saveCategory = async (category: ICategoryInsert, id?: string) => {
    const url = id
      ? URL_CATEGORY_ID.replace('{categoryId}', id)
      : URL_CATEGORIES;
    const method = id ? MethodsEnum.PATCH : MethodsEnum.POST;

    try {
      const response = await request<ICategory>(url, method, category);
      return response;
    } catch (error) {
      throw new Error(`Erro ao salvar a categoria: ${error}`);
    }
  };

  return { getCategories, getCategoryById, saveCategory };
};

export default useCategoryRequests;
