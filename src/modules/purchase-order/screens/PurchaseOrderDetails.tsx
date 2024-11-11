import { Divider } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { z } from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';

import { Input } from '../../../components/input/Input';
import Select from '../../../components/select/Select';
import { IPurchaseOrder } from '../../../shared/interfaces/PurchaseOrderInterface';
import useSupplierRequests from '../../supplier/hooks/useSupplierRequets';
import { ISupplier } from '../../supplier/interfaces/SupplierInterface';
import usePurchaseOrderRequests from '../hooks/usePurchaseOrderRequests';
import { PurchaseOrderItemList } from '../purchase-order-item/screens/PurchaseOrderItemList';
import usePurchaseOrderStatusRequests from '../purchase-order-status/hooks/usePurchaseOrderStatusRequests';
import {
    IPurchaseOrderStatus
} from '../purchase-order-status/interfaces/PurchaseOrderStatusInterface';
import { PurchaseOrderRoutesEnum } from '../purchase-orders.routes';

const schema = z.object({
  // verifica se a data é do tipo string, se tem 10 caracteres, se o formato é dd/mm/yyyy e se a data é menor ou igual a data atual
  date: z
    .string()
    .min(10, 'O campo data é obrigatório')
    .max(10, 'Data inválida')
    // verifica se a data é menor ou igual a data atual
    .refine((value) => new Date(value) <= new Date(), {
      message: 'A data deve ser menor ou igual a data atual',
    }),
  supplierId: z.string().min(1, 'O campo fornecedor é obrigatório'),
  orderNumber: z.string(),
  trackingCode: z.string(),
  purchaseOrderStatusId: z
    .string()
    .min(1, 'O campo status do pedido é obrigatório'),
  discount: z.preprocess(
    (value) => Number(value),
    z.number().refine((value) => value >= 0, {
      message: 'O campo desconto deve ser maior ou igual a zero',
    }),
  ),
  shippingCost: z.preprocess(
    (value) => Number(value),
    z.number().refine((value) => value >= 0, {
      message: 'O campo custo de envio deve ser maior ou igual a zero',
    }),
  ),
});

type FormData = z.infer<typeof schema>;

