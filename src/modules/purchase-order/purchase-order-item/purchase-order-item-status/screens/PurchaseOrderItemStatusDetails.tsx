import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

import { Input } from '../../../../../components/input/Input';
import usePurchaseOrderItemStatusRequests from '../hooks/usePurchaseOrderItemStatusRequests';
import { IPurchaseOrderItemStatus } from '../interfaces/PurchaseOrderItemStatusInterface';

const schema = z.object({
  name: z.string().min(1, 'O campo nome é obrigatório'),
});

type FormData = z.infer<typeof schema>;

interface PurchaseOrderItemStatusDetailsProps {
  onCancel: () => void;
  purchaseOrderItemStatusId?: number;
  onSave: () => void;
}

export const PurchaseOrderItemStatusDetails = ({
  onCancel,
  purchaseOrderItemStatusId,
  onSave,
}: PurchaseOrderItemStatusDetailsProps) => {
  const [, setPurchaseOrderItemStatus] = useState<IPurchaseOrderItemStatus>();
  const { getPurchaseOrderItemStatusById, savePurchaseOrderItemStatus } =
    usePurchaseOrderItemStatusRequests();

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
    const loadPurchaseOrderItemStatus = async (id: number) => {
      getPurchaseOrderItemStatusById(id)
        .then((purchaseOrderItemStatusLoaded) => {
          if (purchaseOrderItemStatusLoaded) {
            setPurchaseOrderItemStatus(purchaseOrderItemStatusLoaded);
            setValue('name', purchaseOrderItemStatusLoaded.name);
          }
        })
        .catch((error) => {
          throw new Error(
            `Erro ao buscar o status de item de compra: ${error}`,
          );
        });
    };

    if (purchaseOrderItemStatusId) {
      loadPurchaseOrderItemStatus(purchaseOrderItemStatusId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [purchaseOrderItemStatusId]);

  function onSubmit(data: FormData) {
    savePurchaseOrderItemStatus(
      {
        name: data.name,
      },
      purchaseOrderItemStatusId
        ? purchaseOrderItemStatusId.toString()
        : undefined,
    )
      .then(() => {
        onSave();
        toast.success('Status de item de compra salvo com sucesso!');
        handleCancel();
      })
      .catch((error) => {
        toast.error('Erro ao salvar o status de item de compra.');
        throw new Error(`Erro ao salvar o status de item de compra: ${error}`);
      });
  }

  const handleCancel = () => {
    setPurchaseOrderItemStatus(undefined);
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
              title='Nome do status de item de compra'
              type='text'
              placeholder='Digite o nome do status de item de compra...'
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
              {purchaseOrderItemStatusId ? 'Editar' : 'Inserir'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
