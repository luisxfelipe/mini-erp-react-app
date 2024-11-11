import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/es/table';
import { useEffect, useMemo, useState } from 'react';

import Button from '../../../components/button/Button';
import Modal from '../../../components/modal/Modal';
import Table from '../../../components/table/Table';
import useSupplierRequests from '../hooks/useSupplierRequets';
import { ISupplier } from '../interfaces/SupplierInterface';

import { SupplierDetails } from './SupplierDetails';

export const SupplierList = () => {
  const [suppliers, setSuppliers] = useState<ISupplier[]>([]);
  const [supplierId, setSupplierId] = useState<number>();

  const { getSuppliers } = useSupplierRequests();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns: ColumnsType<ISupplier> = useMemo(
    () => [
      {
        title: 'Id',
        dataIndex: 'id',
        key: 'id',
        render: (text) => <a>{text}</a>,
      },
      {
        title: 'Nome',
        dataIndex: 'tradeName',
        key: 'tradeName',
        sorter: (a, b) => a.tradeName.localeCompare(b.tradeName),
        render: (text) => <a>{text}</a>,
      },
      {
        title: 'Ações',
        dataIndex: '',
        width: 240,
        key: 'x',
        render: (_, supplier) => (
          <div style={{ width: '180px', display: 'flex' }}>
            <Button
              margin='0px 16px 0px 0px'
              onClick={() => handleEditSupplier(supplier)}
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

  useEffect(() => {
    loadSuppliers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCancel = () => {
    setIsModalOpen(false);
    setSupplierId(undefined);
  };

  const handleEditSupplier = (supplier: ISupplier) => {
    if (supplier) {
      setSupplierId(supplier.id);
    }
    setIsModalOpen(true);
  };

  const loadSuppliers = async () => {
    const response = await getSuppliers();
    if (response) {
      setSuppliers(response);
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
      <Table columns={columns} dataSource={suppliers} rowKey='id' />
      <Modal
        isModalOpen={isModalOpen}
        title='Categoria'
        onClose={() => setIsModalOpen(false)}
        onCancel={handleCancel}
      >
        <SupplierDetails
          onCancel={handleCancel}
          supplierId={supplierId}
          onSave={loadSuppliers}
        />
      </Modal>
    </div>
  );
};
