import api from './api';

const getPet = async (
  id: string
) => {
  return await api.get(`/pets/byUser/${id}`);
};

export default getPet;