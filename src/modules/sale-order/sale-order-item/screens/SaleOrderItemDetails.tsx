import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { z } from 'zod';

import { Input } from '../../../../components/input/Input';
import Select from '../../../../components/select/Select';
import useProductRequests from '../../../product/hooks/useProductRequests';
import { IProduct } from '../../../product/interfaces/ProductInterface';
import useProductVariationRequests from '../../../product/product-variation/hooks/useProductVariationRequests';
import { IProductVariation } from '../../../product/product-variation/interfaces/ProductVariationInterface';
import useSaleOrderItemRequests from '../hooks/useSaleOrderItemRequests';
import { ISaleOrderItem } from '../interfaces/SaleOrderItemInterface';
import useSaleOrderItemStatusRequests from '../sale-order-item-status/hooks/useSaleOrderItemStatusRequests';
import { ISaleOrderItemStatus } from '../sale-order-item-status/interfaces/SaleOrderItemStatusInterface';

const schema = z.object({
  product: z.string().min(1, 'Selecione um produto'),
  productVariation: z.string().min(1, 'Selecione uma variação'),
  price: z.preprocess(
    (value) => Number(value),
    z.number().refine((value) => value >= 0, {
      message: 'O campo preço deve ser maior ou igual a zero',
    }),
  ),
  saleOrderItemStatus: z
    .string()
    .min(1, 'O campo status do item do pedido é obrigatório'),
});

type FormData = z.infer<typeof schema>;

interface SaleOrderItemDetailsProps {
  onCancel?: () => void;
  saleOrderItemId?: number;
  onSave?: () => void;
}

