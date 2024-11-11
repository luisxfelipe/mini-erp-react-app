import { ColumnsType } from 'antd/es/table';
import { useEffect, useMemo, useState } from 'react';

import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

import Button from '../../../../../components/button/Button';
import Modal from '../../../../../components/modal/Modal';
import Table from '../../../../../components/table/Table';
import useSaleOrderItemStatusRequests from '../hooks/useSaleOrderItemStatusRequests';
import { ISaleOrderItemStatus } from '../interfaces/SaleOrderItemStatusInterface';
import { SaleOrderItemStatusDetails } from './SaleOrderItemStatusDetails';

export const SaleOrderItemStatusList = () => {
  const { getSaleOrderItemStatus } = useSaleOrderItemStatusRequests();

  const [saleOrderItemStatus, setSaleOrderItemStatus] = useState<
    ISaleOrderItemStatus[]
  >([]);
  const [saleOrderItemStatusId, setSaleOrderItemStatusId] = useState<number>();

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    loadSaleOrderItemStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns: ColumnsType<ISaleOrderItemStatus> = useMemo(
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
        render: (_, saleOrderItemStatus) => (
          <div style={{ width: '180px', display: 'flex' }}>
            <Button
              margin='0px 16px 0px 0px'
              onClick={() => handleEditSaleOrderItemStatus(saleOrderItemStatus)}
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

  const handleEditSaleOrderItemStatus = (
    saleOrderItemStatus: ISaleOrderItemStatus,
  ) => {
    if (saleOrderItemStatus) {
      setSaleOrderItemStatusId(saleOrderItemStatus.id);
    }
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSaleOrderItemStatusId(undefined);
  };

  const loadSaleOrderItemStatus = async () => {
    const response = await getSaleOrderItemStatus();
    if (response) {
      setSaleOrderItemStatus(response);
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
      <Table columns={columns} dataSource={saleOrderItemStatus} rowKey='id' />
      <Modal
        isModalOpen={isModalOpen}
        title='Status de Compra'
        onClose={() => setIsModalOpen(false)}
        onCancel={handleCancel}
      >
        <SaleOrderItemStatusDetails
          onCancel={handleCancel}
          saleOrderItemStatusId={saleOrderItemStatusId}
          onSave={loadSaleOrderItemStatus}
        />
      </Modal>
    </div>
  );
};
