import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/es/table';
import { useEffect, useMemo, useState } from 'react';

import Button from '../../../../components/button/Button';
import Modal from '../../../../components/modal/Modal';
import Table from '../../../../components/table/Table';
import usePurchaseOrderStatusRequests from '../hooks/usePurchaseOrderStatusRequests';
import { IPurchaseOrderStatus } from '../interfaces/PurchaseOrderStatusInterface';

import { PurchaseOrderStatusDetails } from './PurchaseOrderStatusDetails';

export const PurchaseOrderStatusList = () => {
  const { getPurchaseOrderStatus } = usePurchaseOrderStatusRequests();

  const [purchaseOrderStatus, setPurchaseOrderStatus] = useState<
    IPurchaseOrderStatus[]
  >([]);
  const [purchaseOrderStatusId, setPurchaseOrderStatusId] = useState<number>();

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    loadPurchaseOrderStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns: ColumnsType<IPurchaseOrderStatus> = useMemo(
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
        render: (_, purchaseOrderStatus) => (
          <div style={{ width: '180px', display: 'flex' }}>
            <Button
              margin='0px 16px 0px 0px'
              onClick={() => handleEditPurchaseOrderStatus(purchaseOrderStatus)}
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

  const handleEditPurchaseOrderStatus = (
    purchaseOrderStatus: IPurchaseOrderStatus,
  ) => {
    if (purchaseOrderStatus) {
      setPurchaseOrderStatusId(purchaseOrderStatus.id);
    }
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setPurchaseOrderStatusId(undefined);
  };

  const loadPurchaseOrderStatus = async () => {
    const response = await getPurchaseOrderStatus();
    if (response) {
      setPurchaseOrderStatus(response);
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
      <Table columns={columns} dataSource={purchaseOrderStatus} rowKey='id' />
      <Modal
        isModalOpen={isModalOpen}
        title='Status de Compra'
        onClose={() => setIsModalOpen(false)}
        onCancel={handleCancel}
      >
        <PurchaseOrderStatusDetails
          onCancel={handleCancel}
          purchaseOrderStatusId={purchaseOrderStatusId}
          onSave={loadPurchaseOrderStatus}
        />
      </Modal>
    </div>
  );
};
