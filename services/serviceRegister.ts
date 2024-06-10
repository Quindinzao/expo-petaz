import { UserProps } from '@/interfaces/UserProps';
import api from './api';

const serviceRegister = async (
  title: string, 
  description: string,
  user: UserProps
) => {
  return await api.post('/services', {
    title: title,
    description: description, 
    user: user
  })
};

export default serviceRegister;