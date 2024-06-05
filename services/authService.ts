// Services
import api from './api';

const authService = async (email: string, password: string) => {
  await api.post('/users/auth', { email: email, password: password })
    .then(response => {
      return response;
    })
    .catch(error => {
      return 'Opa! Parece que seu e-mail ou senha não correspondem d:';
    });
};

export default authService;