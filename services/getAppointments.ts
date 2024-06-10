import api from './api';

const getAppointments = async (
  id: string | number,
  doc: string
) => {
  return await api.get(doc.length === 11 ? `/appointments/byUserCPF/${id}` : `/appointments/byUserCNPJ/${id}`);
};

export default getAppointments;