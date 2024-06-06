import { UserProps } from '@/interfaces/UserProps';
import api from './api';

const petRegister = async (
  name: string, 
  species: string,
  user: UserProps
) => {
  return await api.post('/pets', {
    name: name,
    species: species, 
    user: user
  })
};

export default petRegister;