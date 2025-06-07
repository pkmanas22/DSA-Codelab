import { Input } from '../common';
import { Mail, Lock, LogIn, Code2, Target, Trophy } from 'lucide-react';
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
    <div className="min-h-screen bg-base-200 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Main Login Card */}
        <div className="card bg-base-100 shadow-2xl">
          <div className="card-body p-0">
            <div className="flex flex-col lg:flex-row min-h-[600px]">
              {/* Left Side - Login Form */}
              <div className="flex-1 p-8 lg:p-12 flex items-center">
                <div className="w-full max-w-md mx-auto">
                  <div className="text-center mb-8">
                    <div className="p-4 bg-primary/10 rounded-full w-fit mx-auto mb-4">
                      <LogIn className="w-8 h-8 text-primary" />
                    </div>
                    <h2 className="text-3xl font-bold mb-2">Sign In</h2>
                    <p className="text-base-content/60">Continue your coding journey</p>
                  </div>

                  <form onSubmit={handleSubmit(myLoginHandler)} className="space-y-6">
                    <Input
                      {...register('email')}
                      placeHolder="john.doe@gmail.com"
                      icon={Mail}
                      label="Email Address"
                      type="email"
                      classNames={errors.email && 'input-error'}
                      errorMsg={errors.email && errors.email.message}
                    />

                    <Input
                      {...register('password')}
                      placeHolder="Enter your password"
                      icon={Lock}
                      label="Password"
                      type="password"
                      classNames={errors.password && 'input-error'}
                      errorMsg={errors.password && errors.password.message}
                    />

                    <div className="flex items-center justify-between">
                      <label className="label cursor-pointer">
                        <input type="checkbox" className="checkbox checkbox-primary checkbox-sm" />
                        <span className="label-text ml-2">Remember me</span>
                      </label>
                      {/* <a href="#" className="link link-primary text-sm">
                        Forgot password?
                      </a> */}
                    </div>

                    <button
                      disabled={isLoading}
                      type="submit"
                      className={`btn btn-primary w-full gap-2 ${isLoading && 'btn-disabled'}`}
                    >
                      {isLoading && <span className="loading loading-spinner loading-sm"></span>}
                      <LogIn className="w-4 h-4" />
                      Sign In
                    </button>
                  </form>

                  <p className="text-center mt-8 text-base-content/60">
                    Don't have an account?{' '}
                    <a href="/register" className="link link-primary font-medium">
                      Create account
                    </a>
                  </p>
                </div>
              </div>

              {/* Right Side - Hero Content */}
              <div className="rounded-r-2xl flex-1 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 p-8 lg:p-12 flex items-center">
                <div className="max-w-md mx-auto text-center lg:text-left">
                  <div className="p-4 bg-primary/20 rounded-full w-fit mx-auto lg:mx-0 mb-6">
                    <Code2 className="w-12 h-12 text-primary" />
                  </div>

                  <h3 className="text-3xl font-bold mb-4">Master DSA & Ace Your Interviews</h3>

                  <p className="text-lg text-base-content/70 mb-8">
                    Practice with 2,800+ curated problems, from easy arrays to complex dynamic
                    programming. Build the skills top tech companies are looking for.
                  </p>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3 justify-center lg:justify-start">
                      <div className="p-2 bg-success/10 rounded-lg">
                        <Target className="w-5 h-5 text-success" />
                      </div>
                      <span className="font-medium">LeetCode-style problems</span>
                    </div>

                    <div className="flex items-center gap-3 justify-center lg:justify-start">
                      <div className="p-2 bg-info/10 rounded-lg">
                        <Code2 className="w-5 h-5 text-info" />
                      </div>
                      <span className="font-medium">12 programming languages</span>
                    </div>

                    <div className="flex items-center gap-3 justify-center lg:justify-start">
                      <div className="p-2 bg-warning/10 rounded-lg">
                        <Trophy className="w-5 h-5 text-warning" />
                      </div>
                      <span className="font-medium">Weekly contests & rankings</span>
                    </div>
                  </div>

                  <div className="mt-8 p-4 bg-base-100/50 rounded-lg backdrop-blur-sm">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="avatar">
                        <div className="w-10 h-10 rounded-full">
                          <img
                            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face"
                            alt="User"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-medium text-sm">Sarah Chen</div>
                        <div className="text-xs text-base-content/60">
                          Software Engineer @ Google
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-base-content/70 italic">
                      "DSA CodeLab helped me crack FAANG interviews. The problem patterns are
                      spot-on!"
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
