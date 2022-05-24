import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FamiliesTable from './FamiliesTable';
import InfiniteScroll from 'react-infinite-scroll-component';
import useSWRInfinite from '@/services/useSWRInfinite';

const FamiliesList = () => {
  const {
    data: families,
    error,
    size,
    setSize,
    isValidating,
    mutate,
    isLoadingInitialData,
    isLoadingMore,
    isEmpty,
    isReachingEnd,
    isRefreshing,
    groupedData,
  } = useSWRInfinite({
    url: '/families/with/members',
    params: {
      pageSize: 10,
      // page,
    },
  });

  if (!families || !groupedData.length) return;

  const loadMore = () => {
    if (isLoadingMore || isReachingEnd)
      return console.log('loading more or reached the end');

    setSize(size + 1);
  };

  return (
    <>
      <InfiniteScroll
        dataLength={groupedData.length}
        next={loadMore}
        hasMore={!isReachingEnd}
        loader={<h4>Loading...</h4>}
        height={400}
      >
        {groupedData.map((family, index) => (
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
