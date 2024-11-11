import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

import { Input } from '../../../../components/input/Input';
import Select from '../../../../components/select/Select';
import usePlatformRequests from '../../../platform/hooks/usePlatformRequests';
import { IPlatform } from '../../../platform/interfaces/PlatformInterface';
import useSalePlatformCommissionRequests from '../hooks/useSalePlatformCommissionRequests';
import { ISalePlatformCommission } from '../interfaces/SalePlatformCommissionInterface';

const schema = z.object({
  salePlatform: z.string().min(1, 'Selecione uma plataforma'),
  commissionPercentage: z.preprocess(
    (value) => Number(value),
    z
      .number({ message: 'O campo comissão deve ser um número' })
      .positive({ message: 'O campo comissão deve ser um número positivo' }),
  ),
  costPerItemSold: z.preprocess(
    (value) => Number(value),
    z.number({ message: 'O campo custo por item vendido deve ser um número' }),
  ),
  defaultProfitPercentage: z.preprocess(
    (value) => Number(value),
    z
      .number({ message: 'O campo porcentagem de lucro deve ser um número' })
      .positive({
        message: 'O campo porcentagem de lucro deve ser um número positivo',
      }),
  ),
  additionalProfit: z.preprocess(
    (value) => Number(value),
    z.number({
      message: 'O campo porcentagem de lucro adicional deve ser um número',
    }),
  ),
});

type FormData = z.infer<typeof schema>;

interface SalePlatformCommissionDetailsProps {
  onCancel?: () => void;
  salePlatformCommissionId?: number;
  onSave?: () => void;
}

export const SalePlatformCommissionDetails = ({
  onCancel,
  onSave,
  salePlatformCommissionId,
}: SalePlatformCommissionDetailsProps) => {
  const { getSalePlatformCommissionById, saveSalePlatformCommission } =
    useSalePlatformCommissionRequests();
  const [salePlatformCommission, setSalePlatformCommission] =
    useState<ISalePlatformCommission>();

  const [salePlatforms, setSalePlatforms] = useState<IPlatform[]>([]);
  const { getPlatforms } = usePlatformRequests();

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

  const memoizedGetSalePlatforms = useCallback(getPlatforms, [getPlatforms]);

  const loadSalePlatformCommission = useCallback(async () => {
    if (salePlatformCommissionId) {
      await getSalePlatformCommissionById(salePlatformCommissionId).then(
        (data: ISalePlatformCommission | undefined) => {
          if (data) {
            setSalePlatformCommission(data);
            setValue('salePlatform', data?.salePlatform?.id?.toString());
            setValue('commissionPercentage', data.commissionPercentage);
            if (data.costPerItemSold) {
              setValue('costPerItemSold', data.costPerItemSold);
            }
            if (data.defaultProfitPercentage) {
              setValue('defaultProfitPercentage', data.defaultProfitPercentage);
            }
            if (data.additionalProfit) {
              setValue('additionalProfit', data.additionalProfit);
            }
          }
        },
      );
    }
  }, [
    salePlatformCommissionId,
    getSalePlatformCommissionById,
    setSalePlatformCommission,
    setValue,
  ]);

  useEffect(() => {
    const loadSalePlatforms = async () => {
      const salePlatformsData = await memoizedGetSalePlatforms();
      setSalePlatforms(salePlatformsData);
    };
    loadSalePlatforms();

    if (salePlatformCommissionId) {
      loadSalePlatformCommission();
    }
  }, [
    loadSalePlatformCommission,
    memoizedGetSalePlatforms,
    salePlatformCommissionId,
  ]);

  const handleCancel = () => {
    setSalePlatformCommission(undefined);
    setSalePlatforms([]);
    reset();
    onCancel?.();
  };

  function onSubmit(data: FormData) {
    const salePlatformSelected = salePlatforms.find(
      (salePlatform) => salePlatform.id === parseInt(data.salePlatform),
    );

    if (salePlatformSelected) {
      saveSalePlatformCommission(
        {
          salePlatformId: salePlatformSelected.id,
          commissionPercentage: data.commissionPercentage,

          costPerItemSold:
            data.costPerItemSold > 0 ? data.costPerItemSold : undefined,
          defaultProfitPercentage: data.defaultProfitPercentage,
          additionalProfit:
            data.additionalProfit > 0 ? data.additionalProfit : undefined,
        },
        salePlatformCommission?.id.toString(),
      )
        .then((response) => {
          if (response) {
            onSave?.();
            handleCancel();
            toast.success('Comissão salva com sucesso!');
            reset();
          } else {
            toast.error('Erro ao salvar a comissão');
          }
        })
        .catch((error) => {
          throw new Error(`Erro ao salvar a comissão: ${error}`);
        });
    }
  }

  return (
    <div>
      <div className='w-full bg-white p-3 rounded-lg flex flex-col sm:flex-row items-center gap-2 mt-2'>
        <form className='w-full' onSubmit={handleSubmit(onSubmit)}>
          <div className='w-full mb-4'>
            <Select
              className='w-full border-2 rounded-md mb-4 px-2'
              title='Plataforma'
              name='salePlatform'
              options={salePlatforms.map((salePlatform) => ({
                value: salePlatform.id ? salePlatform.id.toString() : '',
                label: salePlatform.name,
              }))}
              register={register}
            />
            {errors.salePlatform && (
              <p className='my-1 text-red-500'>{errors.salePlatform.message}</p>
            )}
          </div>
          <div className='w-full mb-4'>
            <Input
              className='w-full border-2 rounded-md px-2'
              title='Comissão'
              type='number'
              step='0.01'
              placeholder='Digite a comissão...'
              {...register('commissionPercentage', { valueAsNumber: true })}
              defaultValue={0}
            />
            {errors.commissionPercentage && (
              <p className='my-1 text-red-500'>
                {errors.commissionPercentage.message}
              </p>
            )}
          </div>
          <div className='w-full mb-4'>
            <Input
              className='w-full border-2 rounded-md px-2'
              title='Custo por item vendido'
              type='number'
              step='0.01'
              placeholder='Digite o custo por item vendido...'
              {...register('costPerItemSold', { valueAsNumber: true })}
              defaultValue={0}
            />
            {errors.costPerItemSold && (
              <p className='my-1 text-red-500'>
                {errors.costPerItemSold.message}
              </p>
            )}
          </div>
          <div className='w-full mb-4'>
            <Input
              className='w-full border-2 rounded-md px-2'
              title='Porcentagem de lucro padrão'
              type='number'
              step='0.01'
              placeholder='Digite a porcentagem de lucro padrão...'
              {...register('defaultProfitPercentage', { valueAsNumber: true })}
              defaultValue={0}
            />
            {errors.defaultProfitPercentage && (
              <p className='my-1 text-red-500'>
                {errors.defaultProfitPercentage.message}
              </p>
            )}
          </div>
          <div className='w-full mb-4'>
            <Input
              className='w-full border-2 rounded-md px-2'
              title='Lucro adicional'
              type='number'
              step='0.01'
              placeholder='Digite o lucro adicional...'
              {...register('additionalProfit', { valueAsNumber: true })}
              defaultValue={0}
            />
            {errors.additionalProfit && (
              <p className='my-1 text-red-500'>
                {errors.additionalProfit.message}
              </p>
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
              {salePlatformCommissionId ? 'Editar' : 'Inserir'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
