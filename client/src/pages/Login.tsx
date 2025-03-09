import React, { useEffect, useState } from 'react';
import { useAuth } from '../store/AuthContext';
import { login } from '../utils/api';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Login: React.FC = () => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login: authLogin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const session = Cookies.get('session');
    if (session) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsDisabled(true);

    try {
      const response = await login(username, password);
      authLogin(response.data.data);
      Cookies.set('session', response.data.data.token, { expires: 10 });
      Cookies.set('username', response.data.data.username, { expires: 10 });
      navigate('/dashboard');
    } catch (error) {
      if(error.response.data.message){
        setError(error.response.data.message);
      } else {
        setError(error.response.data);
      }
    } finally {
      setIsDisabled(false);
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-sm space-y-10">
          <div>
            <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>
          <form onSubmit={handleSubmit} method="POST" className="space-y-6">
            <div>
              <div className="col-span-2">
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  placeholder="Username"
                  autoComplete="username"
                  onChange={(e) => setUsername(e.target.value)}
                  aria-label="Username"
                  className="block w-full rounded-t-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:relative focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-slate-600 sm:text-sm/6"
                />
              </div>
              <div className="-mt-px">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  placeholder="Password"
                  autoComplete="current-password"
                  onChange={(e) => setPassword(e.target.value)}
                  aria-label="Password"
                  className="block w-full rounded-b-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:relative focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-slate-600 sm:text-sm/6"
                />
              </div>

              {error && <p className="text-red-500 my-3 text-sm font-bold tracking-tight">{error}</p>}
            </div>


            <div>
              <button
                disabled={isDisabled}
                type="submit"
                className="flex w-full justify-center rounded-md bg-slate-600 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-slate-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600"
              >
                {isDisabled ? 'Signing In...' : 'Sign In'}
              </button>
            </div>
          </form>

          <p className="text-center text-sm/6 text-gray-500">
            Not a member?{' '}
            <a href="/signup" className="font-semibold text-slate-600 hover:text-slate-500">
              Create an account
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;