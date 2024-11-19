import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

import { Input } from '../../../components/input/Input';
import Select from '../../../components/select/Select';
import useProductRequests from '../../product/hooks/useProductRequests';
import { IProduct } from '../../product/interfaces/ProductInterface';
import useProductVariationRequests from '../../product/product-variation/hooks/useProductVariationRequests';
import { IProductVariation } from '../../product/product-variation/interfaces/ProductVariationInterface';
import useSupplierRequests from '../../supplier/hooks/useSupplierRequets';
import { ISupplier } from '../../supplier/interfaces/SupplierInterface';
import useIntegrationProductSupplierErpRequests from '../hooks/useIntegrationProductSupplierErpRequests';
import { IIntegrationProductSupplier } from '../interfaces/IntegrationProductSupplierErpInterface';

const schema = z.object({
  product: z.string().min(1, 'Selecione um produto'),
  productVariation: z
    .string({
      // eslint-disable-next-line camelcase
      required_error: 'Selecione uma variação',
      // eslint-disable-next-line camelcase
      invalid_type_error: 'Selecione uma variação',
    })
    .min(1, 'Selecione uma variação'),
  supplierId: z.string().min(1, 'O campo fornecedor é obrigatório'),
  supplierPrice: z.preprocess(
    (value) => Number(value),
    z
      .number({ message: 'O campo preço de custo deve ser um número' })
      .positive({
        message: 'O campo preço de custo deve ser um número positivo',
      }),
  ),
  supplierProductCode: z
    .string()
    .min(1, 'O campo Código do fornecedor é obrigatório'),
  inStockInTheSupplier: z
    .string()
    .min(1, 'O campo estoque no fornecedor é obrigatório'),
  supplierProductLink: z
    .string()
    .refine((value) => !value || z.string().url().safeParse(value).success, {
      message: 'O campo link deve ser uma URL válida',
    })
    .optional(),
  blingProductId: z.preprocess(
    (value) => Number(value),
    z.number({
      message: 'O campo id do produto no Bling deve ser um número',
    }),
  ),
});

type FormData = z.infer<typeof schema>;

interface IntegrationProductSupplierErpDetailsProps {
  onCancel?: () => void;
  integrationProductSupplierErpId?: number;
  onSave?: () => void;
}

