import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/es/table';
import { useEffect, useMemo, useState } from 'react';

import Button from '../../../components/button/Button';
import Modal from '../../../components/modal/Modal';
import Table from '../../../components/table/Table';
import useIntegrationProductSupplierErpRequests from '../hooks/useIntegrationProductSupplierErpRequests';
import { IIntegrationProductSupplier } from '../interfaces/IntegrationProductSupplierErpInterface';

import { IntegrationProductSupplierErpDetails } from './IntegrationProductSupplierErpDetails';

export const IntegrationProductSupplierErpList = () => {
  const [integrationProductSupplierErp, setIntegrationProductSupplierErp] =
    useState<IIntegrationProductSupplier[]>([]);
  const [integrationProductSupplierId, setIntegrationProductSupplierErpId] =
    useState<number>();

  const { getIntegrationProductSupplierErp } =
    useIntegrationProductSupplierErpRequests();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns: ColumnsType<IIntegrationProductSupplier> = useMemo(
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
        title: 'Fornecedor',
        dataIndex: 'supplier',
        key: 'supplier',
        render: (supplier) => <a>{supplier.tradeName}</a>,
        sorter: (a, b) =>
          a.supplier?.tradeName.localeCompare(b.supplier?.tradeName ?? ''),
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: (status) => <a>{status.name}</a>,
      },
      {
        title: 'Ações',
        dataIndex: '',
        width: 240,
        key: 'x',
        render: (_, integrationProductSupplierErp) => (
          <div style={{ width: '180px', display: 'flex' }}>
            <Button
              margin='0px 16px 0px 0px'
              onClick={() =>
                handleEditIntegrationProductSupplierErp(
                  integrationProductSupplierErp,
                )
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

  useEffect(() => {
    loadIntegrationProductSupplierErp();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCancel = () => {
    setIsModalOpen(false);
    setIntegrationProductSupplierErpId(undefined);
  };

  const handleEditIntegrationProductSupplierErp = (
    integrationProductSupplierErp: IIntegrationProductSupplier,
  ) => {
    if (integrationProductSupplierErp) {
      setIntegrationProductSupplierErpId(integrationProductSupplierErp.id);
    }
    setIsModalOpen(true);
  };

  const loadIntegrationProductSupplierErp = async () => {
    const response = await getIntegrationProductSupplierErp();
    if (response) {
      setIntegrationProductSupplierErp(response);
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
        dataSource={integrationProductSupplierErp}
        rowKey='id'
      />
      <Modal
        isModalOpen={isModalOpen}
        title='Código do Produto do Fornecedor'
        onClose={() => setIsModalOpen(false)}
        onCancel={handleCancel}
      >
        <IntegrationProductSupplierErpDetails
          onCancel={handleCancel}
          integrationProductSupplierErpId={integrationProductSupplierId}
          onSave={loadIntegrationProductSupplierErp}
        />
      </Modal>
    </div>
  );
};
