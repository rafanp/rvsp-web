import { createRef, useEffect, useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FamiliesTable from './FamiliesTable';
import { VariableSizeList as List } from 'react-window';
import useSWRInfinite from 'swr/infinite';
import InfiniteLoader from 'react-window-infinite-loader';
import useOnScreen from 'src/hooks/useOnScreen';
import AutoSizer from 'react-virtualized-auto-sizer';
import { Box } from '@mui/material';

const getKey = (pageIndex, previousPageData) => {
  // console.log('pageIndex :', pageIndex);
  // console.log('previousPageData :', previousPageData);
  if (
    previousPageData &&
    previousPageData.currentPage > previousPageData.lastPage
  )
    return null;
  return {
    url: `/families/with/members`,
    params: { page: pageIndex, pageSize: 6 },
  }; // SWR key
};

const rowHeights = [
  40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40,
  40, 40,
];

const FamiliesListWithDinamicHeight = () => {
  const [dataFamily, setDataFamily] = useState([]);
  const [rowSizes, setRowSizes] = useState(rowHeights);

  const {
    data: families,
    error,
    size,
    setSize,
    isValidating,
    mutate,
  } = useSWRInfinite(getKey);

  useEffect(() => {
    if (families) {
      let dataFamily2 = [];
      families.map((family) => {
        dataFamily2 = [...dataFamily2, ...family.data];
      });
      setDataFamily(dataFamily2);
    }
  }, [families]);

  if (!families || !dataFamily.length) return;

  const listRef = createRef();

  const getItemSize = (index) => rowSizes[index];

  const toggleSize = (i) => {
    if (listRef.current) {
      listRef.current.resetAfterIndex(i);
    }
    setRowSizes((prevState) => ({
      ...prevState,
      [i]: rowSizes[i] === 40 ? 60 : 40,
    }));
  };

  return (
    <>
      <p>Listas virtualizadas com alturas dinâmicas</p>
      <p>
        Precisa atrelar uma função com ref, e alterar a altura do state
        rowSizes, que contém a altura de todos os componentes
      </p>
      <Box
        sx={{
          height: '300px',
        }}
      >
        <AutoSizer>
          {({ height, width }) => (
            <List
              className="List"
              height={height}
              itemCount={dataFamily.length}
              //   itemSize={35}
              //   estimatedItemSize={50}
              width={width}
              itemSize={getItemSize}
              itemData={dataFamily}
              //   resetAfterIndex={newRowHeights}
              ref={listRef}
            >
              {(props) => <Acordeao {...props} toggleSize={toggleSize} />}
            </List>
          )}
        </AutoSizer>
      </Box>

      <button onClick={() => listRef.current.resetAfterIndex(3, true)}>
        Alterar o height
      </button>
      <button onClick={() => setSize(size + 1)}>Load more</button>
    </>
  );
};

export default FamiliesListWithDinamicHeight;

const Row = ({ index, style, data }) => {
  const family = data[index];
  if (!family) return <div style={style}>Loading</div>;
  return <div style={style}>{family.name}</div>;
};

const Acordeao = ({ index, style, data, toggleSize }) => {
  const family = data[index];
  if (!family) return <div style={style}>Loading</div>;

  return (
    <div style={style}>
      <Accordion
        key={`accordion-${family.id}`}
        onClick={() => toggleSize(index)}
      >
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
    </div>
  );
};
