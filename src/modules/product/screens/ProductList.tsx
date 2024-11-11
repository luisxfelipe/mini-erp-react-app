/* eslint-disable react-hooks/exhaustive-deps */
import { ColumnsType } from 'antd/es/table';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

import Button from '../../../components/button/Button';
import Table from '../../../components/table/Table';
import { IProduct } from '../../../shared/interfaces/ProductInterface';
import CategoryColumn from '../components/CategoryColumn';
import useProductRequests from '../hooks/useProductRequests';
import { ProductRoutesEnum } from '../product.routes';

export const ProductList = () => {
  const { getProducts } = useProductRequests();
  const [products, setProducts] = useState<IProduct[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadProducts = async () => {
      const response = await getProducts();
      if (response) {
        setProducts(response);
      }
    };

    loadProducts();
  }, []);

  const columns: ColumnsType<IProduct> = useMemo(
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
        title: 'Categoria',
        dataIndex: 'category',
        key: 'category',
        render: (_, product) => <CategoryColumn category={product.category} />,
      },
      {
        title: 'Ações',
        dataIndex: '',
        width: 240,
        key: 'x',
        render: (_, product) => (
          <div style={{ width: '180px', display: 'flex' }}>
            <Button
              margin='0px 16px 0px 0px'
              onClick={() => {
                navigate(
                  ProductRoutesEnum.PRODUCT_EDIT.replace(
                    ':productId',
                    `${product.id}`,
                  ),
                );
              }}
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
            onClick={() => {
              navigate(ProductRoutesEnum.PRODUCT_INSERT);
            }}
          />
        </div>
      </div>
      <Table columns={columns} dataSource={products} rowKey='id' />
    </div>
  );
};
