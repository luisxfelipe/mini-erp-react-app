import toast from 'react-hot-toast';

import {
    URL_PRODUCT_VARIATION_ID, URL_PRODUCT_VARIATIONS
} from '../../../../shared/constants/urls';
import { MethodsEnum } from '../../../../shared/enums/methods.enum';
import { useRequests } from '../../../../shared/hooks/useRequests';
import {
    IProductVariationInsert
} from '../../../../shared/interfaces/ProductVariationInsertInterface';
import { IProductVariation } from '../../../../shared/interfaces/ProductVariationInterface';

interface IProductVariationRequestProps {
  name: string;
}

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
    id?: string,
  ) => {
    let url = '';

    if (id) {
      url = URL_PRODUCT_VARIATION_ID.replace('{productVariationId}', id);
    } else {
      if (productVariation.productId) {
        url = URL_PRODUCT_VARIATIONS.replace(
          '{productId}',
          productVariation.productId.toString(),
        );
      } else {
        throw new Error('Erro ao salvar a variação de produto');
      }
    }

    if (productVariation.productId) {
      const method = id ? MethodsEnum.PATCH : MethodsEnum.POST;

      const body: IProductVariationRequestProps = {
        name: productVariation.name,
      };

      try {
        const response = await request<IProductVariation>(url, method, body);
        return response;
      } catch (error) {
        throw new Error(`Erro ao salvar a variável: ${error}`);
      }
    } else {
      toast.error('Erro ao salvar a variação de produto');
      throw new Error('Erro ao salvar a variação de produto');
    }
  };

  return {
    getProductVariations,
    getProductVariationById,
    saveProductVariation,
  };
};

export default useProductVariationRequests;
