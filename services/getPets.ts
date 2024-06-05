import { UserProps } from '@/interfaces/UserProps';
import api from './api';

const getPet = (
  id: string
) => {
  api.get(`/pets/byUser/${id}`)
    .then(response => {
      console.log('pets: ', response.data);
      return response.data;
    })
    .catch(error => {
      console.error(error.message);

      return 'Opa!';
    });
};

export default getPet;