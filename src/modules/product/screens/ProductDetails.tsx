import { zodResolver } from '@hookform/resolvers/zod';
import { Divider } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { z } from 'zod';

import { Input } from '../../../components/input/Input';
import Select from '../../../components/select/Select';
import useCategoryRequests from '../../category/hooks/useCategoryRequests';
import { ICategory } from '../../category/interfaces/CategoryInterface';
import useProductRequests from '../hooks/useProductRequests';
import { IProduct } from '../interfaces/ProductInterface';
import { ProductVariationList } from '../product-variation/screens/ProductVariationList';

const schema = z.object({
  name: z.string().min(1, 'O campo nome é obrigatório'),
  description: z.string(),
  category: z.string().min(1, 'Selecione uma categoria'),
});

type FormData = z.infer<typeof schema>;

export const ProductDetails = () => {
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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const memoizedGetCategories = useCallback(getCategories, []);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const memoizedGetProductById = useCallback(getProductById, []);

  useEffect(() => {
    const fetchData = async () => {
      const categoriesData = await memoizedGetCategories();
      setCategories(categoriesData);

      if (productId) {
        const productData = await memoizedGetProductById(parseInt(productId));
        setProduct(productData);

        setValue('name', productData.name);
        if (productData.description) {
          setValue('description', productData.description);
        }
        setValue('category', productData.category.id?.toString() || '');
      }
    };

    fetchData();
  }, [productId, memoizedGetCategories, memoizedGetProductById, setValue]);

  function onSubmit(data: FormData) {
    const categorySelected = categories.find(
      (category) => category.id === parseInt(data.category),
    );

    saveProduct(
      {
        name: data.name,
        categoryId: categorySelected!.id,
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
        throw new Error(`Erro ao salvar o produto: ${error}`);
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
                value: category.id ? category.id.toString() : '',
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
      {product && (
        <div>
          <Divider />
          <ProductVariationList />
        </div>
      )}
    </div>
  );
};
