// Services
import api from './api';

const authService = (email: string, password: string) => {
  return api.post('/users/auth', { email: email, password: password })
};

export default authService;