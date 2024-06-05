// Services
import api from './api';

const userRegister = (
  name: string, 
  document: string, 
  email: string, 
  password: string
) => {
  return api.post('/users/register', {
    name: name,
    document: document,
    email: email, 
    password: password 
  })
};

export default userRegister;