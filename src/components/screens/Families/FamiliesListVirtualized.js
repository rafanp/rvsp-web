import { useEffect, useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FamiliesTable from './FamiliesTable';
import { FixedSizeList as List } from 'react-window';
import useSWRInfinite from 'swr/infinite';
import AutoSizer from 'react-virtualized-auto-sizer';
import { Box } from '@mui/material';

const getKey = (pageIndex, previousPageData) => {
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

const FamiliesListVirtualized = () => {
  const [dataFamily, setDataFamily] = useState([]);

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

  return (
    <>
      <p>Listas virtualizadas</p>
      <p>Utiliza o react-window</p>
      <p>É apenas a virtualização, não possui paginação no scroll</p>
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
              itemSize={35}
              width={width}
              itemData={dataFamily}
            >
              {Acordeao}
            </List>
          )}
        </AutoSizer>
      </Box>

      <button onClick={() => setSize(size + 1)}>Load more</button>
    </>
  );
};

export default FamiliesListVirtualized;

const Acordeao = ({ index, style, data }) => {
  const family = data[index];
  if (!family) return <div style={style}>Loading</div>;
  return (
    <div style={style}>
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
    </div>
  );
};
