// Services
import api from './api';

const userRegister = async (
  name: string, 
  document: string, 
  email: string, 
  password: string
) => {
  return await api.post('/users/register', {
    name: name,
    document: document,
    email: email, 
    password: password 
  })
};

export default userRegister;