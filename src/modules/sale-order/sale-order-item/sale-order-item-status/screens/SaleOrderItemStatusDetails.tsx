import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';

import { Input } from '../../../../../components/input/Input';
import useSaleOrderItemStatusRequests from '../hooks/useSaleOrderItemStatusRequests';
import { ISaleOrderItemStatus } from '../interfaces/SaleOrderItemStatusInterface';

const schema = z.object({
  name: z.string().min(1, 'O campo nome é obrigatório'),
});

type FormData = z.infer<typeof schema>;

interface SaleOrderItemStatusDetailsProps {
  onCancel: () => void;
  saleOrderItemStatusId?: number;
  onSave: () => void;
}
export const SaleOrderItemStatusDetails = ({
  onCancel,
  saleOrderItemStatusId,
  onSave,
}: SaleOrderItemStatusDetailsProps) => {
  const [saleOrderItemStatus, setSaleOrderItemStatus] =
    useState<ISaleOrderItemStatus>();
  const { getSaleOrderItemStatusById, saveSaleOrderItemStatus } =
    useSaleOrderItemStatusRequests();

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
    const loadSaleOrderItemStatus = async (id: number) => {
      getSaleOrderItemStatusById(id)
        .then((saleOrderItemStatusLoaded) => {
          if (saleOrderItemStatusLoaded) {
            setSaleOrderItemStatus(saleOrderItemStatusLoaded);
            setValue('name', saleOrderItemStatusLoaded.name);
          }
        })
        .catch((error) => {
          throw new Error(`Erro ao buscar o status de item de venda: ${error}`);
        });
    };

    if (saleOrderItemStatusId) {
      loadSaleOrderItemStatus(saleOrderItemStatusId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [saleOrderItemStatusId]);

  function onSubmit(data: FormData) {
    saveSaleOrderItemStatus(
      {
        name: data.name,
      },
      saleOrderItemStatusId ? saleOrderItemStatusId.toString() : undefined,
    )
      .then(() => {
        onSave();
        toast.success('Status de item de venda salvo com sucesso!');
        handleCancel();
      })
      .catch((error) => {
        toast.error('Erro ao salvar o status de item de venda.');
        throw new Error(`Erro ao salvar o status de item de venda: ${error}`);
      });
  }

  const handleCancel = () => {
    setSaleOrderItemStatus(undefined);
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
              title='Nome do status de item de venda'
              type='text'
              placeholder='Digite o nome do status de item de venda...'
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
              {saleOrderItemStatusId ? 'Editar' : 'Inserir'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
