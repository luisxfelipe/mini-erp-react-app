import { ColumnsType } from 'antd/es/table';
import { format, parseISO } from 'date-fns';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

import Button from '../../../components/button/Button';
import Table from '../../../components/table/Table';
import { ISaleOrder } from '../../../shared/interfaces/SaleOrderInterface';
import useSaleOrderRequests from '../hooks/useSaleOrderRequests';
import { SaleOrderRoutesEnum } from '../sale-orders.routes';

export const SaleOrderList = () => {
  const [saleOrders, setSaleOrders] = useState<ISaleOrder[]>([]);

  const { getSaleOrders } = useSaleOrderRequests();

  const navigate = useNavigate();

  const columns: ColumnsType<ISaleOrder> = useMemo(
    () => [
      {
        title: 'Id',
        dataIndex: 'id',
        key: 'id',
        render: (text) => <a>{text}</a>,
      },
      {
        title: 'Data do pedido',
        dataIndex: 'date',
        key: 'date',
        render: (date) => {
          const parsedDate = parseISO(date);
          const formattedDate = format(parsedDate, 'dd/MM/yyyy');
          return <span>{formattedDate}</span>;
        },
      },
      {
        title: 'Numero do pedido',
        dataIndex: 'number',
        key: 'number',
        sorter: (a, b) =>
          a.orderNumber?.localeCompare(b.orderNumber ?? '') ?? 0,
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
              onClick={() => {
                navigate(
                  SaleOrderRoutesEnum.SALE_ORDER_EDIT.replace(
                    ':saleOrderId',
                    supplier.id.toString(),
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

  useEffect(() => {
    loadSaleOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadSaleOrders = async () => {
    const response = await getSaleOrders();
    if (response) {
      setSaleOrders(response);
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
            onClick={() => navigate(SaleOrderRoutesEnum.SALE_ORDER_INSERT)}
          />
        </div>
      </div>
      <Table columns={columns} dataSource={saleOrders} rowKey='id' />
    </div>
  );
};
