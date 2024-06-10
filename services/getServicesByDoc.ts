import api from './api';

const getServicesByDoc = async (
  doc: string
) => {
  return await api.get(`/services/byUser/${doc}`);
};

export default getServicesByDoc;