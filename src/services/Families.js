import api from './api';

export const listAllFamilies = async () => {
  try {
    const res = await api.get('/families');
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
