import { UserProps } from '@/interfaces/UserProps';
import api from './api';

const petRegister = (
  name: string, 
  species: string,
  user: UserProps
) => {
  api.post('/pets', {
    name: name,
    species: species, 
    user: user
    // name: "Shaya",
    // species: "Dog",
    // user: {
    //   id: 1,
    //   document: "77777777777",
    //   name: "Gio",
    //   ëmail: "gio@email.com"
    // }
  })
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.error(error.message);

      return 'Opa!';
    });
};

export default petRegister;