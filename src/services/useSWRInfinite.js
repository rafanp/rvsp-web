import { useEffect, useState } from 'react';
import swrInfinite from 'swr/infinite';

const getKey = (pageIndex, previousPageData, url, params) => {
  if (
    previousPageData &&
    previousPageData.currentPage > previousPageData.lastPage
  )
    return null;
  // if (previousPageData && !previousPageData.length) return null; // reached the end
  return {
    url,
    params: { page: pageIndex, pageSize: params.pageSize },
  }; // SWR key
};

const useSWRInfinite = ({ url, params }) => {
  const [groupedData, setGroupedData] = useState([]);

  const { data, error, size, setSize, isValidating, mutate } = swrInfinite(
    (pageIndex, previousPageData) =>
      getKey(pageIndex, previousPageData, url, params)
  );

  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === 'undefined');
  const isEmpty = data?.[0]?.data.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.data.length < params.pageSize);

  const isRefreshing = isValidating && data && data.length === size;

  useEffect(() => {
    if (data) {
      let newData = [];
      data.map((item) => {
        newData = [...newData, ...item.data];
      });
      setGroupedData(newData);
    }
  }, [data]);

  return {
    data,
    groupedData,
    error,
    size,
    setSize,
    isValidating,
    mutate,
    // isError: error,
    // isLoading: !error && !data,
    isLoadingInitialData,
    isLoadingMore,
    isEmpty,
    isReachingEnd,
    isRefreshing,
  };
};

export default useSWRInfinite;
