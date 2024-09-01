import { ColumnsType } from 'antd/es/table';
import { useEffect, useMemo, useState } from 'react';

import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

import Button from '../../../components/button/Button';
import Modal from '../../../components/modal/Modal';
import Table from '../../../components/table/Table';
import { ICategory } from '../../../shared/interfaces/CategoryInterface';
import useCategoryRequests from '../hooks/useCategoryRequests';
import { CategoryDetails } from './CategoryDetails';

export const CategoryList = () => {
  const { getCategories } = useCategoryRequests();
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [categoryId, setCategoryId] = useState<number>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
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
              onClick={() => handleEditCategory(category)}
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

  const handleEditCategory = (category: ICategory) => {
    if (category) {
      setCategoryId(category.id);
    }
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setCategoryId(undefined);
  };

  const loadProducts = async () => {
    const response = await getCategories();
    if (response) {
      setCategories(response);
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
      <Table columns={columns} dataSource={categories} rowKey='id' />
      <Modal
        isModalOpen={isModalOpen}
        title='Categoria'
        onClose={() => setIsModalOpen(false)}
        onCancel={handleCancel}
      >
        <CategoryDetails
          onCancel={handleCancel}
          categoryId={categoryId}
          onSave={loadProducts}
        />
      </Modal>
    </div>
  );
};
