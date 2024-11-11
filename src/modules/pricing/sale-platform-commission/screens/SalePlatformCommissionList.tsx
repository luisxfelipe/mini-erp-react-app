import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/es/table';
import { useEffect, useMemo, useState } from 'react';

import Button from '../../../../components/button/Button';
import Modal from '../../../../components/modal/Modal';
import Table from '../../../../components/table/Table';
import useSalePlatformCommissionRequests from '../hooks/useSalePlatformCommissionRequests';
import { ISalePlatformCommission } from '../interfaces/SalePlatformCommissionInterface';

import { SalePlatformCommissionDetails } from './SalePlatformCommissionDetails';

export const SalePlatformCommissionList = () => {
  const { getSalePlatformCommissions } = useSalePlatformCommissionRequests();
  const [salePlatformCommissions, setSalePlatformCommissions] = useState<
    ISalePlatformCommission[]
  >([]);
  const [salePlatformCommissionId, setSalePlatformCommissionId] =
    useState<number>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    loadSalePlatformCommissions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns: ColumnsType<ISalePlatformCommission> = useMemo(
    () => [
      {
        title: 'Id',
        dataIndex: 'id',
        key: 'id',
        render: (text) => <a>{text}</a>,
      },
      {
        title: 'Plataforma',
        dataIndex: 'salePlatform',
        key: 'salePlatform',
        render: (salePlatform) => <a>{salePlatform?.name}</a>,
        sorter: (a, b) =>
          a.salePlatform?.name.localeCompare(b.salePlatform?.name ?? ''),
        sortDirections: ['descend', 'ascend'],
      },
      {
        title: 'Ações',
        dataIndex: '',
        width: 240,
        key: 'x',
        render: (_, salePlatformCommission) => (
          <div style={{ width: '180px', display: 'flex' }}>
            <Button
              margin='0px 16px 0px 0px'
              onClick={() =>
                handleEditSalePlatformCommission(salePlatformCommission)
              }
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

  const handleEditSalePlatformCommission = (
    salePlatformCommission: ISalePlatformCommission,
  ) => {
    if (salePlatformCommission) {
      setSalePlatformCommissionId(salePlatformCommission.id);
    }
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSalePlatformCommissionId(undefined);
  };

  const loadSalePlatformCommissions = async () => {
    const response = await getSalePlatformCommissions();
    if (response) {
      setSalePlatformCommissions(response);
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
      <Table
        columns={columns}
        dataSource={salePlatformCommissions}
        rowKey='id'
      />
      <Modal
        isModalOpen={isModalOpen}
        title='Comissão da Plataforma de Venda'
        onClose={() => setIsModalOpen(false)}
        onCancel={handleCancel}
      >
        <SalePlatformCommissionDetails
          onCancel={handleCancel}
          salePlatformCommissionId={salePlatformCommissionId}
          onSave={loadSalePlatformCommissions}
        />
      </Modal>
    </div>
  );
};
