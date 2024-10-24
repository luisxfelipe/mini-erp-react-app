import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';

import { Input } from '../../../components/input/Input';
import Select from '../../../components/select/Select';
import { IProduct } from '../../product/interfaces/ProductInterface';
import {
    IProductVariation
} from '../../product/product-variation/interfaces/ProductVariationInterface';
import {
    IPurchaseOrderItem
} from '../../purchase-order/purchase-order-item/interfaces/PurchaseOrderItemInterface';
import useStockItemRequests from '../hooks/useStockItemRequests';
import { IStockItemInsert } from '../interfaces/StockItemInsertInterface';
import useStockItemIdentifierTypeRequests from '../stock-item-identifier-type/hooks/useStockItemIdentifierTypeRequests';
import {
    IStockItemIdentifierType
} from '../stock-item-identifier-type/interfaces/StockItemIdentifierTypeInterface';

const schema = z.object({
  identifier: z.string(),
  identifierType: z.string(),
});

interface StockItemReviewProps {
  purchaseOrderItems: IPurchaseOrderItem[];
  onCancel: () => void;
  onSave: () => void;
}

export const StockItemReview = ({
  purchaseOrderItems,
  onCancel,
  onSave,
}: StockItemReviewProps) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    setValue,
  } = useForm({
    resolver: zodResolver(schema),
  });
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [stockItems, setStockItems] = useState<IStockItemInsert[]>([]);
  const { createStockItems } = useStockItemRequests();

  const [stockItemIdentifierTypes, setStockItemIdentifierTypes] = useState<
    IStockItemIdentifierType[]
  >([]);
  const { getStockItemIdentifierTypes } = useStockItemIdentifierTypeRequests();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadStockItemIdentifierTypes = async () => {
      setIsLoading(true);
      const response = await getStockItemIdentifierTypes();
      setStockItemIdentifierTypes(response);
      setIsLoading(false);
    };

    if (isLoading) {
      loadStockItemIdentifierTypes();
    }
  }, [getStockItemIdentifierTypes]);

  const transformPurchaseOrderItemToStockItem = (
    purchaseOrderItem: IPurchaseOrderItem,
    identifier: string,
    identifierType: number,
  ) => {
    const stockItem: IStockItemInsert = {
      purchaseOrderItemId: purchaseOrderItem.id,
      product: purchaseOrderItem.product,
      productVariation: purchaseOrderItem.productVariation,
      stockItemStatusId: 1, // default status
      identifier,
      identifierTypeId: identifierType,
    };
    return stockItem;
  };

  const handleNext = async () => {
    const identifier = watch('identifier');
    const identifierType = watch('identifierType');
    const purchaseOrderItem = purchaseOrderItems[currentItemIndex];
    const stockItem = transformPurchaseOrderItemToStockItem(
      purchaseOrderItem,
      identifier,
      identifierType,
    );

    if (currentItemIndex < purchaseOrderItems.length - 1) {
      await setStockItems((prevStockItems) => [...prevStockItems, stockItem]);

      setCurrentItemIndex((prevIndex) => prevIndex + 1);
      setValue('identifier', '');
      setValue('identifierType', '');
    } else {
      const items: IStockItemInsert[] = [...stockItems, stockItem];

      createStockItems(items)
        .then(() => {
          onSave();
          onCancel();
          toast.success('Itens lançados no estoque com sucesso!');
        })
        .catch((error) => {
          throw new Error(
            `Erro ao salvar ao lançar os itens no estoque: ${error}`,
          );
        });
    }
  };

  const currentItem = purchaseOrderItems[currentItemIndex];

  if (!currentItem) {
    return <div>Item não encontrado</div>;
  }

  return (
    <div>
      <div className='w-full bg-white p-3 rounded-lg flex flex-col sm:flex-row items-center gap-2 mt-2'>
        <form className='w-full' onSubmit={handleSubmit(handleNext)}>
          <div className='w-full mb-4'>
            <h2>
              Item {currentItemIndex + 1} de {purchaseOrderItems.length}
            </h2>
          </div>
          <div className='w-full mb-4'>
            <p>Produto: {purchaseOrderItems[currentItemIndex].product.name}</p>
          </div>
          <div className='w-full mb-4'>
            <p>
              Variante:{' '}
              {purchaseOrderItems[currentItemIndex].productVariation.name}
            </p>
          </div>
          <div className='w-full mb-4'>
            <Select
              className='w-full border-2 rounded-md mb-2 px-2'
              title='Tipo de identificador'
              name='identifierType'
              options={stockItemIdentifierTypes.map((identifierType) => ({
                value: identifierType.id ? identifierType.id.toString() : '',
                label: identifierType.name,
              }))}
              register={register}
            />
            {errors.identifierType && (
              <p className='my-1 text-red-500'>
                {typeof errors.identifierType.message === 'string'
                  ? errors.identifierType.message
                  : ''}
              </p>
            )}
          </div>
          <div className='w-full mb-4'>
            <Input
              className='w-full border-2 rounded-md px-2'
              title='Identificador'
              type='text'
              placeholder='Digite o identificador...'
              {...register('identifier')}
            />
            {errors.identifier && (
              <p className='my-1 text-red-500'>
                {typeof errors.identifier.message === 'string'
                  ? errors.identifier.message
                  : ''}
              </p>
            )}
          </div>
          <div className='w-96 flex flex-row float-end'>
            <button
              className='w-full ml-2 rounded-md border-2 border-solid '
              type='button'
              style={{ color: '#001529' }}
              color='white'
              onClick={onCancel}
            >
              Cancelar
            </button>
            <button
              className='w-full ml-2 rounded-md text-white'
              type='submit'
              style={{ backgroundColor: '#001529' }}
              color='white'
            >
              {stockItems.length < purchaseOrderItems.length - 1
                ? 'Próximo'
                : 'Salvar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
