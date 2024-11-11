import { ColumnsType } from 'antd/es/table';
import { useEffect, useMemo, useState } from 'react';

import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

import Button from '../../../components/button/Button';
import Modal from '../../../components/modal/Modal';
import Table from '../../../components/table/Table';
import usePlatformRequests from '../hooks/usePlatformRequests';
import { IPlatform } from '../interfaces/PlatformInterface';
import { PlatformDetails } from './PlatformDetails';

export const PlatformList = () => {
  const { getPlatforms } = usePlatformRequests();
  const [platforms, setPlatforms] = useState<IPlatform[]>([]);
  const [platformId, setPlatformId] = useState<number>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    loadPlatforms();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns: ColumnsType<IPlatform> = useMemo(
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
        render: (_, platform) => (
          <div style={{ width: '180px', display: 'flex' }}>
            <Button
              margin='0px 16px 0px 0px'
              onClick={() => handleEditPlatform(platform)}
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

  const handleEditPlatform = (platform: IPlatform) => {
    if (platform) {
      setPlatformId(platform.id);
    }
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setPlatformId(undefined);
  };

  const loadPlatforms = async () => {
    const response = await getPlatforms();
    if (response) {
      setPlatforms(response);
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
      <Table columns={columns} dataSource={platforms} rowKey='id' />
      <Modal
        isModalOpen={isModalOpen}
        title='Plataforma'
        onClose={() => setIsModalOpen(false)}
        onCancel={handleCancel}
      >
        <PlatformDetails
          onCancel={handleCancel}
          platformId={platformId?.toString()}
          onSave={loadPlatforms}
        />
      </Modal>
    </div>
  );
};
