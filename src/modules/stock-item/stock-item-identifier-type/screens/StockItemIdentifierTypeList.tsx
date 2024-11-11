import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/es/table';
import { useEffect, useMemo, useState } from 'react';

import Button from '../../../../components/button/Button';
import Modal from '../../../../components/modal/Modal';
import Table from '../../../../components/table/Table';
import useStockItemIdentifierTypeRequests from '../hooks/useStockItemIdentifierTypeRequests';
import { IStockItemIdentifierType } from '../interfaces/StockItemIdentifierTypeInterface';

import { StockItemIdentifierTypeDetails } from './StockItemIdentifierTypeDetails';

export const StockItemIdentifierTypeList = () => {
  const { getStockItemIdentifierTypes } = useStockItemIdentifierTypeRequests();

  const [stockItemIdentifierType, setStockItemIdentifierType] = useState<
    IStockItemIdentifierType[]
  >([]);
  const [stockItemIdentifierTypeId, setStockItemIdentifierTypeId] =
    useState<number>();

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    loadStockItemIdentifierType();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns: ColumnsType<IStockItemIdentifierType> = useMemo(
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
        render: (_, stockItemIdentifierType) => (
          <div style={{ width: '180px', display: 'flex' }}>
            <Button
              margin='0px 16px 0px 0px'
              onClick={() =>
                handleEditStockItemIdentifierType(stockItemIdentifierType)
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

  const handleEditStockItemIdentifierType = (
    stockItemIdentifierType: IStockItemIdentifierType,
  ) => {
    if (stockItemIdentifierType) {
      setStockItemIdentifierTypeId(stockItemIdentifierType.id);
    }
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setStockItemIdentifierTypeId(undefined);
  };

  const loadStockItemIdentifierType = async () => {
    const response = await getStockItemIdentifierTypes();
    if (response) {
      setStockItemIdentifierType(response);
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
        dataSource={stockItemIdentifierType}
        rowKey='id'
      />
      <Modal
        isModalOpen={isModalOpen}
        title='Status de Compra'
        onClose={() => setIsModalOpen(false)}
        onCancel={handleCancel}
      >
        <StockItemIdentifierTypeDetails
          onCancel={handleCancel}
          stockItemIdentifierTypeId={stockItemIdentifierTypeId}
          onSave={loadStockItemIdentifierType}
        />
      </Modal>
    </div>
  );
};
