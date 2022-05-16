import useSWR from 'swr';

const swr = ({ url, params }) => {
  const { data, error, mutate } = useSWR({
    url,
    // params: {params: {...params}},
    params,
  });

  return {
    data,
    mutate,
    isError: error,
    isLoading: !error && !data,
  };
};

export default swr;
