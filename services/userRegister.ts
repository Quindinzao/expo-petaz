// Services
import api from './api';

const userRegister = (
  name: string, 
  document: string, 
  email: string, 
  password: string
) => {
  api.post('/users/register', {
    name: name,
    document: document,
    email: email, 
    password: password 
  })
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.error(error.message);

      return 'Opa!';
    });
};

export default userRegister;