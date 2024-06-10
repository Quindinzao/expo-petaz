// Services
import api from './api';

const authService = async (email: string, password: string) => {
  return await api.post('/users/auth', { email: email, password: password })
};

export default authService;