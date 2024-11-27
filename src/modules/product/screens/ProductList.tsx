import { Input, PaginationProps } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

/* eslint-disable react-hooks/exhaustive-deps */
import Button from '../../../components/button/Button';
import Table from '../../../components/table/Table';
import CategoryColumn from '../components/CategoryColumn';
import useProductRequests from '../hooks/useProductRequests';
import { IProduct } from '../interfaces/ProductInterface';
import { ProductRoutesEnum } from '../product.routes';

const { Search } = Input;

export const ProductList = () => {
  const { getProductsPaginated } = useProductRequests();
  const [products, setProducts] = useState<IProduct[]>([]);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [current, setCurrent] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);

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

  const loadProducts = async () => {
    setLoading(true);

    try {
      const response = await getProductsPaginated(
        current,
        itemsPerPage,
        search,
      );

      if (response && response.data.length > 0) {
        setProducts(response.data);
        setTotalItems(response.meta.totalItems);
      } else {
        toast.error('Nenhum produto encontrado');
      }
    } catch (error) {
      console.log('catch error', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (products.length === 0) {
      loadProducts();
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, [current, itemsPerPage, search]);

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

  const pagination = {
    current: current,
    pageSize: itemsPerPage,
    total: totalItems,
    onChange: onChange,
    onShowSizeChange: onShowSizeChange,
  };

  return (
    <div>
      <div className='flex justify-between'>
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
            onClick={() => {
              navigate(ProductRoutesEnum.PRODUCT_INSERT);
            }}
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
      </div>
      <Table
        columns={columns}
        dataSource={products}
        rowKey='id'
        loading={loading}
        pagination={pagination}
      />
    </div>
  );
};
