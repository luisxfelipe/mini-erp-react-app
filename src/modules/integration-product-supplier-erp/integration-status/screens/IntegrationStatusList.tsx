import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/es/table';
import { useEffect, useMemo, useState } from 'react';

import Button from '../../../../components/button/Button';
import Modal from '../../../../components/modal/Modal';
import Table from '../../../../components/table/Table';
import useIntegrationStatusRequests from '../hooks/useIntegrationStatusRequests';
import { IIntegrationStatus } from '../interfaces/IntegrationStatusInterface';

import { IntegrationStatusDetails } from './IntegrationStatusDetails';

export const IntegrationStatusList = () => {
  const { getIntegrationStatus } = useIntegrationStatusRequests();

  const [integrationStatus, setIntegrationStatus] = useState<
    IIntegrationStatus[]
  >([]);
  const [integrationStatusId, setIntegrationStatusId] = useState<number>();

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    loadIntegrationStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns: ColumnsType<IIntegrationStatus> = useMemo(
    () => [
      {
        title: 'Id',
        dataIndex: 'id',
        key: 'id',
        render: (text) => <a>{text}</a>,
      },
      {
        title: 'Nome',
        dataIndex: 'name',
        key: 'name',
        sorter: (a, b) => a.name.localeCompare(b.name),
        render: (text) => <a>{text}</a>,
      },
      {
        title: 'Ações',
        dataIndex: '',
        width: 240,
        key: 'x',
        render: (_, integrationStatus) => (
          <div style={{ width: '180px', display: 'flex' }}>
            <Button
              margin='0px 16px 0px 0px'
              onClick={() => handleEditIntegrationStatus(integrationStatus)}
              icon={<EditOutlined />}
            >
              Editar
            </Button>
            <Button danger onClick={() => {}} icon={<DeleteOutlined />}>
              Deletar
            </Button>
          </div>
        ),
      },
    ],
    [],
  );

  const handleEditIntegrationStatus = (
    integrationStatus: IIntegrationStatus,
  ) => {
    if (integrationStatus) {
      setIntegrationStatusId(integrationStatus.id);
    }
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setIntegrationStatusId(undefined);
  };

  const loadIntegrationStatus = async () => {
    const response = await getIntegrationStatus();
    if (response) {
      setIntegrationStatus(response);
    }
  };

  return (
    <div>
      <div className='flex justify-between'>
        <div style={{ width: '240' }}>
          <Button
            className='mb-2'
            title='Inserir'
            backgroundColor='#001529'
            color='white'
            onClick={() => setIsModalOpen(true)}
          />
        </div>
      </div>
      <Table columns={columns} dataSource={integrationStatus} rowKey='id' />
      <Modal
        isModalOpen={isModalOpen}
        title='Status de Compra'
        onClose={() => setIsModalOpen(false)}
        onCancel={handleCancel}
      >
        <IntegrationStatusDetails
          onCancel={handleCancel}
          integrationStatusId={integrationStatusId}
          onSave={loadIntegrationStatus}
        />
      </Modal>
    </div>
  );
};
