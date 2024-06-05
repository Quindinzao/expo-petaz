// Services
import api from './api';

const authService = async (email: string, password: string) => {
  await api.post('/users/auth', { email: email, password: password })
};

export default authService;