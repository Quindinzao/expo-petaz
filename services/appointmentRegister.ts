import { UserProps } from '@/interfaces/UserProps';
import api from './api';

const appointmentRegister = async (
  appointmentTime: string, 
  service: any,
  pet: any
) => {
  return await api.post('/appointments', {
    appointmentTime: appointmentTime,
    service: service,
    pet: pet
  })
};

export default appointmentRegister;