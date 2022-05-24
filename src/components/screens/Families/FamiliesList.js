import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FamiliesTable from './FamiliesTable';
import useSWRInfinite from 'swr/infinite';
import InfiniteScroll from 'react-infinite-scroll-component';

const PAGE_SIZE = 10;

const getKey = (pageIndex, previousPageData) => {
  if (
    previousPageData &&
    previousPageData.currentPage > previousPageData.lastPage
  )
    return null;
  // if (previousPageData && !previousPageData.length) return null; // reached the end
  return {
    url: `/families/with/members`,
    params: { page: pageIndex, pageSize: PAGE_SIZE },
  }; // SWR key
};

const FamiliesList = () => {
  const [dataFamily, setDataFamily] = React.useState([]);

  const {
    data: families,
    error,
    size,
    setSize,
    isValidating,
    mutate,
  } = useSWRInfinite(getKey);
  console.log('families :', families);

  React.useEffect(() => {
    console.log('useEffect');
    if (families) {
      let dataFamily2 = [];
      families.map((family) => {
        dataFamily2 = [...dataFamily2, ...family.data];
      });
      setDataFamily(dataFamily2);
    }
  }, [families]);

  if (!families || !dataFamily.length) return;

  const isLoadingInitialData = !families && !error;
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && families && typeof families[size - 1] === 'undefined');
  const isEmpty = families?.[0]?.data.length === 0;
  const isReachingEnd =
    isEmpty ||
    (families && families[families.length - 1]?.data.length < PAGE_SIZE);

  const isRefreshing = isValidating && families && families.length === size;

  const loadMore = () => {
    if (isLoadingMore || isReachingEnd)
      return console.log('loading more or reached the end');

    setSize(size + 1);
  };

  return (
    <>
      <InfiniteScroll
        dataLength={dataFamily.length}
        next={loadMore}
        hasMore={!isReachingEnd}
        loader={<h4>Loading...</h4>}
        height={400}
      >
        {dataFamily.map((family, index) => (
          <Acordeao family={family} key={family.id} />
        ))}
      </InfiniteScroll>
      <button onClick={() => loadMore()}>Load more</button>
    </>
  );
};

export default FamiliesList;

const Acordeao = ({ family }) => {
  return (
    <Accordion key={`accordion-${family.id}`}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>{family.name}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <FamiliesTable members={family.members} />
      </AccordionDetails>
    </Accordion>
  );
};
