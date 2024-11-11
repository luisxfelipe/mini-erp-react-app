import toast from 'react-hot-toast';

import { URL_PLATFORM_ID, URL_PLATFORMS } from '../../../shared/constants/urls';
import { MethodsEnum } from '../../../shared/enums/methods.enum';
import { useRequests } from '../../../shared/hooks/useRequests';
import { IPlatformInsert } from '../interfaces/PlatformInsertInterface';
import { IPlatform } from '../interfaces/PlatformInterface';

const usePlatformRequests = () => {
  const { request } = useRequests();

  const getPlatforms = async () => {
    const response = await request<IPlatform[]>(URL_PLATFORMS, MethodsEnum.GET);
    if (response) {
      return response;
    }
    return [];
  };

  const getPlatformById = async (id: number) => {
    try {
      const response = await request<IPlatform>(
        URL_PLATFORM_ID.replace('{platformId}', id.toString()),
        MethodsEnum.GET,
      );
      return response;
    } catch (error) {
      toast.error('Erro ao buscar a plataforma');
      throw new Error(`Erro ao buscar a plataforma: ${error}`);
    }
  };

  const savePlatform = async (platform: IPlatformInsert, id?: string) => {
    const url = id
      ? URL_PLATFORM_ID.replace('{platformId}', id)
      : URL_PLATFORMS;
    const method = id ? MethodsEnum.PATCH : MethodsEnum.POST;

    try {
      const response = await request<IPlatform>(url, method, platform);
      return response;
    } catch (error) {
      throw new Error(`Erro ao salvar a plataforma: ${error}`);
    }
  };

  return { getPlatforms, getPlatformById, savePlatform };
};

export default usePlatformRequests;
