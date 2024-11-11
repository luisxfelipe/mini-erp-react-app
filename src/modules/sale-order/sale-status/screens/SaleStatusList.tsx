import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/es/table';
import { useEffect, useMemo, useState } from 'react';

import Button from '../../../../components/button/Button';
import Modal from '../../../../components/modal/Modal';
import Table from '../../../../components/table/Table';
import useSaleStatusRequests from '../hooks/useSaleStatusRequests';
import { ISaleStatus } from '../interfaces/SaleStatusInterface';

import { SaleStatusDetails } from './SaleStatusDetails';

export const SaleStatusList = () => {
  const { getSaleStatus } = useSaleStatusRequests();

  const [saleStatus, setSaleStatus] = useState<ISaleStatus[]>([]);
  const [saleStatusId, setSaleStatusId] = useState<number>();

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    loadSaleStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns: ColumnsType<ISaleStatus> = useMemo(
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
        render: (_, saleStatus) => (
          <div style={{ width: '180px', display: 'flex' }}>
            <Button
              margin='0px 16px 0px 0px'
              onClick={() => handleEditSaleStatus(saleStatus)}
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

  const handleEditSaleStatus = (saleStatus: ISaleStatus) => {
    if (saleStatus) {
      setSaleStatusId(saleStatus.id);
    }
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSaleStatusId(undefined);
  };

  const loadSaleStatus = async () => {
    const response = await getSaleStatus();
    if (response) {
      setSaleStatus(response);
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
      <Table columns={columns} dataSource={saleStatus} rowKey='id' />
      <Modal
        isModalOpen={isModalOpen}
        title='Status de Venda'
        onClose={() => setIsModalOpen(false)}
        onCancel={handleCancel}
      >
        <SaleStatusDetails
          onCancel={handleCancel}
          saleStatusId={saleStatusId}
          onSave={loadSaleStatus}
        />
      </Modal>
    </div>
  );
};
