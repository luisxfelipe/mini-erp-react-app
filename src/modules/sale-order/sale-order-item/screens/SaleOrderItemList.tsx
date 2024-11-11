import { ColumnsType } from 'antd/es/table';
import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

import Button from '../../../../components/button/Button';
import Modal from '../../../../components/modal/Modal';
import Table from '../../../../components/table/Table';
import useSaleOrderItemRequests from '../hooks/useSaleOrderItemRequests';
import { ISaleOrderItem } from '../interfaces/SaleOrderItemInterface';
import { SaleOrderItemDetails } from './SaleOrderItemDetails';

export const SaleOrderItemList = () => {
  const { saleOrderId } = useParams();
  const [saleOrderItems, setSaleOrderItems] = useState<ISaleOrderItem[]>([]);
  const [saleOrderItemId, setSaleOrderItemId] = useState<number>();
  const { getSaleOrderItems } = useSaleOrderItemRequests();

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (saleOrderId) {
      loadSaleOrderItems();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCancel = () => {
    setSaleOrderItemId(undefined);
    setIsModalOpen(false);
  };

  const handleEditSaleOrderItem = (saleOrderItem: ISaleOrderItem) => {
    if (saleOrderItem) {
      setSaleOrderItemId(saleOrderItem.id);
    }
    setIsModalOpen(true);
  };

  const loadSaleOrderItems = async () => {
    if (saleOrderId) {
      const response = await getSaleOrderItems(parseInt(saleOrderId));
      if (response) {
        setSaleOrderItems(response);
      }
    }
  };

  const columns: ColumnsType<ISaleOrderItem> = useMemo(
    () => [
      {
        title: 'Id',
        dataIndex: 'id',
        key: 'id',
        render: (text) => <a>{text}</a>,
      },
      {
        title: 'Produto',
        dataIndex: 'product',
        key: 'product',
        render: (product) => <a>{product.name}</a>,
        sorter: (a, b) => a.product?.name.localeCompare(b.product?.name ?? ''),
        sortDirections: ['descend', 'ascend'],
      },
      {
        title: 'Variação',
        dataIndex: 'productVariation',
        key: 'productVariation',
        render: (productVariation) => <a>{productVariation.name}</a>,
        sorter: (a, b) =>
          a.productVariation?.name.localeCompare(
            b.productVariation?.name ?? '',
          ),
      },
      {
        title: 'Ações',
        dataIndex: '',
        width: 240,
        key: 'x',
        render: (_, saleOrderItem) => (
          <div style={{ width: '180px', display: 'flex' }}>
            <Button
              margin='0px 16px 0px 0px'
              onClick={() => handleEditSaleOrderItem(saleOrderItem)}
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
      <Table columns={columns} dataSource={saleOrderItems} rowKey='id' />
      <Modal
        isModalOpen={isModalOpen}
        title='Produto'
        onClose={() => setIsModalOpen(false)}
        onCancel={handleCancel}
      >
        <SaleOrderItemDetails
          onCancel={handleCancel}
          saleOrderItemId={saleOrderItemId}
          onSave={loadSaleOrderItems}
        />
      </Modal>
    </div>
  );
};
