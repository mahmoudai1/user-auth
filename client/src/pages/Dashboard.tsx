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
          }
        } else {
          destruct();
        }
      } catch {
        destruct();
      }
    };
    fetchDashboard();
  });

  const handleLogout = () => {
    logout();
    destruct();
  };

  const destruct = () => {
    Cookies.remove('session');
    Cookies.remove('username');
    navigate('/');
  }

  return (
    <div className="p-5 m-10 border border-gray-200 shadow bg-gray-50 rounded-2xl md:flex md:items-center md:justify-between">
      <div className="flex-1 min-w-0">
        <h2 className="font-bold text-gray-900 text-2xl/7 sm:truncate sm:text-3xl sm:tracking-tight">
          Welcome, {username}!
        </h2>
      </div>
      <div className="flex mt-4 md:ml-4 md:mt-0">
        <button
          type="button"
          onClick={handleLogout}
          className="inline-flex items-center px-3 py-2 ml-3 text-sm font-semibold text-white bg-red-500 rounded-md shadow-sm hover:bg-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;