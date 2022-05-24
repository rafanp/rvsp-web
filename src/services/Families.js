import api from './api';

export const listAllFamilies = async ({ page, pageSize, search }) => {
  const pageableDTO = {
    page,
    pageSize,
    search,
  };
  try {
    const res = await api.get('/families', { params: { ...pageableDTO } });
    return res;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
};

export const listAllFamiliesWithMembers = async () => {
  const res = await api.get('/families/with/members');
  return res;
};

export const createFamilyWithMembers = async (data) => {
  try {
    const res = await api.post('/families/with/members', data);
    return res;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
};
