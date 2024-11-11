import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';

import { Input } from '../../../components/input/Input';
import usePlatformRequests from '../hooks/usePlatformRequests';
import { IPlatform } from '../interfaces/PlatformInterface';

const schema = z.object({
  name: z.string().min(1, 'O campo nome é obrigatório'),
});

type FormData = z.infer<typeof schema>;

interface PlatformDetailsProps {
  onCancel: () => void;
  platformId?: number;
  onSave: () => void;
}

export const PlatformDetails = ({
  onCancel,
  platformId,
  onSave,
}: PlatformDetailsProps) => {
  const [platform, setPlatform] = useState<IPlatform>();
  const { getPlatformById, savePlatform } = usePlatformRequests();

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
    const loadPlatform = async (id: number) => {
      getPlatformById(id)
        .then((platformLoaded) => {
          if (platformLoaded) {
            setPlatform(platformLoaded);
            setValue('name', platformLoaded.name);
          }
        })
        .catch((error) => {
          toast.error('Erro ao buscar a plataforma');
          throw new Error(`Erro ao buscar a plataforma: ${error}`);
        });
    };

    if (platformId) {
      loadPlatform(platformId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [platformId]);

  function onSubmit(data: FormData) {
    savePlatform(
      {
        name: data.name,
      },
      platformId ? platformId.toString() : undefined,
    )
      .then(() => {
        onSave();
        toast.success('Plataforma salva com sucesso!');
        handleCancel();
      })
      .catch((error) => {
        toast.error('Erro ao salvar a plataforma.');
        throw new Error(`Erro ao salvar a plataforma: ${error}`);
      });
  }

  const handleCancel = () => {
    setPlatform(undefined);
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
              title='Nome'
              type='text'
              placeholder='Digite o nome...'
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
              {platformId ? 'Editar' : 'Inserir'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
