import { IntegrationStatusDetails } from './screens/IntegrationStatusDetails';
import { IntegrationStatusList } from './screens/IntegrationStatusList';

export enum IntegrationStatusRoutesEnum {
  INTEGRATION_STATUS = 'integration-status',
  INTEGRATION_STATUS_INSERT = '/integration-status/insert',
}

export const integrationStatusRoutes = [
  {
    path: IntegrationStatusRoutesEnum.INTEGRATION_STATUS,
    element: <IntegrationStatusList />,
  },
  {
    path: IntegrationStatusRoutesEnum.INTEGRATION_STATUS_INSERT,
    element: <IntegrationStatusDetails />,
  },
];