export const PurchaseOrderDetails = () => {
  const { purchaseOrderId } = useParams();
  const [purchaseOrder, setPurchaseOrder] = useState<IPurchaseOrder>();
  const { getPurchaseOrderById, savePurchaseOrder } =
    usePurchaseOrderRequests();

  const [suppliers, setSuppliers] = useState<ISupplier[]>([]);
  const { getSuppliers } = useSupplierRequests();

  const [purchaseOrderStatus, setPurchaseOrderStatus] = useState<
    IPurchaseOrderStatus[]
  >([]);
  const { getPurchaseOrderStatus } = usePurchaseOrderStatusRequests();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  });

  const memoizedGetSuppliers = useCallback(getSuppliers, []);
  const memoizedGetPurchaseOrderById = useCallback(getPurchaseOrderById, []);
  const memoizedGetPurchaseOrderStatus = useCallback(
    getPurchaseOrderStatus,
    [],
  );

  useEffect(() => {
    const fetchData = async () => {
      const suppliersData = await memoizedGetSuppliers();
      setSuppliers(suppliersData);
      const purchaseOrderStatusData = await memoizedGetPurchaseOrderStatus();
      setPurchaseOrderStatus(purchaseOrderStatusData);
      if (purchaseOrderId) {
        const purchaseOrderData = await memoizedGetPurchaseOrderById(
          parseInt(purchaseOrderId),
        );
        setPurchaseOrder(purchaseOrderData);
        if (purchaseOrderData?.date) {
          setValue('date', purchaseOrderData.date.toString());
        }
        if (purchaseOrderData?.supplier) {
          setValue('supplierId', purchaseOrderData?.supplier?.id?.toString());
        }
        if (purchaseOrderData?.orderNumber) {
          setValue('orderNumber', purchaseOrderData.orderNumber);
        }
        if (purchaseOrderData?.trackingCode) {
          setValue('trackingCode', purchaseOrderData.trackingCode);
        }
        if (purchaseOrderData?.purchaseOrderStatus) {
          setValue(
            'purchaseOrderStatusId',
            purchaseOrderData?.purchaseOrderStatus?.id?.toString(),
          );
        }
        if (purchaseOrderData?.discount) {
          setValue('discount', purchaseOrderData.discount);
        }
        if (purchaseOrderData?.shippingCost) {
          setValue('shippingCost', purchaseOrderData.shippingCost);
        }
        if (purchaseOrderData?.purchaseOrderStatus) {
          setValue(
            'purchaseOrderStatusId',
            purchaseOrderData?.purchaseOrderStatus?.id?.toString(),
          );
        }
      }
    };
    fetchData();
  }, [
    memoizedGetPurchaseOrderById,
    memoizedGetSuppliers,
    memoizedGetPurchaseOrderStatus,
    purchaseOrderId,
    setValue,
  ]);

  // aplica mascara ao campo date e

  function onSubmit(data: FormData) {
    const dateFormatted = data.date.split('/').reverse().join('-');
    savePurchaseOrder(
      {
        date: dateFormatted,
        supplierId: parseInt(data.supplierId),
        orderNumber: data.orderNumber || undefined,
        trackingCode: data.trackingCode || undefined,
        purchaseOrderStatusId: parseInt(data.purchaseOrderStatusId),
        discount: data.discount || undefined,
        shippingCost: data.shippingCost || undefined,
      },
      purchaseOrderId ? purchaseOrderId.toString() : undefined,
    )
      .then((purchaseOrder: IPurchaseOrder | undefined | Error) => {
        if (purchaseOrder && purchaseOrderId === undefined) {
          navigate(
            PurchaseOrderRoutesEnum.PURCHASE_ORDER_EDIT.replace(
              ':purchaseOrderId',
              (purchaseOrder as IPurchaseOrder).id.toString(),
            ),
          );
        }
        toast.success('Pedido salvo com sucesso!');
      })
      .catch((error) => {
        toast.error('Erro ao salvar o pedido.');
        throw error;
      });
  }

  return (
    <div>
      <div className='w-full bg-white p-3 rounded-lg flex flex-col sm:flex-row items-center gap-2 mt-2'>
        <form className='w-full' onSubmit={handleSubmit(onSubmit)}>
          <div className='w-full mb-4'>
            <Select
              className='w-full border-2 rounded-md mb-4 px-2'
              title='Fornecedor'
              name='supplierId'
              options={suppliers.map((supplier) => ({
                value: supplier.id ? supplier.id.toString() : '',
                label: supplier.tradeName,
              }))}
              register={register}
            />
            {errors.supplierId && (
              <p className='my-1 text-red-500'>{errors.supplierId.message}</p>
            )}
          </div>

          <div className='w-full mb-4'>
            <Input
              className='w-full border-2 rounded-md px-2'
              title='Data do pedido'
              type='date'
              max={10}
              min={10}
              error={errors.date?.message}
              {...register('date')}
            />
          </div>

          <div className='w-full mb-4'>
            <Input
              className='w-full border-2 rounded-md px-2'
              title='Número do pedido'
              type='text'
              placeholder='Digite o número do pedido...'
              {...register('orderNumber')}
            />
            {errors.orderNumber && (
              <p className='my-1 text-red-500'>{errors.orderNumber.message}</p>
            )}
          </div>
          <div className='w-full mb-4'>
            <Input
              className='w-full border-2 rounded-md px-2'
              title='Código de rastreio'
              type='text'
              placeholder='Digite o código de rastreio...'
              {...register('trackingCode')}
            />
            {errors.trackingCode && (
              <p className='my-1 text-red-500'>{errors.trackingCode.message}</p>
            )}
          </div>
          <div className='w-full mb-4'>
            <Input
              className='w-full border-2 rounded-md px-2'
              title='Desconto'
              type='number'
              placeholder='Digite o desconto...'
              {...register('discount')}
            />
            {errors.discount && (
              <p className='my-1 text-red-500'>{errors.discount.message}</p>
            )}
          </div>
          <div className='w-full mb-4'>
            <Input
              className='w-full border-2 rounded-md px-2'
              title='Custo de envio'
              type='number'
              placeholder='Digite o custo de envio...'
              {...register('shippingCost')}
            />
            {errors.shippingCost && (
              <p className='my-1 text-red-500'>{errors.shippingCost.message}</p>
            )}
          </div>
          <div className='w-full mb-4'>
            <Select
              className='w-full border-2 rounded-md mb-4 px-2'
              title='Status'
              name='purchaseOrderStatusId'
              options={purchaseOrderStatus.map((status) => ({
                value: status.id ? status.id.toString() : '',
                label: status.name,
              }))}
              register={register}
            />
            {errors.purchaseOrderStatusId && (
              <p className='my-1 text-red-500'>
                {errors.purchaseOrderStatusId.message}
              </p>
            )}
          </div>
          <div className='w-96 flex flex-row float-end'>
            <button
              className='w-full ml-2 rounded-md border-2 border-solid '
              type='button'
              style={{ color: '#001529' }}
              color='white'
              onClick={() => navigate(PurchaseOrderRoutesEnum.PURCHASE_ORDERS)}
            >
              Cancelar
            </button>
            <button
              className='w-full ml-2 rounded-md text-white'
              type='submit'
              style={{ backgroundColor: '#001529' }}
              color='white'
            >
              {purchaseOrderId ? 'Editar' : 'Inserir'}
            </button>
          </div>
        </form>
      </div>
      {purchaseOrderId && (
        <div>
          <Divider />
          <PurchaseOrderItemList />
        </div>
      )}
    </div>
  );
};
