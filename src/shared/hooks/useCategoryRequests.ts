import { URL_CATEGORIES, URL_CATEGORY_ID } from '../constants/urls';
import { MethodsEnum } from '../enums/methods.enum';
import { ICategory } from '../types/CategoryType';
import { useRequests } from './useRequests';

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
    const response = await request<ICategory>(
      URL_CATEGORY_ID.replace(':id', id.toString()),
      MethodsEnum.GET,
    );
    if (response) {
      return response;
    }
    return {} as ICategory;
  };

  // Outras funções de requisição para categorias...

  return { getCategories, getCategoryById };
};

export default useCategoryRequests;
