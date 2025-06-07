import { Lock, Mail, User, UserPlus, Code2, Target, Trophy, BookOpen } from 'lucide-react';
import { Input } from '../common';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthRegister } from '../../hooks/reactQuery/useAuthApi';
import { useAuthStore } from '../../stores/useAuthStore';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { zodRegisterSchema } from '../../utils/zodSchema';

const Register = () => {
  const { mutate: registerUser, isLoading } = useAuthRegister();
  const { setAuth } = useAuthStore();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(zodRegisterSchema),
  });

  const myRegisterHandler = (data) => {
    registerUser(data, {
      onSuccess: (res) => {
        toast.success(res?.message || 'Registration successful');
        setAuth({ user: res?.data });
        navigate('/problems');
      },
      onError: (err) => {
        toast.error(err.response.data?.error || 'Something went wrong');
      },
    });
  };

  return (
    <div className="min-h-screen bg-base-200 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Main Register Card */}
        <div className="card bg-base-100 shadow-2xl">
          <div className="card-body p-0">
            <div className="flex flex-col lg:flex-row-reverse min-h-[600px]">
              {/* Left Side - Register Form */}
              <div className="flex-1 p-8 lg:p-12 flex items-center">
                <div className="w-full max-w-md mx-auto">
                  <div className="text-center mb-8">
                    <div className="p-4 bg-primary/10 rounded-full w-fit mx-auto mb-4">
                      <UserPlus className="w-8 h-8 text-primary" />
                    </div>
                    <h2 className="text-3xl font-bold mb-2">Create Account</h2>
                    <p className="text-base-content/60">Start your coding journey today</p>
                  </div>

                  <form onSubmit={handleSubmit(myRegisterHandler)} className="space-y-6">
                    <Input
                      {...register('name')}
                      placeHolder="John Doe"
                      icon={User}
                      label="Full Name"
                      type="text"
                      classNames={errors.name && 'input-error'}
                      errorMsg={errors.name && errors.name.message}
                    />

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
                      placeHolder="Create a strong password"
                      icon={Lock}
                      label="Password"
                      type="password"
                      classNames={errors.password && 'input-error'}
                      errorMsg={errors.password && errors.password.message}
                    />

                    <div className="flex items-center">
                      <label className="label cursor-pointer">
                        <input
                          type="checkbox"
                          className="checkbox checkbox-primary checkbox-sm"
                          required
                        />
                        <span className="label-text ml-2">
                          I agree to the{' '}
                          <a href="#" className="link link-primary">
                            Terms of Service
                          </a>{' '}
                          and{' '}
                          <a href="#" className="link link-primary">
                            Privacy Policy
                          </a>
                        </span>
                      </label>
                    </div>

                    <button
                      disabled={isLoading}
                      type="submit"
                      className={`btn btn-primary w-full gap-2 ${isLoading && 'btn-disabled'}`}
                    >
                      {isLoading && <span className="loading loading-spinner loading-sm"></span>}
                      <UserPlus className="w-4 h-4" />
                      Create Account
                    </button>
                  </form>

                  <p className="text-center mt-8 text-base-content/60">
                    Already have an account?{' '}
                    <Link to="/login" className="link link-primary font-medium">
                      Sign in
                    </Link>
                  </p>
                </div>
              </div>

              {/* Right Side - Hero Content */}
              <div className="flex-1 bg-gradient-to-br from-secondary/10 via-primary/5 to-success/10 p-8 lg:p-12 flex items-center">
                <div className="max-w-md mx-auto text-center lg:text-left">
                  <div className="p-4 bg-secondary/20 rounded-full w-fit mx-auto lg:mx-0 mb-6">
                    <BookOpen className="w-12 h-12 text-secondary" />
                  </div>

                  <h3 className="text-3xl font-bold mb-4">Join 100,000+ Developers</h3>

                  <p className="text-lg text-base-content/70 mb-8">
                    Start your journey to mastering Data Structures & Algorithms. Practice with our
                    comprehensive collection of problems and land your dream job.
                  </p>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3 justify-center lg:justify-start">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Code2 className="w-5 h-5 text-primary" />
                      </div>
                      <span className="font-medium">2,800+ coding problems</span>
                    </div>

                    <div className="flex items-center gap-3 justify-center lg:justify-start">
                      <div className="p-2 bg-info/10 rounded-lg">
                        <Target className="w-5 h-5 text-info" />
                      </div>
                      <span className="font-medium">Interview-focused content</span>
                    </div>

                    <div className="flex items-center gap-3 justify-center lg:justify-start">
                      <div className="p-2 bg-success/10 rounded-lg">
                        <Trophy className="w-5 h-5 text-success" />
                      </div>
                      <span className="font-medium">Progress tracking & badges</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mt-8">
                    <div className="text-center p-3 bg-base-100/50 rounded-lg backdrop-blur-sm">
                      <div className="text-2xl font-bold text-primary">95%</div>
                      <div className="text-xs text-base-content/60">Success Rate</div>
                    </div>
                    <div className="text-center p-3 bg-base-100/50 rounded-lg backdrop-blur-sm">
                      <div className="text-2xl font-bold text-secondary">12</div>
                      <div className="text-xs text-base-content/60">Languages</div>
                    </div>
                    <div className="text-center p-3 bg-base-100/50 rounded-lg backdrop-blur-sm">
                      <div className="text-2xl font-bold text-success">24/7</div>
                      <div className="text-xs text-base-content/60">Support</div>
                    </div>
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

export default Register;
