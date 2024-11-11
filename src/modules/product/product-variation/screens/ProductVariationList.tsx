import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/es/table';
import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import Button from '../../../../components/button/Button';
import Modal from '../../../../components/modal/Modal';
import Table from '../../../../components/table/Table';
import useProductVariationRequests from '../hooks/useProductVariationRequests';
import { IProductVariation } from '../interfaces/ProductVariationInterface';

import { ProductVariationDetails } from './ProductVariationDetails';

export const ProductVariationList = () => {
  const { productId } = useParams();
  const [productVariations, setProductVariations] = useState<
    IProductVariation[]
  >([]);
  const [productVariationId, setProductVariationId] = useState<number>();
  const { getProductVariations } = useProductVariationRequests();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (productId) {
      loadProductVariations();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCancel = () => {
    setProductVariationId(undefined);
    setIsModalOpen(false);
  };

  const handleEditProductVariation = (productVariation: IProductVariation) => {
    if (productVariation) {
      setProductVariationId(productVariation.id);
    }
    setIsModalOpen(true);
  };

  const loadProductVariations = async () => {
    if (productId) {
      const response = await getProductVariations(parseInt(productId));
      if (response) {
        setProductVariations(response);
      }
    }
  };

  const columns: ColumnsType<IProductVariation> = useMemo(
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
        render: (_, productVariation) => (
          <div style={{ width: '180px', display: 'flex' }}>
            <Button
              margin='0px 16px 0px 0px'
              onClick={() => handleEditProductVariation(productVariation)}
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
      <Table columns={columns} dataSource={productVariations} rowKey='id' />
      <Modal
        isModalOpen={isModalOpen}
        title='Variação do produto'
        onClose={() => setIsModalOpen(false)}
        onCancel={handleCancel}
      >
        <ProductVariationDetails
          onCancel={handleCancel}
          productVariationId={productVariationId}
          onSave={loadProductVariations}
        />
      </Modal>
    </div>
  );
};
