import React, { useEffect } from 'react';
import { useAuth } from '../store/AuthContext';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { verify } from '../utils/api';


const Dashboard: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const username = Cookies.get('username');


  useEffect(() => {
    const fetchDashboard = async () => {
      try{
        const session = Cookies.get('session');
        if (session && session != undefined) {
          const response = await verify(session);
          if(response.status != 200){
            destruct();
            navigate('/');
          }
        } else {
          destruct();
          navigate('/');
        }
      } catch {
        destruct();
        navigate('/');
      }
      
    };

    fetchDashboard();
  }, [navigate]);

  const handleLogout = () => {
    logout();
    destruct();
    navigate('/');
  };

  const destruct = () => {
    Cookies.remove('session');
    Cookies.remove('username');
  }

  return (
    <div className="m-10 p-5 bg-gray-50 border border-gray-200 shadow rounded-2xl md:flex md:items-center md:justify-between">
      <div className="min-w-0 flex-1">
        <h2 className="text-2xl/7 font-bold text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          Welcome, {username}!
        </h2>
      </div>
      <div className="mt-4 flex md:ml-4 md:mt-0">
        <button
          type="button"
          onClick={handleLogout}
          className="ml-3 inline-flex items-center rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;