import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';

import { Input } from '../../../components/input/Input';
import useSupplierRequests from '../hooks/useSupplierRequets';
import { ISupplier } from '../interfaces/SupplierInterface';

const schema = z.object({
  corporateName: z.string().min(1, 'O campo razão social é obrigatório'),
  tradeName: z.string().min(1, 'O campo nome fantasia é obrigatório'),
  cnpj: z.string(),
  email: z.string().email('O campo e-mail é inválido'),
  phone: z.string().refine((value) => /^(\d{10,11})$/.test(value), {
    message: 'O número de celular é inválido',
  }),
  website: z.string(),
});

type FormData = z.infer<typeof schema>;

interface SupplierDetailsProps {
  onCancel: () => void;
  supplierId?: number;
  onSave: () => void;
}

export const SupplierDetails = ({
  onCancel,
  supplierId,
  onSave,
}: SupplierDetailsProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [supplier, setSupplier] = useState<ISupplier>();

  const { getSupplierById, saveSupplier } = useSupplierRequests();

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
    const loadSupplier = async (id: number) => {
      getSupplierById(id)
        .then((supplierLoaded) => {
          if (supplierLoaded) {
            setSupplier(supplierLoaded);
            setValue('corporateName', supplierLoaded.corporateName);
            setValue('tradeName', supplierLoaded.tradeName);
            setValue('cnpj', supplierLoaded.cnpj);
            setValue('email', supplierLoaded.email);
            setValue('phone', supplierLoaded.phone);
            setValue('website', supplierLoaded.website);
          }
        })
        .catch((error) => {
          throw new Error(`Erro ao carregar o fornecedor: ${error}`);
        });
    };

    if (supplierId) {
      loadSupplier(supplierId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [supplierId]);

  const handleCancel = () => {
    setSupplier(undefined);
    reset();
    onCancel();
  };

  function onSubmit(data: FormData) {
    saveSupplier(
      {
        corporateName: data.corporateName,
        tradeName: data.tradeName,
        cnpj: data.cnpj,
        email: data.email,
        phone: data.phone,
        website: data.website,
      },
      supplierId ? supplierId.toString() : undefined,
    )
      .then(() => {
        onSave();
        toast.success('Fornecedor salvo com sucesso!');
        handleCancel();
      })
      .catch((error) => {
        toast.error('Erro ao salvar fornecedor.');
        throw new Error(`Erro ao salvar fornecedor: ${error}`);
      });
  }

  return (
    <div>
      <div className='w-full bg-white p-3 rounded-lg flex flex-col sm:flex-row items-center gap-2 mt-2'>
        <form className='w-full' onSubmit={handleSubmit(onSubmit)}>
          <div className='w-full mb-4'>
            <Input
              className='w-full border-2 rounded-md px-2'
              title='Razão Social'
              type='text'
              placeholder='Digite a razão social do fornecedor...'
              {...register('corporateName')}
            />
            {errors.corporateName && (
              <p className='my-1 text-red-500'>
                {errors.corporateName.message}
              </p>
            )}
          </div>
          <div className='w-full mb-4'>
            <Input
              className='w-full border-2 rounded-md px-2'
              title='Nome Fantasia'
              type='text'
              placeholder='Digite o nome fantasia do fornecedor...'
              {...register('tradeName')}
            />
            {errors.tradeName && (
              <p className='my-1 text-red-500'>{errors.tradeName.message}</p>
            )}
          </div>
          <div className='w-full mb-4'>
            <Input
              className='w-full border-2 rounded-md px-2'
              title='CNPJ'
              type='text'
              placeholder='Digite o CNPJ do fornecedor...'
              {...register('cnpj')}
            />
            {errors.cnpj && (
              <p className='my-1 text-red-500'>{errors.cnpj.message}</p>
            )}
          </div>
          <div className='w-full mb-4'>
            <Input
              className='w-full border-2 rounded-md px-2'
              title='E-mail'
              type='text'
              placeholder='Digite o e-mail do fornecedor...'
              {...register('email')}
            />
            {errors.email && (
              <p className='my-1 text-red-500'>{errors.email.message}</p>
            )}
          </div>
          <div className='w-full mb-4'>
            <Input
              className='w-full border-2 rounded-md px-2'
              title='Telefone'
              type='text'
              placeholder='Digite o telefone do fornecedor...'
              {...register('phone')}
            />
            {errors.phone && (
              <p className='my-1 text-red-500'>{errors.phone.message}</p>
            )}
          </div>
          <div className='w-full mb-4'>
            <Input
              className='w-full border-2 rounded-md px-2'
              title='Site'
              type='text'
              placeholder='Digite o site do fornecedor...'
              {...register('website')}
            />
            {errors.website && (
              <p className='my-1 text-red-500'>{errors.website.message}</p>
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
              {supplierId ? 'Editar' : 'Inserir'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
