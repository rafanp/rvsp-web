import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FamiliesTable from './FamiliesTable';
import { FixedSizeList as List } from 'react-window';
import useSWRInfinite from 'swr/infinite';
import InfiniteLoader from 'react-window-infinite-loader';
import AutoSizer from 'react-virtualized-auto-sizer';
import { Box } from '@mui/material';

const getKey = (pageIndex, previousPageData) => {
  if (
    previousPageData &&
    previousPageData.currentPage > previousPageData.lastPage
  )
    return null;
  // if (previousPageData && !previousPageData.length) return null; // reached the end
  return {
    url: `/families/with/members`,
    params: { page: pageIndex, pageSize: 6 },
  }; // SWR key
};

const PAGE_SIZE = 6;

const FamiliesListInfiniteLoader = () => {
  const [dataFamily, setDataFamily] = React.useState([]);

  const {
    data: families,
    error,
    size,
    setSize,
    isValidating,
    mutate,
  } = useSWRInfinite(getKey);

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

  if (!families) return;

  if (dataFamily.length < 1) return;

  const issues = families ? [].concat(...families) : [];
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
      return console.log('carregando ou chegou ao fim');

    setSize(size + 1);
  };

  return (
    <>
      <InfiniteLoader
        isItemLoaded={() => !dataFamily.length}
        itemCount={dataFamily.length}
        loadMoreItems={() => loadMore()}
      >
        {({ onItemsRendered, ref }) => (
          <List
            height={200}
            width={200}
            itemCount={dataFamily.length}
            itemSize={35}
            itemData={dataFamily}
            // innerElementType={Acordeao}
            onItemsRendered={onItemsRendered}
            ref={ref}
          >
            {Row}
          </List>
        )}
      </InfiniteLoader>

      <button onClick={() => loadMore()}>Load more</button>
    </>
  );
};

export default FamiliesListInfiniteLoader;

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

const SimpleCard = ({ index, data }) => {
  console.log('index :', index);
  console.log('data :', data);
  const loading = data[index] === null;
  if (loading) return <h4>Loading</h4>;
  const family = data[index];
  return <h4>{family?.name || ''}</h4>;
};

const Example = () => (
  <AutoSizer>
    {({ height, width }) => (
      <List
        className="List"
        height={height}
        itemCount={1000}
        itemSize={35}
        width={width}
      >
        {Row}
      </List>
    )}
  </AutoSizer>
);

const Row = ({ index, style, data }) => {
  const family = data[index];
  if (!family) return <div style={style}>Loading</div>;
  return <div style={style}>{family.name}</div>;
};
