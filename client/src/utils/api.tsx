import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
});

export const signUp = (first_name: string, last_name: string, username: string, email: string, password: string) => api.post(
  '/signup', {
    first_name,
    last_name,
    username,
    email, 
    password 
  }
);
export const login = (username: string, password: string) => api.post(
  '/login', { 
    username, 
    password 
  }
);

export const verify = (token: string) => api.get(
  '/verify',
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  },
);