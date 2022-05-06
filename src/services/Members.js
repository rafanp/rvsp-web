import api from './api';

export const createNewMember = async (member) => {
  //   if (!member.name) {
  //     throw new Error('Nome vazio');
  //   }
  //   try {
  const res = await api.post('/members', member);
  return res;
  //   } catch (err) {
  //     console.log('Erro >> ', err);
  //     throw new Error(err.message);
  //   }
};

// export { createNewMember };
