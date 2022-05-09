import api from './api';

export const createNewMember = async (member) => {
  //   if (!member.name) {
  //     throw new Error('Nome vazio');
  //   }
  try {
    const res = await api.post('/members', member);
    return res;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
};

export const updateMember = async (member) => {
  try {
    const res = await api.patch(`/members/${member.id}`, {
      ...member,
      qwe: 'qweqwe',
    });
    return res;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
};

export const deleteMember = async (id) => {
  try {
    const res = await api.delete(`/members/${id}`);
    return res;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
};

export const listAllMembers = async () => {
  const res = await api.get(`/members`);
  return res;
};
// export { createNewMember };
