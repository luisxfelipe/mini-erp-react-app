import { zodResolver } from '@hookform/resolvers/zod';
import { Divider } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { z } from 'zod';

import { Input } from '../../../components/input/Input';
import Select from '../../../components/select/Select';
import usePlatformRequests from '../../platform/hooks/usePlatformRequests';
import { IPlatform } from '../../platform/interfaces/PlatformInterface';
import useSaleOrderRequests from '../hooks/useSaleOrderRequests';
import { ISaleOrder } from '../interfaces/SaleOrderInterface';
import { SaleOrderItemList } from '../sale-order-item/screens/SaleOrderItemList';
import { SaleOrderRoutesEnum } from '../sale-orders.routes';
import useSaleStatusRequests from '../sale-status/hooks/useSaleStatusRequests';
import { ISaleStatus } from '../sale-status/interfaces/SaleStatusInterface';

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
  platformId: z.string().min(1, 'O campo plataforma é obrigatório'),
  orderNumber: z.string(),
  trackingCode: z.string(),
  statusId: z.string().min(1, 'O campo status da venda é obrigatório'),
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

export const SaleOrderDetails = () => {
  const { saleOrderId } = useParams();
  const [, setSaleOrder] = useState<ISaleOrder>();
  const { getSaleOrderById, saveSaleOrder } = useSaleOrderRequests();

  const [platforms, setPlatforms] = useState<IPlatform[]>([]);
  const { getPlatforms } = usePlatformRequests();

  const [saleStatus, setSaleStatus] = useState<ISaleStatus[]>([]);
  const { getSaleStatus } = useSaleStatusRequests();

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

  const memoizedGetPlatforms = useCallback(getPlatforms, [getPlatforms]);
  const memoizedGetSaleOrderById = useCallback(getSaleOrderById, [
    getSaleOrderById,
  ]);
  const memoizedGetSaleStatus = useCallback(getSaleStatus, [getSaleStatus]);

  useEffect(() => {
    const fetchData = async () => {
      const platformsData = await memoizedGetPlatforms();
      setPlatforms(platformsData);
      const saleStatusData = await memoizedGetSaleStatus();
      setSaleStatus(saleStatusData);
      if (saleOrderId) {
        const saleOrderData = await memoizedGetSaleOrderById(
          parseInt(saleOrderId),
        );
        setSaleOrder(saleOrderData);
        if (saleOrderData?.date) {
          setValue('date', saleOrderData.date.toString());
        }
        if (saleOrderData?.platform) {
          setValue('platformId', saleOrderData?.platform?.id?.toString());
        }
        if (saleOrderData?.orderNumber) {
          setValue('orderNumber', saleOrderData.orderNumber);
        }
        if (saleOrderData?.trackingCode) {
          setValue('trackingCode', saleOrderData.trackingCode);
        }
        if (saleOrderData?.status) {
          setValue('statusId', saleOrderData?.status?.id?.toString());
        }
        if (saleOrderData?.discount) {
          setValue('discount', saleOrderData.discount);
        }
        if (saleOrderData?.shippingCost) {
          setValue('shippingCost', saleOrderData.shippingCost);
        }
        if (saleOrderData?.status) {
          setValue('statusId', saleOrderData?.status?.id?.toString());
        }
      }
    };
    fetchData();
  }, [
    memoizedGetSaleOrderById,
    memoizedGetPlatforms,
    memoizedGetSaleStatus,
    saleOrderId,
    setValue,
  ]);

  // aplica mascara ao campo date e

  function onSubmit(data: FormData) {
    const dateFormatted = data.date.split('/').reverse().join('-');
    saveSaleOrder(
      {
        date: dateFormatted,
        platformId: parseInt(data.platformId),
        orderNumber: data.orderNumber || undefined,
        trackingCode: data.trackingCode || undefined,
        statusId: parseInt(data.statusId),
        discount: data.discount || undefined,
        shippingCost: data.shippingCost || undefined,
      },
      saleOrderId ? saleOrderId.toString() : undefined,
    )
      .then((saleOrder: ISaleOrder | undefined | Error) => {
        if (saleOrder && saleOrderId === undefined) {
          navigate(
            SaleOrderRoutesEnum.SALE_ORDER_EDIT.replace(
              ':saleOrderId',
              (saleOrder as ISaleOrder).id.toString(),
            ),
          );
        }
        toast.success('Venda salva com sucesso!');
      })
      .catch((error) => {
        toast.error('Erro ao salvar a venda.');
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
              title='Plataforma'
              name='platformId'
              options={platforms.map((platform) => ({
                value: platform.id ? platform.id.toString() : '',
                label: platform.name,
              }))}
              register={register}
            />
            {errors.platformId && (
              <p className='my-1 text-red-500'>{errors.platformId.message}</p>
            )}
          </div>

          <div className='w-full mb-4'>
            <Input
              className='w-full border-2 rounded-md px-2'
              title='Data da venda'
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
              name='statusId'
              options={saleStatus.map((status) => ({
                value: status.id ? status.id.toString() : '',
                label: status.name,
              }))}
              register={register}
            />
            {errors.statusId && (
              <p className='my-1 text-red-500'>{errors.statusId.message}</p>
            )}
          </div>
          <div className='w-96 flex flex-row float-end'>
            <button
              className='w-full ml-2 rounded-md border-2 border-solid '
              type='button'
              style={{ color: '#001529' }}
              color='white'
              onClick={() => navigate(SaleOrderRoutesEnum.SALE_ORDERS)}
            >
              Cancelar
            </button>
            <button
              className='w-full ml-2 rounded-md text-white'
              type='submit'
              style={{ backgroundColor: '#001529' }}
              color='white'
            >
              {saleOrderId ? 'Editar' : 'Inserir'}
            </button>
          </div>
        </form>
      </div>
      {saleOrderId && (
        <div>
          <Divider />
          <SaleOrderItemList />
        </div>
      )}
    </div>
  );
};
