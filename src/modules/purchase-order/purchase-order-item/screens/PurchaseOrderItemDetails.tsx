import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { z } from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';

import { Input } from '../../../../components/input/Input';
import Select from '../../../../components/select/Select';
import { IProduct } from '../../../../shared/interfaces/ProductInterface';
import useProductRequests from '../../../product/hooks/useProductRequests';
import useProductVariationRequests from '../../../product/product-variation/hooks/useProductVariationRequests';
import {
    IProductVariation
} from '../../../product/product-variation/interfaces/ProductVariationInterface';
import usePurchaseOrderItemRequests from '../hooks/usePurchaseOrderItemRequests';
import { IPurchaseOrderItem } from '../interfaces/PurchaseOrderItemInterface';
import usePurchaseOrderItemStatusRequests from '../purchase-order-item-status/hooks/usePurchaseOrderItemStatusRequests';
import {
    IPurchaseOrderItemStatus
} from '../purchase-order-item-status/interfaces/PurchaseOrderItemStatusInterface';

interface PurchaseOrderItemDetailsProps {
  onCancel: () => void;
  purchaseOrderItemId?: number;
  onSave: () => void;
}

export const PurchaseOrderItemDetails = ({
  onCancel,
  purchaseOrderItemId,
  onSave,
}: PurchaseOrderItemDetailsProps) => {
  const schema = z.object({
    product: z.string().min(1, 'Selecione um produto'),
    productVariation: z.string().min(1, 'Selecione uma variação'),
    supplierProductCode: z.string().optional(),
    price: z.preprocess(
      (value) => Number(value),
      z.number().refine((value) => value >= 0, {
        message: 'O campo preço deve ser maior ou igual a zero',
      }),
    ),
    purchaseOrderItemStatus: z
      .string()
      .min(1, 'O campo status do item do pedido é obrigatório'),
    productLink: z
      .string()
      .refine((value) => !value || z.string().url().safeParse(value).success, {
        message: 'O campo link do produto deve ser uma URL válida',
      })
      .optional(),
    // Adicione aqui a validação condicional para o campo quantity
    quantity: !purchaseOrderItemId
      ? z
          .number({ message: 'O campo quantidade é obrigatório' })
          .int('O campo quantidade deve ser um número inteiro')
          .refine((value) => value > 0, {
            message: 'O campo quantidade deve ser maior que zero',
          })
      : z.unknown(),
  });

  type FormData = z.infer<typeof schema>;

  const { purchaseOrderId } = useParams();
  const { getPurchaseOrderItemById, savePurchaseOrderItem } =
    usePurchaseOrderItemRequests();
  const [purchaseOrderItem, setPurchaseOrderItem] =
    useState<IPurchaseOrderItem>();

  const [products, setProducts] = useState<IProduct[]>([]);
  const { getProducts } = useProductRequests();

  const [productVariations, setProductVariations] = useState<
    IProductVariation[]
  >([]);
  const { getProductVariations } = useProductVariationRequests();

  const [purchaseOrderItemStatus, setPurchaseOrderItemStatus] = useState<
    IPurchaseOrderItemStatus[]
  >([]);
  const { getPurchaseOrderItemStatus } = usePurchaseOrderItemStatusRequests();

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

  const memoizedGetPurchaseOrderItemStatus = useCallback(
    getPurchaseOrderItemStatus,
    [],
  );

  useEffect(() => {
    if (productId && productId !== '') {
      loadProductVariations();
    }
  }, [productId]);

  useEffect(() => {
    loadProducts();
    loadPurchaseOrderItemStatus();

    if (purchaseOrderId && purchaseOrderItemId) {
      loadPurchaseOrderItem(parseInt(purchaseOrderId), purchaseOrderItemId);
    }
  }, [
    purchaseOrderId,
    purchaseOrderItemId,
    memoizedGetProducts,
    memoizedGetPurchaseOrderItemStatus,
    setValue,
  ]);

  const loadPurchaseOrderItem = async (purchaseOrderId: number, id: number) => {
    const productsData = await memoizedGetProducts();
    setProducts(productsData);

    if (id) {
      const purchaseOrderItemLoaded: IPurchaseOrderItem =
        await getPurchaseOrderItemById(purchaseOrderId, id);

      setPurchaseOrderItem(purchaseOrderItemLoaded);
      setValue('product', purchaseOrderItemLoaded.product.id.toString());
      setValue(
        'productVariation',
        purchaseOrderItemLoaded.productVariation.id?.toString() || '',
      );
      setValue(
        'supplierProductCode',
        purchaseOrderItemLoaded.supplierProductCode,
      );
      setValue('price', purchaseOrderItemLoaded.price);
      setValue(
        'purchaseOrderItemStatus',
        purchaseOrderItemLoaded.purchaseOrderItemStatus.id.toString(),
      );
      setValue('productLink', purchaseOrderItemLoaded.productLink);
    }
  };

  const loadProducts = async () => {
    const productsData = await memoizedGetProducts();
    setProducts(productsData);
  };

  const loadProductVariations = async () => {
    const response = await memoizedGetProductVariations(parseInt(productId));
    setProductVariations(response);
  };

  const loadPurchaseOrderItemStatus = async () => {
    const response = await memoizedGetPurchaseOrderItemStatus();
    // guarda os itens recebidos, excluindo o item com status 1
    const responseFiltered = response.filter((status) => status.id !== 1);

    setPurchaseOrderItemStatus(responseFiltered);
  };

  const handleCancel = () => {
    setPurchaseOrderItem(undefined);
    setProducts([]);
    setProductVariations([]);
    reset();
    onCancel();
  };

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
      purchaseOrderId
    ) {
      savePurchaseOrderItem(
        {
          productId: productSelected.id,
          productVariationId: productVariationSelected.id,
          quantity: Number(data.quantity) || undefined,
          supplierProductCode: data.supplierProductCode || undefined,
          price: data.price,
          purchaseOrderItemStatusId: parseInt(data.purchaseOrderItemStatus),
          productLink: data.productLink || undefined,
        },
        purchaseOrderId,
        purchaseOrderItem?.id.toString(),
      )
        .then(() => {
          onSave();
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
          {!purchaseOrderItemId && (
            <div className='w-full mb-4'>
              <Input
                className='w-full border-2 rounded-md px-2'
                title='Quantidade'
                type='number'
                placeholder='Digite a quantidade...'
                {...register('quantity', { valueAsNumber: true })}
              />
              {errors.quantity && (
                <p className='my-1 text-red-500'>{errors.quantity.message}</p>
              )}
            </div>
          )}
          <div className='w-full mb-4'>
            <Input
              className='w-full border-2 rounded-md px-2'
              title='Código do produto no fornecedor'
              type='text'
              placeholder='Digite o código do produto...'
              {...register('supplierProductCode')}
            />
            {errors.supplierProductCode && (
              <p className='my-1 text-red-500'>
                {errors.supplierProductCode.message}
              </p>
            )}
          </div>
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
              name='purchaseOrderItemStatus'
              options={purchaseOrderItemStatus.map((status) => ({
                value: status.id ? status.id.toString() : '',
                label: status.name,
              }))}
              register={register}
            />
            {errors.purchaseOrderItemStatus && (
              <p className='my-1 text-red-500'>
                {errors.purchaseOrderItemStatus.message}
              </p>
            )}
          </div>
          <div className='w-full mb-4'>
            <Input
              className='w-full border-2 rounded-md px-2'
              title='Link do produto no site do fornecedor'
              type='text'
              placeholder='Digite o link...'
              {...register('productLink')}
            />
            {errors.productLink && (
              <p className='my-1 text-red-500'>{errors.productLink.message}</p>
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
              {purchaseOrderItemId ? 'Editar' : 'Inserir'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
