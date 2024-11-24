import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

import { Input } from '../../../../components/input/Input';
import useIntegrationStatusRequests from '../hooks/useIntegrationStatusRequests';
import { IIntegrationStatus } from '../interfaces/IntegrationStatusInterface';

const schema = z.object({
  name: z.string().min(1, 'O campo nome é obrigatório'),
});

type FormData = z.infer<typeof schema>;

interface IntegrationStatusDetailsProps {
  onCancel?: () => void;
  integrationStatusId?: number;
  onSave?: () => void;
}

export const IntegrationStatusDetails = ({
  onCancel,
  integrationStatusId,
  onSave,
}: IntegrationStatusDetailsProps) => {
  const [, setIntegrationStatus] = useState<IIntegrationStatus>();
  const { getIntegrationStatusById, saveIntegrationStatus } =
    useIntegrationStatusRequests();

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
    const loadIntegrationStatus = async (id: number) => {
      getIntegrationStatusById(id)
        .then((integrationStatusLoaded) => {
          if (integrationStatusLoaded) {
            setIntegrationStatus(integrationStatusLoaded);
            setValue('name', integrationStatusLoaded.name);
          }
        })
        .catch((error) => {
          throw new Error(`Erro ao buscar o status de integração: ${error}`);
        });
    };

    if (integrationStatusId) {
      loadIntegrationStatus(integrationStatusId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [integrationStatusId]);

  function onSubmit(data: FormData) {
    saveIntegrationStatus(
      {
        name: data.name,
      },
      integrationStatusId ? integrationStatusId.toString() : undefined,
    )
      .then(() => {
        onSave?.();
        toast.success('Status de integração salvo com sucesso!');
        handleCancel();
      })
      .catch((error) => {
        toast.error('Erro ao salvar o status de integração.');
        throw new Error(`Erro ao salvar o status de integração: ${error}`);
      });
  }

  const handleCancel = () => {
    setIntegrationStatus(undefined);
    reset();
    onCancel?.();
  };

  return (
    <div>
      <div className='w-full bg-white p-3 rounded-lg flex flex-col sm:flex-row items-center gap-2 mt-2'>
        <form className='w-full' onSubmit={handleSubmit(onSubmit)}>
          <div className='w-full mb-4'>
            <Input
              className='w-full border-2 rounded-md px-2'
              title='Nome do status de integração'
              type='text'
              placeholder='Digite o nome do status de integração...'
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
              {integrationStatusId ? 'Editar' : 'Inserir'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
