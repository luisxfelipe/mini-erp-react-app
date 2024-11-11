import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/es/table';
import { useEffect, useMemo, useState } from 'react';

import Button from '../../../components/button/Button';
import Modal from '../../../components/modal/Modal';
import Table from '../../../components/table/Table';
import usePricingRequests from '../hooks/usePricingRequests';
import { IPricing } from '../interfaces/PricingInterface';

import { PricingDetails } from './PricingDetails';

export const PricingList = () => {
  const { getPricing } = usePricingRequests();
  const [pricing, setPricing] = useState<IPricing[]>([]);
  const [pricingId, setPricingId] = useState<number>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    loadPricing();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns: ColumnsType<IPricing> = useMemo(
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
        title: 'Plataforma',
        dataIndex: 'salePlatform',
        key: 'salePlatform',
        render: (salePlatform) => <a>{salePlatform?.name}</a>,
        sorter: (a, b) =>
          a.salePlatform?.name.localeCompare(b.salePlatform?.name ?? ''),
        sortDirections: ['descend', 'ascend'],
      },
      {
        title: 'Ações',
        dataIndex: '',
        width: 240,
        key: 'x',
        render: (_, pricing) => (
          <div style={{ width: '180px', display: 'flex' }}>
            <Button
              margin='0px 16px 0px 0px'
              onClick={() => handleEditPricing(pricing)}
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

  const handleEditPricing = (pricing: IPricing) => {
    if (pricing) {
      setPricingId(pricing.id);
    }
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setPricingId(undefined);
  };

  const loadPricing = async () => {
    const response = await getPricing();
    if (response) {
      setPricing(response);
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
      <Table columns={columns} dataSource={pricing} rowKey='id' />
      <Modal
        isModalOpen={isModalOpen}
        title='Precificação'
        onClose={() => setIsModalOpen(false)}
        onCancel={handleCancel}
      >
        <PricingDetails
          onCancel={handleCancel}
          pricingId={pricingId}
          onSave={loadPricing}
        />
      </Modal>
    </div>
  );
};
