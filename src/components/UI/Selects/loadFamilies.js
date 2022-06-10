import { listAllFamilies } from '@/services/Families';

const loadFamilies = async (props) => {
  const { search, page } = props;

  const pageableDTO = {
    page: page || null,
    pageSize: 10,
    search: search || null,
  };

  const { data } = await listAllFamilies(pageableDTO);

  const {
    data: families,
    lastPage,
    nextPage,
    prevPage,
    currentPage,
    count,
  } = data;

  const hasMore = currentPage < lastPage;

  return {
    options: families,
    hasMore,
    lastPage,
    nextPage,
    prevPage,
    currentPage,
    count,
  };
};

export default loadFamilies;
