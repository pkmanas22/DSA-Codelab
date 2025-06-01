import React from 'react';
import Input from '../common/Input';
import { Mail, Lock } from 'lucide-react';

const Login = () => {
  return (
    <div className="hero bg-base-200 min-h-[80vh]">
      <div className="hero-content flex-col lg:flex-row w-full">
        <div className="w-full lg:w-1/2 flex justify-center">
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
              <fieldset className="fieldset">
                <form>
                  <Input placeHolder="john.doe@gmail.com" icon={Mail} label="Email" type="email" />
                  <Input placeHolder="******" icon={Lock} label="Password" type="password" />
                </form>
                <div>
                  <a className="link link-hover">Forgot password?</a>
                </div>
                <button type="submit" className="btn btn-neutral mt-4">
                  Login
                </button>
                <p className="text-center">
                  Don't have an account?{' '}
                  <a href="/register" className="link link-hover">
                    Register now
                  </a>
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
