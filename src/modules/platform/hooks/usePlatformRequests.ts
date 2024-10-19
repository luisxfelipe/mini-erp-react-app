import { URL_PLATFORMS } from '../../../shared/constants/urls';
import { MethodsEnum } from '../../../shared/enums/methods.enum';
import { useRequests } from '../../../shared/hooks/useRequests';
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

  return { getPlatforms };
};

export default usePlatformRequests;
