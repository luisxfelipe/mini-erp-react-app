import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { z } from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';

import { Input } from '../../../components/input/Input';
import Select from '../../../components/select/Select';
import useCategoryRequests from '../../../shared/hooks/useCategoryRequests';
import useProductRequests from '../../../shared/hooks/useProductRequests';
import { ICategory } from '../../../shared/types/CategoryType';
import { IProduct } from '../../../shared/types/ProductType';

const schema = z.object({
  name: z.string().min(1, 'O campo nome é obrigatório'),
  description: z.string(),
  // o campo categoria deve ter o valor maior que 0
  category: z.string().min(1, 'Selecione uma categoria'),
});

type FormData = z.infer<typeof schema>;

export const Product = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState<IProduct>();
  const [categories, setCategories] = useState<ICategory[]>([]);
  const { getCategories } = useCategoryRequests();
  const { getProductById, saveProduct } = useProductRequests();

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
    defaultValues: {
      category: '',
    },
  });

  useEffect(() => {
    const loadCategories = async () => {
      const categories: ICategory[] = await getCategories();
      setCategories(categories);
    };

    loadCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);

  useEffect(() => {
    const loadProduct = async (id: number) => {
      if (id) {
        const product: IProduct = await getProductById(id);
        setProduct(product);
        setValue('name', product.name);
        setValue('category', product.category.id.toString());
        setValue('description', product.description);
      }
    };

    if (productId) {
      loadProduct(parseInt(productId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  function onSubmit(data: FormData) {
    const categorySelected = categories.find(
      (category) => category.id === parseInt(data.category),
    );

    saveProduct(
      {
        name: data.name,
        category: categorySelected!,
        description: data.description,
      },
      productId,
    )
      .then(() => {
        setProduct(undefined);
        reset();
        navigate('/products');
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
              title='Nome do produto'
              type='text'
              placeholder='Digite o nome do produto...'
              {...register('name')}
            />
            {errors.name && (
              <p className='my-1 text-red-500'>{errors.name.message}</p>
            )}
          </div>
          <div className='w-full mb-4'>
            <Select
              className='w-full border-2 rounded-md mb-4 px-2'
              title='Categoria'
              name='category'
              options={categories.map((category) => ({
                value: category.id.toString(),
                label: category.name,
              }))}
              register={register}
            />
            {errors.category && (
              <p className='my-1 text-red-500'>{errors.category.message}</p>
            )}
          </div>
          <div className='w-full mb-4'>
            <textarea
              className='w-full border-2 rounded-md mb-4 px-2'
              {...register('description')}
            ></textarea>
            {errors.description && (
              <p className='my-1 text-red-500'>{errors.description.message}</p>
            )}
          </div>
          <div className='w-96 flex flex-row float-end'>
            <button
              className='w-full ml-2 rounded-md border-2 border-solid '
              type='button'
              style={{ color: '#001529' }}
              color='white'
              onClick={() => navigate('/products')}
            >
              Cancelar
            </button>
            <button
              className='w-full ml-2 rounded-md text-white'
              type='submit'
              style={{ backgroundColor: '#001529' }}
              color='white'
            >
              {productId ? 'Editar' : 'Inserir'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
