import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const client = axios.create({ baseURL: API_BASE });

// Attach JWT automatically
client.interceptors.request.use(config => {
  const token = localStorage.getItem('astrogem_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Auth
export const apiRegister = (name: string, email: string, password: string) =>
  client.post('/api/auth/register', { name, email, password });

export const apiLogin = (email: string, password: string) =>
  client.post('/api/auth/login', { email, password });

// Gemstones
export const apiGetGemstones = () =>
  client.get('/api/gemstones');

export const apiRecommend = (data: {
  name: string; day: number; month: number; year: number; focus: string;
}) => client.post('/api/gemstones/recommend', data);

export const apiCompatibility = (gem1Id: string, gem2Id: string) =>
  client.post('/api/gemstones/compatibility', { gem1Id, gem2Id });

export default client;
