import { Input } from '../common';
import { Mail, Lock } from 'lucide-react';
import { useAuthLogin } from '../../hooks/reactQuery/useAuthApi';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { zodLoginSchema } from '../../utils/zodSchema';
import { useAuthStore } from '../../stores/useAuthStore';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const { mutate: loginUser, isLoading } = useAuthLogin();
  const { setAuth } = useAuthStore();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(zodLoginSchema),
  });

  const myLoginHandler = (data) => {
    loginUser(data, {
      onSuccess: (res) => {
        // console.log(res);
        toast.success(res?.message || 'Login successful');
        setAuth({ user: res?.data });
        navigate('/problems');
      },
      onError: (err) => {
        // console.log(err);
        toast.error(err.response.data?.error || 'Something went wrong');
      },
    });
  };

  return (
    <div className="hero rounded-lg shadow-lg bg-base-200 min-h-[80vh]">
      <div className="hero-content flex-col lg:flex-row w-full">
        <div className="w-full lg:w-1/2 flex justify-center">
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
              <fieldset className="fieldset">
                <form className="form-control" onSubmit={handleSubmit(myLoginHandler)}>
                  <Input
                    {...register('email')}
                    placeHolder="john.doe@gmail.com"
                    icon={Mail}
                    label="Email"
                    type="email"
                    classNames={errors.email && 'input-error'}
                    errorMsg={errors.email && errors.email.message}
                  />
                  <Input
                    {...register('password')}
                    placeHolder="******"
                    icon={Lock}
                    label="Password"
                    type="password"
                    classNames={errors.password && 'input-error'}
                    errorMsg={errors.password && errors.password.message}
                  />

                  <button
                    disabled={isLoading}
                    type="submit"
                    className={`btn btn-neutral mt-4 block mx-auto ${isLoading && 'btn-disabled'}`}
                  >
                    {isLoading && <span className="loading loading-spinner loading-xs mr-2"></span>}
                    Login
                  </button>
                </form>
                <p className="text-center">
                  Don't have an account?{' '}
                  <Link to="/register" className="link link-hover">
                    Register now
                  </Link>
                </p>
              </fieldset>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nulla, error nihil ipsa
            dolores, nam impedit voluptate ab nesciunt debitis perferendis inventore! Assumenda
            magnam sunt sequi.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
