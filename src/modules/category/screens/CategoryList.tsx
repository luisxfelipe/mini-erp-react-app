import { ColumnsType } from 'antd/es/table';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

import Button from '../../../components/button/Button';
import Table from '../../../components/table/Table';
import { ICategory } from '../../../shared/interfaces/CategoryInterface';
import { CategoryRoutesEnum } from '../category.routes';
import useCategoryRequests from '../hooks/useCategoryRequests';

export const CategoryList = () => {
  const { getCategories } = useCategoryRequests();
  const [categories, setCategories] = useState<ICategory[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadProducts = async () => {
      const response = await getCategories();
      if (response) {
        setCategories(response);
      }
    };

    loadProducts();
  }, []);

  const columns: ColumnsType<ICategory> = useMemo(
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
        render: (_, category) => (
          <div style={{ width: '180px', display: 'flex' }}>
            <Button
              margin='0px 16px 0px 0px'
              onClick={() => {
                navigate(
                  CategoryRoutesEnum.CATEGORY_EDIT.replace(
                    ':categoryId',
                    `${category.id}`,
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
              navigate(CategoryRoutesEnum.CATEGORY_INSERT);
            }}
          />
        </div>
      </div>
      <Table columns={columns} dataSource={categories} rowKey='id' />
    </div>
  );
};
