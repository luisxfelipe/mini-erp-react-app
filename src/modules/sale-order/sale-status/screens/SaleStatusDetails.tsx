import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

import { Input } from '../../../../components/input/Input';
import useSaleStatusRequests from '../hooks/useSaleStatusRequests';
import { ISaleStatus } from '../interfaces/SaleStatusInterface';

const schema = z.object({
  name: z.string().min(1, 'O campo nome é obrigatório'),
});

type FormData = z.infer<typeof schema>;

interface SaleStatusDetailsProps {
  onCancel: () => void;
  saleStatusId?: number;
  onSave: () => void;
}

export const SaleStatusDetails = ({
  onCancel,
  saleStatusId,
  onSave,
}: SaleStatusDetailsProps) => {
  const [, setSaleStatus] = useState<ISaleStatus>();
  const { getSaleStatusById, saveSaleStatus } = useSaleStatusRequests();

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
    const loadSaleStatus = async (id: number) => {
      getSaleStatusById(id)
        .then((saleStatusLoaded) => {
          if (saleStatusLoaded) {
            setSaleStatus(saleStatusLoaded);
            setValue('name', saleStatusLoaded.name);
          }
        })
        .catch((error) => {
          throw new Error(
            `Erro ao buscar o status de ordem de venda: ${error}`,
          );
        });
    };

    if (saleStatusId) {
      loadSaleStatus(saleStatusId);
    }
  }, [getSaleStatusById, saleStatusId, setValue]);

  function onSubmit(data: FormData) {
    saveSaleStatus(
      {
        name: data.name,
      },
      saleStatusId ? saleStatusId.toString() : undefined,
    )
      .then(() => {
        onSave();
        toast.success('Status da venda salvo com sucesso!');
        handleCancel();
      })
      .catch((error) => {
        toast.error('Erro ao salvar o status da venda.');
        throw new Error(`Erro ao salvar o status da venda: ${error}`);
      });
  }

  const handleCancel = () => {
    setSaleStatus(undefined);
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
              title='Nome do status da ordem de venda'
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
              {saleStatusId ? 'Editar' : 'Inserir'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
