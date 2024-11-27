import { PaginationProps } from 'antd';
import Search from 'antd/es/input/Search';
import { ColumnsType } from 'antd/es/table';
import { useEffect, useMemo, useState } from 'react';

import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

import Button from '../../../components/button/Button';
import Modal from '../../../components/modal/Modal';
import Table from '../../../components/table/Table';
import usePricingRequests from '../hooks/usePricingRequests';
import { IPricing } from '../interfaces/PricingInterface';
import { PricingDetails } from './PricingDetails';

export const PricingList = () => {
  const { getPricingPaginated } = usePricingRequests();
  const [pricing, setPricing] = useState<IPricing[]>([]);
  const [pricingId, setPricingId] = useState<number>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [current, setCurrent] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);

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

  const onChange: PaginationProps['onChange'] = (page) => {
    setCurrent(page);
  };

  const onShowSizeChange: PaginationProps['onShowSizeChange'] = (
    current,
    pageSize,
  ) => {
    setCurrent(current);
    setItemsPerPage(pageSize);
  };

  const handleSearch = (value: string) => {
    setSearch(value);
    setCurrent(1);
  };

  useEffect(() => {
    if (pricing.length === 0) {
      loadPricing();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    loadPricing();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current, itemsPerPage, search]);

  const loadPricing = async () => {
    setLoading(true);

    try {
      const response = await getPricingPaginated(current, itemsPerPage, search);

      if (response && response.data.length > 0) {
        setPricing(response.data);
        setTotalItems(response.meta.totalItems);
      }
    } catch (error) {
      console.log('catch error', error);
    } finally {
      setLoading(false);
    }
  };

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

  const pagination = {
    current: current,
    pageSize: itemsPerPage,
    total: totalItems,
    onChange: onChange,
    onShowSizeChange: onShowSizeChange,
    showSizeChanger: true,
  };

  return (
    <div>
      <div
        style={{
          width: '100%',
          marginBottom: '16px',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Button
          width='10vw'
          title='Inserir'
          backgroundColor='#001529'
          color='white'
          onClick={() => setIsModalOpen(true)}
        />
        <Search
          placeholder='input search text'
          enterButton='Search'
          size='middle'
          loading={loading}
          style={{ width: '65vw' }}
          onSearch={(value) => handleSearch(value)}
        />
      </div>
      <Table
        columns={columns}
        dataSource={pricing}
        rowKey='id'
        loading={loading}
        pagination={pagination}
      />
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
