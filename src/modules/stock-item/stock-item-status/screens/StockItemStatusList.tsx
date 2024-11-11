import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/es/table';
import { useEffect, useMemo, useState } from 'react';

import Button from '../../../../components/button/Button';
import Modal from '../../../../components/modal/Modal';
import Table from '../../../../components/table/Table';
import useStockItemStatusRequests from '../hooks/useStockItemStatusRequests';
import { IStockItemStatus } from '../interfaces/StockItemStatusInterface';

import { StockItemStatusDetails } from './StockItemStatusDetails';

export const StockItemStatusList = () => {
  const { getStockItemStatus } = useStockItemStatusRequests();

  const [stockItemStatus, setStockItemStatus] = useState<IStockItemStatus[]>(
    [],
  );
  const [stockItemStatusId, setStockItemStatusId] = useState<number>();

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    loadStockItemStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns: ColumnsType<IStockItemStatus> = useMemo(
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
        render: (_, stockItemStatus) => (
          <div style={{ width: '180px', display: 'flex' }}>
            <Button
              margin='0px 16px 0px 0px'
              onClick={() => handleEditStockItemStatus(stockItemStatus)}
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

  const handleEditStockItemStatus = (stockItemStatus: IStockItemStatus) => {
    if (stockItemStatus) {
      setStockItemStatusId(stockItemStatus.id);
    }
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setStockItemStatusId(undefined);
  };

  const loadStockItemStatus = async () => {
    const response = await getStockItemStatus();
    if (response) {
      setStockItemStatus(response);
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
      <Table columns={columns} dataSource={stockItemStatus} rowKey='id' />
      <Modal
        isModalOpen={isModalOpen}
        title='Status de Compra'
        onClose={() => setIsModalOpen(false)}
        onCancel={handleCancel}
      >
        <StockItemStatusDetails
          onCancel={handleCancel}
          stockItemStatusId={stockItemStatusId}
          onSave={loadStockItemStatus}
        />
      </Modal>
    </div>
  );
};
