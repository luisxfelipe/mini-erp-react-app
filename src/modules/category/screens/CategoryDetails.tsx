import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';

import { Input } from '../../../components/input/Input';
import useCategoryRequests from '../hooks/useCategoryRequests';
import { ICategory } from '../interfaces/CategoryInterface';

const schema = z.object({
  name: z.string().min(1, 'O campo nome é obrigatório'),
});

type FormData = z.infer<typeof schema>;

interface CategoryDetailsProps {
  onCancel: () => void;
  categoryId?: number;
  onSave: () => void;
}

export const CategoryDetails = ({
  onCancel,
  categoryId,
  onSave,
}: CategoryDetailsProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [category, setCategory] = useState<ICategory>();
  const { getCategoryById, saveCategory } = useCategoryRequests();

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
    const loadCategory = async (id: number) => {
      getCategoryById(id)
        .then((categoryLoaded) => {
          if (categoryLoaded) {
            setCategory(categoryLoaded);
            setValue('name', categoryLoaded.name);
          }
        })
        .catch((error) => {
          throw new Error(`Erro ao buscar a categoria: ${error}`);
        });
    };

    if (categoryId) {
      loadCategory(categoryId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId]);

  function onSubmit(data: FormData) {
    saveCategory(
      {
        name: data.name,
      },
      categoryId ? categoryId.toString() : undefined,
    )
      .then(() => {
        onSave();
        toast.success('Categoria salva com sucesso!');
        handleCancel();
      })
      .catch((error) => {
        toast.error('Erro ao salvar categoria!');
        throw new Error(`Erro ao salvar categoria: ${error}`);
      });
  }

  const handleCancel = () => {
    setCategory(undefined);
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
              {categoryId ? 'Editar' : 'Inserir'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