export const SaleOrderItemDetails = ({
  onCancel,
  saleOrderItemId,
  onSave,
}: SaleOrderItemDetailsProps) => {
  const { saleOrderId } = useParams();
  const { getSaleOrderItemById, saveSaleOrderItem } =
    useSaleOrderItemRequests();
  const [saleOrderItem, setSaleOrderItem] = useState<ISaleOrderItem>();

  const [products, setProducts] = useState<IProduct[]>([]);
  const { getProducts } = useProductRequests();

  const [productVariations, setProductVariations] = useState<
    IProductVariation[]
  >([]);
  const { getProductVariations } = useProductVariationRequests();

  const [saleOrderItemStatus, setSaleOrderItemStatus] = useState<
    ISaleOrderItemStatus[]
  >([]);
  const { getSaleOrderItemStatus } = useSaleOrderItemStatusRequests();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  });

  const productId = watch('product');

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const memoizedGetProducts = useCallback(getProducts, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const memoizedGetProductVariations = useCallback(getProductVariations, []);

  const memoizedGetSaleOrderItemStatus = useCallback(getSaleOrderItemStatus, [
    getSaleOrderItemStatus,
  ]);

  const loadSaleOrderItemStatus = useCallback(async () => {
    const response = await memoizedGetSaleOrderItemStatus();
    setSaleOrderItemStatus(response);
  }, [memoizedGetSaleOrderItemStatus, setSaleOrderItemStatus]);

  const loadSaleOrderItem = useCallback(
    async (saleOrderId: number, id: number) => {
      const productsData = await memoizedGetProducts();
      setProducts(productsData);

      if (id) {
        const saleOrderItemLoaded: ISaleOrderItem = await getSaleOrderItemById(
          saleOrderId,
          id,
        );

        setSaleOrderItem(saleOrderItemLoaded);
        setValue('product', saleOrderItemLoaded.product.id.toString());
        setValue(
          'productVariation',
          saleOrderItemLoaded.productVariation.id?.toString() || '',
        );
        setValue('price', saleOrderItemLoaded.price);
        setValue(
          'saleOrderItemStatus',
          saleOrderItemLoaded.saleOrderItemStatus.id.toString(),
        );
      }
    },
    [
      memoizedGetProducts,
      setProducts,
      getSaleOrderItemById,
      setSaleOrderItem,
      setValue,
    ],
  );

  const loadProducts = useCallback(async () => {
    const productsData = await memoizedGetProducts();
    setProducts(productsData);
  }, [memoizedGetProducts, setProducts]);

  const loadProductVariations = useCallback(async () => {
    const response = await memoizedGetProductVariations(parseInt(productId));
    setProductVariations(response);
  }, [memoizedGetProductVariations, productId, setProductVariations]);

  useEffect(() => {
    if (productId && productId !== '') {
      loadProductVariations();
    }
  }, [loadProductVariations, productId]);

  const handleCancel = () => {
    setSaleOrderItem(undefined);
    setProducts([]);
    setProductVariations([]);
    reset();
    onCancel?.();
  };

  useEffect(() => {
    loadProducts();
    loadSaleOrderItemStatus();

    if (saleOrderId && saleOrderItemId) {
      loadSaleOrderItem(parseInt(saleOrderId), saleOrderItemId);
    }
  }, [
    saleOrderId,
    saleOrderItemId,
    memoizedGetProducts,
    memoizedGetSaleOrderItemStatus,
    setValue,
    loadProducts,
    loadSaleOrderItem,
    loadSaleOrderItemStatus,
  ]);

  function onSubmit(data: FormData) {
    const productSelected = products.find(
      (product) => product.id === parseInt(data.product),
    );

    const productVariationSelected = productVariations.find(
      (productVariation) =>
        productVariation.id === parseInt(data.productVariation),
    );

    if (
      productSelected &&
      productVariationSelected &&
      productVariationSelected.id &&
      saleOrderId
    ) {
      saveSaleOrderItem(
        {
          productId: productSelected.id,
          productVariationId: productVariationSelected.id,
          price: data.price,
          saleOrderItemStatusId: parseInt(data.saleOrderItemStatus),
        },
        saleOrderId,
        saleOrderItem?.id.toString(),
      )
        .then(() => {
          onSave?.();
          handleCancel();
          toast.success('Item salvo com sucesso!');
        })
        .catch((error) => {
          throw new Error(`Erro ao salvar o item: ${error}`);
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
              title='Produto'
              name='product'
              options={products.map((product) => ({
                value: product.id ? product.id.toString() : '',
                label: product.name,
              }))}
              register={register}
            />
            {errors.product && (
              <p className='my-1 text-red-500'>{errors.product.message}</p>
            )}
          </div>
          {productId && productVariations.length > 0 && (
            <div className='w-full mb-4'>
              <Select
                className='w-full border-2 rounded-md mb-4 px-2'
                title='Variação'
                name='productVariation'
                options={productVariations.map((productVariation) => ({
                  value: productVariation.id
                    ? productVariation.id.toString()
                    : '',
                  label: productVariation.name,
                }))}
                register={register}
              />
              {errors.productVariation && (
                <p className='my-1 text-red-500'>
                  {errors.productVariation.message}
                </p>
              )}
            </div>
          )}
          {productId && productVariations.length === 0 && (
            <p className='my-1 text-red-500'>
              Não há variações disponíveis para o produto selecionado.
            </p>
          )}
          <div className='w-full mb-4'>
            <Input
              className='w-full border-2 rounded-md px-2'
              title='Preço'
              type='number'
              step='0.01'
              placeholder='Digite o preço...'
              {...register('price', { valueAsNumber: true })}
            />
            {errors.price && (
              <p className='my-1 text-red-500'>{errors.price.message}</p>
            )}
          </div>
          <div className='w-full mb-4'>
            <Select
              className='w-full border-2 rounded-md mb-4 px-2'
              title='Status do item'
              name='saleOrderItemStatus'
              options={saleOrderItemStatus.map((status) => ({
                value: status.id ? status.id.toString() : '',
                label: status.name,
              }))}
              register={register}
            />
            {errors.saleOrderItemStatus && (
              <p className='my-1 text-red-500'>
                {errors.saleOrderItemStatus.message}
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
              {saleOrderItemId ? 'Editar' : 'Inserir'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
