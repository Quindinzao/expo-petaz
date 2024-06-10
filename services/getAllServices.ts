import api from './api';

const getServicesByDoc = async () => {
  return await api.get('/services/all-services');
};

export default getServicesByDoc;