import { ColumnsType } from 'antd/es/table';
import { useEffect, useMemo, useState } from 'react';

import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

import Button from '../../../../../components/button/Button';
import Modal from '../../../../../components/modal/Modal';
import Table from '../../../../../components/table/Table';
import usePurchaseOrderItemStatusRequests from '../hooks/usePurchaseOrderItemStatusRequests';
import { IPurchaseOrderItemStatus } from '../interfaces/PurchaseOrderItemStatusInterface';
import { PurchaseOrderItemStatusDetails } from './PurchaseOrderItemStatusDetails';

export const PurchaseOrderItemStatusList = () => {
  const { getPurchaseOrderItemStatus } = usePurchaseOrderItemStatusRequests();

  const [purchaseOrderItemStatus, setPurchaseOrderItemStatus] = useState<
    IPurchaseOrderItemStatus[]
  >([]);
  const [purchaseOrderItemStatusId, setPurchaseOrderItemStatusId] =
    useState<number>();

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    loadPurchaseOrderItemStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns: ColumnsType<IPurchaseOrderItemStatus> = useMemo(
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
        render: (_, purchaseOrderItemStatus) => (
          <div style={{ width: '180px', display: 'flex' }}>
            <Button
              margin='0px 16px 0px 0px'
              onClick={() =>
                handleEditPurchaseOrderItemStatus(purchaseOrderItemStatus)
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

  const handleEditPurchaseOrderItemStatus = (
    purchaseOrderItemStatus: IPurchaseOrderItemStatus,
  ) => {
    if (purchaseOrderItemStatus) {
      setPurchaseOrderItemStatusId(purchaseOrderItemStatus.id);
    }
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setPurchaseOrderItemStatusId(undefined);
  };

  const loadPurchaseOrderItemStatus = async () => {
    const response = await getPurchaseOrderItemStatus();
    if (response) {
      setPurchaseOrderItemStatus(response);
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
        dataSource={purchaseOrderItemStatus}
        rowKey='id'
      />
      <Modal
        isModalOpen={isModalOpen}
        title='Status de Compra'
        onClose={() => setIsModalOpen(false)}
        onCancel={handleCancel}
      >
        <PurchaseOrderItemStatusDetails
          onCancel={handleCancel}
          purchaseOrderItemStatusId={purchaseOrderItemStatusId}
          onSave={loadPurchaseOrderItemStatus}
        />
      </Modal>
    </div>
  );
};
