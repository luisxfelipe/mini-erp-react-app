import { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';

import { Input } from '../../../components/input/Input';
import { AuthContext } from '../../../contexts/authContext';
import { ERROR_NETWORK_ERROR } from '../../../shared/constants/errorsStatus';
import { signOut } from '../../../shared/functions/connection/auth';

const schema = z.object({
  email: z
    .string()
    .email('Insira um e-mail válido')
    .min(1, 'O campo e-mail é obrigatório'),
  password: z.string().min(1, 'O campo senha é obrigatório'),
});

type FormData = z.infer<typeof schema>;

export const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  });

  const { setUser, signIn } = useContext(AuthContext);

  useEffect(() => {
    async function handleLogout() {
      setUser(null);
      await signOut();
    }

    handleLogout();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function onSubmit(data: FormData) {
    signIn(data)
      .then(() => {
        navigate('/');
      })
      .catch((error: Error) => {
        if (error.message === ERROR_NETWORK_ERROR) {
          toast.error(
            'Não foi possível se conectar ao servidor, tente novamente mais tarde.',
          );
        } else {
          toast.error('Erro desconhecido, tente novamente mais tarde.');
        }
      });
  }

  return (
    <div className='w-full min-h-screen flex justify-center items-center flex-col gap-4'>
      <h1 className='font-bold'>Mini - ERP</h1>
      <form
        className='bg-white max-w-xl w-full rounded-lg p-4'
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className='mb-3'>
          <Input
            title='E-mail'
            type='email'
            placeholder='Digite seu e-mail...'
            error={errors.email?.message}
            {...register('email')}
          />
        </div>

        <div className='mb-3'>
          <Input
            title='Senha'
            type='password'
            placeholder='Digite sua senha...'
            error={errors.password?.message}
            {...register('password')}
          />
        </div>

        <button
          type='submit'
          className='bg-zinc-900 w-full rounded-md text-white h-10 font-medium'
        >
          Acessar
        </button>
      </form>
    </div>
  );
};
