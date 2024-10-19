import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';

import { Input } from '../../../../components/input/Input';
import usePurchaseOrderStatusRequests from '../hooks/usePurchaseOrderStatusRequests';
import { IPurchaseOrderStatus } from '../interfaces/PurchaseOrderStatusInterface';

const schema = z.object({
  name: z.string().min(1, 'O campo nome é obrigatório'),
});

type FormData = z.infer<typeof schema>;

interface PurchaseOrderStatusDetailsProps {
  onCancel: () => void;
  purchaseOrderStatusId?: number;
  onSave: () => void;
}

export const PurchaseOrderStatusDetails = ({
  onCancel,
  purchaseOrderStatusId,
  onSave,
}: PurchaseOrderStatusDetailsProps) => {
  const [purchaseOrderStatus, setPurchaseOrderStatus] =
    useState<IPurchaseOrderStatus>();
  const { getPurchaseOrderStatusById, savePurchaseOrderStatus } =
    usePurchaseOrderStatusRequests();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  });

  useEffect(() => {
    const loadPurchaseOrderStatus = async (id: number) => {
      getPurchaseOrderStatusById(id)
        .then((purchaseOrderStatusLoaded) => {
          if (purchaseOrderStatusLoaded) {
            setPurchaseOrderStatus(purchaseOrderStatusLoaded);
            setValue('name', purchaseOrderStatusLoaded.name);
          }
        })
        .catch((error) => {
          throw new Error(
            `Erro ao buscar o status de ordem de compra: ${error}`,
          );
        });
    };

    if (purchaseOrderStatusId) {
      loadPurchaseOrderStatus(purchaseOrderStatusId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [purchaseOrderStatusId]);

  function onSubmit(data: FormData) {
    savePurchaseOrderStatus(
      {
        name: data.name,
      },
      purchaseOrderStatusId ? purchaseOrderStatusId.toString() : undefined,
    )
      .then(() => {
        onSave();
        toast.success('Status da compra salvo com sucesso!');
        handleCancel();
      })
      .catch((error) => {
        toast.error('Erro ao salvar o status da compra.');
        throw new Error(`Erro ao salvar o status da compra: ${error}`);
      });
  }

  const handleCancel = () => {
    setPurchaseOrderStatus(undefined);
    reset();
    onCancel();
  };

  return (
    <div>
      <div className='w-full bg-white p-3 rounded-lg flex flex-col sm:flex-row items-center gap-2 mt-2'>
        <form className='w-full' onSubmit={handleSubmit(onSubmit)}>
          <div className='w-full mb-4'>
            <Input
              className='w-full border-2 rounded-md px-2'
              title='Nome do status da ordem de compra'
              type='text'
              placeholder='Digite o nome do status...'
              {...register('name')}
            />
            {errors.name && (
              <p className='my-1 text-red-500'>{errors.name.message}</p>
            )}
          </div>
          <div className='w-96 flex flex-row float-end'>
            <button
              className='w-full ml-2 rounded-md border-2 border-solid '
              type='button'
              style={{ color: '#001529' }}
              color='white'
              onClick={handleCancel}
            >
              Cancelar
            </button>
            <button
              className='w-full ml-2 rounded-md text-white'
              type='submit'
              style={{ backgroundColor: '#001529' }}
              color='white'
            >
              {purchaseOrderStatusId ? 'Editar' : 'Inserir'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
