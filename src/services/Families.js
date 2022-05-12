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
  // const { data, error } = useSWR('/families/with/members');
  // console.log('data :', data);
  // return { data, error };
};

// export function useListAllFamiliesWithMembers() {
//   const { data, error } = useSWR(`/families/with/members`);

//   return {
//     user: data,
//     isLoading: !error && !data,
//     isError: error,
//   };
// }

export const createFamilyWithMembers = async (data) => {
  try {
    const res = await api.post('/families/with/members', data);
    return res;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
};
