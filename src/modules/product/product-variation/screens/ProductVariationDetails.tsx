import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { z } from 'zod';

import { Input } from '../../../../components/input/Input';
import useProductVariationRequests from '../hooks/useProductVariationRequests';
import { IProductVariation } from '../interfaces/ProductVariationInterface';

const schema = z.object({
  name: z.string().min(1, 'O campo nome é obrigatório'),
});

type FormData = z.infer<typeof schema>;

interface ProductVariationDetailsProps {
  onCancel?: () => void;
  productVariationId?: number;
  onSave?: () => void;
}

export const ProductVariationDetails = ({
  onCancel,
  productVariationId,
  onSave,
}: ProductVariationDetailsProps) => {
  const { productId } = useParams();
  const { getProductVariationById, saveProductVariation } =
    useProductVariationRequests();

  const [, setProductVariation] = useState<IProductVariation>();

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
    const loadProductVariation = async (productId: number, id: number) => {
      if (id) {
        const productVariationLoaded: IProductVariation =
          await getProductVariationById(productId, id);
        setProductVariation(productVariationLoaded);
        setValue('name', productVariationLoaded.name);
      }
    };

    if (productId && productVariationId) {
      loadProductVariation(parseInt(productId), productVariationId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productVariationId]);

  function onSubmit(data: FormData) {
    if (productId) {
      saveProductVariation(
        {
          name: data.name,
        },
        productId,
        productVariationId ? productVariationId.toString() : undefined,
      )
        .then(() => {
          onSave?.();
          handleCancel();
          toast.success('Variação salva com sucesso!');
        })
        .catch(() => {
          toast.error('Erro ao salvar a variação');
        });
    }
  }

  const handleCancel = () => {
    setProductVariation(undefined);
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
              title='Nome da variação'
              type='text'
              placeholder='Digite o nome da variação...'
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
              {productVariationId ? 'Editar' : 'Inserir'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
