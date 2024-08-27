import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { z } from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';

import { Input } from '../../../components/input/Input';
import useCategoryRequests from '../../../shared/hooks/useCategoryRequests';
import { ICategory } from '../../../shared/types/CategoryType';

const schema = z.object({
  name: z.string().min(1, 'O campo nome é obrigatório'),
});

type FormData = z.infer<typeof schema>;

export const Category = () => {
  const { categoryId } = useParams();
  const [category, setCategory] = useState<ICategory>();
  const { getCategoryById, saveCategory } = useCategoryRequests();

  const navigate = useNavigate();

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
    const loadProduct = async (id: number) => {
      if (id) {
        const categoryLoaded: ICategory = await getCategoryById(id);
        setCategory(categoryLoaded);
        setValue('name', categoryLoaded.name);
      }
    };

    if (categoryId) {
      loadProduct(parseInt(categoryId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId]);

  function onSubmit(data: FormData) {
    saveCategory(
      {
        name: data.name,
      },
      categoryId,
    )
      .then(() => {
        setCategory(undefined);
        reset();
        navigate('/categories');
      })
      .catch((error) => {
        console.log(`error: ${error}`);
      });
  }

  return (
    <div>
      <div className='w-full bg-white p-3 rounded-lg flex flex-col sm:flex-row items-center gap-2 mt-2'>
        <form className='w-full' onSubmit={handleSubmit(onSubmit)}>
          <div className='w-full mb-4'>
            <Input
              className='w-full border-2 rounded-md px-2'
              title='Nome da categoria'
              type='text'
              placeholder='Digite o nome da categoria...'
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
              onClick={() => navigate('/categories')}
            >
              Cancelar
            </button>
            <button
              className='w-full ml-2 rounded-md text-white'
              type='submit'
              style={{ backgroundColor: '#001529' }}
              color='white'
            >
              {categoryId ? 'Editar' : 'Inserir'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