export const IntegrationProductSupplierErpDetails = ({
  onCancel,
  integrationProductSupplierErpId,
  onSave,
}: IntegrationProductSupplierErpDetailsProps) => {
  const {
    getIntegrationProductSupplierErpById,
    saveIntegrationProductSupplierErp,
  } = useIntegrationProductSupplierErpRequests();
  const [integrationProductSupplierErp, setIntegrationProductSupplierErp] =
    useState<IIntegrationProductSupplier>();

  const [products, setProducts] = useState<IProduct[]>([]);
  const { getProducts } = useProductRequests();

  const [productVariations, setProductVariations] = useState<
    IProductVariation[]
  >([]);
  const { getProductVariations } = useProductVariationRequests();

  const [suppliers, setSuppliers] = useState<ISupplier[]>([]);
  const { getSuppliers } = useSupplierRequests();

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
  const productVariationId = watch('productVariation');

  const memoizedGetProducts = useCallback(getProducts, [getProducts]);

  const memoizedGetSuppliers = useCallback(getSuppliers, [getSuppliers]);

  useEffect(() => {
    const loadProductVariations = async () => {
      if (productId && productId !== '') {
        const response = await getProductVariations(parseInt(productId));
        setProductVariations(response);
      }
    };

    loadProductVariations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  useEffect(() => {
    const loadProducts = async () => {
      const productsData = await memoizedGetProducts();
      setProducts(productsData);
    };

    if (products.length === 0) {
      loadProducts();
    }
  }, [memoizedGetProducts, products.length]);

  useEffect(() => {
    const loadSuppliers = async () => {
      const suppliersData = await memoizedGetSuppliers();
      setSuppliers(suppliersData);
    };

    if (suppliers.length === 0) {
      loadSuppliers();
    }
  }, [memoizedGetProducts, memoizedGetSuppliers, suppliers.length]);

  useEffect(() => {
    if (integrationProductSupplierErpId && !integrationProductSupplierErp) {
      const loadData = async () => {
        const integrationProductSupplierErpData:
          | IIntegrationProductSupplier
          | undefined = await getIntegrationProductSupplierErpById(
          integrationProductSupplierErpId,
        );

        if (integrationProductSupplierErpData) {
          setIntegrationProductSupplierErp(integrationProductSupplierErpData);
          setValue(
            'product',
            integrationProductSupplierErpData.product.id.toString(),
          );
          setValue(
            'productVariation',
            integrationProductSupplierErpData.productVariation.id?.toString() ||
              '',
          );
          if (integrationProductSupplierErpData?.supplier) {
            setValue(
              'supplierId',
              integrationProductSupplierErpData.supplier.id?.toString(),
            );
          }
          setValue(
            'supplierPrice',
            integrationProductSupplierErpData.supplierPrice,
          );
          setValue(
            'supplierProductCode',
            integrationProductSupplierErpData.supplierProductCode,
          );
          setValue(
            'inStockInTheSupplier',
            integrationProductSupplierErpData.inStockInTheSupplier ? '1' : '0',
          );
          if (integrationProductSupplierErpData.supplierProductLink) {
            setValue(
              'supplierProductLink',
              integrationProductSupplierErpData.supplierProductLink,
            );
          }
          if (integrationProductSupplierErpData.blingProductId) {
            setValue(
              'blingProductId',
              integrationProductSupplierErpData.blingProductId,
            );
          }
        }
      };
      loadData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [integrationProductSupplierErpId]);

  function onSubmit(data: FormData) {
    saveIntegrationProductSupplierErp(
      {
        productId: parseInt(productId),
        productVariationId: parseInt(productVariationId),
        supplierId: parseInt(data.supplierId),
        supplierPrice: data.supplierPrice,
        supplierProductCode: data.supplierProductCode,
        inStockInTheSupplier: Boolean(Number(data.inStockInTheSupplier)),
        supplierProductLink: data.supplierProductLink || undefined,
        blingProductId: data.blingProductId || undefined,
      },
      integrationProductSupplierErp?.id.toString() || undefined,
    )
      .then((response) => {
        if (response) {
          onSave?.();
          handleCancel();
          toast.success('Código de produto do fornecedor salvo com sucesso!');
          reset();
        } else {
          toast.error('Erro ao salvar o código de produto do fornecedor!');
        }
      })
      .catch((error) => {
        throw new Error(`Erro ao salvar o código de produto: ${error}`);
      });
  }

  const handleCancel = () => {
    setIntegrationProductSupplierErp(undefined);
    setProducts([]);
    setProductVariations([]);
    reset();
    onCancel?.();
  };

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
            <Select
              className='w-full border-2 rounded-md mb-4 px-2'
              title='Fornecedor'
              name='supplierId'
              options={suppliers.map((supplier) => ({
                value: supplier.id ? supplier.id.toString() : '',
                label: supplier.tradeName,
              }))}
              register={register}
            />
            {errors.supplierId && (
              <p className='my-1 text-red-500'>{errors.supplierId.message}</p>
            )}
          </div>
          <div className='w-full mb-4'>
            <Input
              className='w-full border-2 rounded-md px-2'
              title='Preço de custo'
              type='number'
              step='0.01'
              placeholder='Digite o preço de custo...'
              {...register('supplierPrice', { valueAsNumber: true })}
            />
            {errors.supplierPrice && (
              <p className='my-1 text-red-500'>
                {errors.supplierPrice.message}
              </p>
            )}
          </div>
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
            <Select
              className='w-full border-2 rounded-md mb-4 px-2'
              title='Estoque'
              name='inStockInTheSupplier'
              options={[
                { value: 0, label: 'Não' },
                { value: 1, label: 'Sim' },
              ]}
              register={register}
            />
            {errors.inStockInTheSupplier && (
              <p className='my-1 text-red-500'>
                {errors.inStockInTheSupplier.message}
              </p>
            )}
          </div>
          <div className='w-full mb-4'>
            <Input
              className='w-full border-2 rounded-md px-2'
              title='Id do produto no Bling'
              type='number'
              placeholder='Digite o id do produto no Bling...'
              {...register('blingProductId', { valueAsNumber: true })}
            />
            {errors.blingProductId && (
              <p className='my-1 text-red-500'>
                {errors.blingProductId.message}
              </p>
            )}
          </div>
          <div className='w-full mb-4'>
            <Input
              className='w-full border-2 rounded-md px-2'
              title='Link do produto'
              type='text'
              placeholder='Digite o link do produto...'
              {...register('supplierProductLink')}
            />
            {errors.supplierProductLink && (
              <p className='my-1 text-red-500'>
                {errors.supplierProductLink.message}
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
              {integrationProductSupplierErpId ? 'Editar' : 'Inserir'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
