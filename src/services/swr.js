import useSWR from 'swr';

// // const fetcher = (...args) => fetch(...args).then((res) => res.json());

// import api from './api';

// const fetcher = (url) => api.get(url).then((res) => res.data);

const swr = (domain) => {
  const { data, error, mutate } = useSWR(`${domain}`);
  return {
    data,
    mutate,
    isError: error,
    isLoading: !error && !data,
  };
};

export default swr;
