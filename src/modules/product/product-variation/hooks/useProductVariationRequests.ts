import {
  URL_PRODUCT_VARIATION_ID,
  URL_PRODUCT_VARIATIONS,
} from '../../../../shared/constants/urls';
import { MethodsEnum } from '../../../../shared/enums/methods.enum';
import { useRequests } from '../../../../shared/hooks/useRequests';
import { IProductVariationInsert } from '../../../../shared/interfaces/ProductVariationInsertInterface';
import { IProductVariation } from '../../../../shared/interfaces/ProductVariationInterface';

const useProductVariationRequests = () => {
  const { request } = useRequests();

  const getProductVariations = async (productId: number) => {
    const response = await request<IProductVariation[]>(
      URL_PRODUCT_VARIATIONS.replace('{productId}', productId.toString()),
      MethodsEnum.GET,
    );
    if (response) {
      return response;
    }
    return [];
  };

  const getProductVariationById = async (
    productId: number,
    productVariationId: number,
  ) => {
    const response = await request<IProductVariation>(
      URL_PRODUCT_VARIATION_ID.replace(
        '{productId}',
        productId.toString(),
      ).replace('{productVariationId}', productVariationId.toString()),
      MethodsEnum.GET,
    );
    if (response) {
      return response;
    }
    return {} as IProductVariation;
  };

  const saveProductVariation = async (
    productVariation: IProductVariationInsert,
    productId: string,
    id?: string,
  ) => {
    let url = '';

    if (id) {
      url = URL_PRODUCT_VARIATION_ID.replace('{productVariationId}', id);
    } else {
      url = URL_PRODUCT_VARIATIONS.replace('{productId}', productId);
    }

    const method = id ? MethodsEnum.PATCH : MethodsEnum.POST;
    console.log(`url: ${url}`);
    console.log(`method: ${method}`);
    console.log(`productVariation: ${JSON.stringify(productVariation)}`);

    try {
      const response = await request<IProductVariation>(
        url,
        method,
        productVariation,
      );
      console.log(`response: ${response}`);
      return response;
    } catch (error) {
      throw new Error(`Erro ao salvar a variável: ${error}`);
    }
  };

  return {
    getProductVariations,
    getProductVariationById,
    saveProductVariation,
  };
};

export default useProductVariationRequests;
