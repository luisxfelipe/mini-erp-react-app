import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/es/table';
import { format, parseISO } from 'date-fns';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../../../components/button/Button';
import Table from '../../../components/table/Table';
import usePurchaseOrderRequests from '../hooks/usePurchaseOrderRequests';
import { IPurchaseOrder } from '../interfaces/PurchaseOrderInterface';
import { PurchaseOrderRoutesEnum } from '../purchase-orders.routes';

export const PurchaseOrderList = () => {
  const [purchaseOrders, setPurchaseOrders] = useState<IPurchaseOrder[]>([]);

  const { getPurchaseOrders } = usePurchaseOrderRequests();

  const navigate = useNavigate();

  const columns: ColumnsType<IPurchaseOrder> = useMemo(
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
                  PurchaseOrderRoutesEnum.PURCHASE_ORDER_EDIT.replace(
                    ':purchaseOrderId',
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
    [navigate],
  );

  const loadPurchaseOrders = useCallback(async () => {
    const response = await getPurchaseOrders();
    if (response) {
      setPurchaseOrders(response);
    }
  }, [getPurchaseOrders, setPurchaseOrders]);

  useEffect(() => {
    loadPurchaseOrders();
  }, [loadPurchaseOrders]);

  return (
    <div>
      <div className='flex justify-between'>
        <div style={{ width: '240' }}>
          <Button
            className='mb-2'
            title='Inserir'
            backgroundColor='#001529'
            color='white'
            onClick={() =>
              navigate(PurchaseOrderRoutesEnum.PURCHASE_ORDER_INSERT)
            }
          />
        </div>
      </div>
      <Table columns={columns} dataSource={purchaseOrders} rowKey='id' />
    </div>
  );
};
