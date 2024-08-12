import { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';

import { Input } from '../../components/input/Input';
import { AuthContext } from '../../contexts/authContext';

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

  const { signIn, signOut } = useContext(AuthContext);

  useEffect(() => {
    async function handleLogout() {
      await signOut();
    }

    handleLogout();
  }, []);

  function onSubmit(data: FormData) {
    signIn(data)
      .then(() => {
        navigate('/');
      })
      .catch(() => {
        alert('Usuário ou senha inválidos');
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
            type='email'
            placeholder='Digite seu e-mail...'
            name='email'
            error={errors.email?.message}
            register={register}
          />
        </div>

        <div className='mb-3'>
          <Input
            type='password'
            placeholder='Digite sua senha...'
            name='password'
            error={errors.password?.message}
            register={register}
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
