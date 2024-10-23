import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/es/table';
import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import Button from '../../../../components/button/Button';
import Modal from '../../../../components/modal/Modal';
import Table from '../../../../components/table/Table';
import { StockItemReview } from '../../../stock-item/screens/StockItemReview';
import usePurchaseOrderItemRequests from '../hooks/usePurchaseOrderItemRequests';
import { IPurchaseOrderItem } from '../interfaces/PurchaseOrderItemInterface';

import { PurchaseOrderItemDetails } from './PurchaseOrderItemDetails';

export const PurchaseOrderItemList = () => {
  const { purchaseOrderId } = useParams();
  const [purchaseOrderItems, setPurchaseOrderItems] = useState<
    IPurchaseOrderItem[]
  >([]);
  const [purchaseOrderItemId, setPurchaseOrderItemId] = useState<number>();
  const { getPurchaseOrderItems } = usePurchaseOrderItemRequests();

  const [isModalPurchaseOrderItemOpen, setIsModalPurchaseOrderItemOpen] =
    useState(false);

  const [isModalStockItemOpen, setIsModalStockItemOpen] = useState(false);

  useEffect(() => {
    if (purchaseOrderId) {
      loadPurchaseOrderItems();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleModalPurchaseOrderItemCancel = () => {
    setPurchaseOrderItemId(undefined);
    setIsModalPurchaseOrderItemOpen(false);
  };

  const handleModalStockItemCancel = () => {
    setIsModalStockItemOpen(false);
  };

  const handleEditPurchaseOrderItem = (
    purchaseOrderItem: IPurchaseOrderItem,
  ) => {
    if (purchaseOrderItem) {
      setPurchaseOrderItemId(purchaseOrderItem.id);
    }
    setIsModalPurchaseOrderItemOpen(true);
  };

  const loadPurchaseOrderItems = async () => {
    if (purchaseOrderId) {
      const response = await getPurchaseOrderItems(parseInt(purchaseOrderId));
      if (response) {
        setPurchaseOrderItems(response);
      }
    }
  };

  const columns: ColumnsType<IPurchaseOrderItem> = useMemo(
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
        title: 'Preço',
        dataIndex: 'price',
        key: 'price',
        render: (price) => <a>{price}</a>,
      },
      {
        title: 'Status',
        dataIndex: 'purchaseOrderItemStatus',
        key: 'purchaseOrderItemStatus',
        render: (purchaseOrderItemStatus) => (
          <a>{purchaseOrderItemStatus.name}</a>
        ),
      },
      {
        title: 'Ações',
        dataIndex: '',
        width: 240,
        key: 'x',
        render: (_, purchaseOrderItem) => (
          <div style={{ width: '180px', display: 'flex' }}>
            <Button
              margin='0px 16px 0px 0px'
              onClick={() => handleEditPurchaseOrderItem(purchaseOrderItem)}
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
      <div className='flex'>
        <div style={{ width: '240' }}>
          <Button
            className='mb-2'
            title='Inserir'
            backgroundColor='#001529'
            color='white'
            onClick={() => setIsModalPurchaseOrderItemOpen(true)}
          />
        </div>
        <div style={{ width: '240' }} className='ml-auto'>
          <Button
            className='mb-2'
            title='Lançar itens no estoque'
            backgroundColor='#001529'
            color='white'
            onClick={() => setIsModalStockItemOpen(true)}
          />
        </div>
      </div>
      <Table columns={columns} dataSource={purchaseOrderItems} rowKey='id' />
      <Modal
        isModalOpen={isModalPurchaseOrderItemOpen}
        title='Produto'
        onClose={() => setIsModalPurchaseOrderItemOpen(false)}
        onCancel={handleModalPurchaseOrderItemCancel}
      >
        <PurchaseOrderItemDetails
          onCancel={handleModalPurchaseOrderItemCancel}
          purchaseOrderItemId={purchaseOrderItemId}
          onSave={loadPurchaseOrderItems}
        />
      </Modal>
      <Modal
        isModalOpen={isModalStockItemOpen}
        title='Revisão de itens'
        onClose={() => setIsModalStockItemOpen(false)}
        onCancel={handleModalStockItemCancel}
      >
        <StockItemReview
          onCancel={handleModalStockItemCancel}
          purchaseOrderItems={purchaseOrderItems}
          onSave={loadPurchaseOrderItems}
        />
      </Modal>
    </div>
  );
};
