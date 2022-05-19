import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FamiliesTable from './FamiliesTable';
import swr from '@/services/swr';

import useSWRInfinite from 'swr/infinite';
import api from '@/services/api';

// const fetcher = ({ url }) => api.get(url).then((res) => res.data);

const getKey = (pageIndex, previousPageData) => {
  console.log('pageIndex :', pageIndex);
  console.log('previousPageData :', previousPageData);
  if (
    previousPageData &&
    previousPageData.currentPage > previousPageData.lastPage
  )
    return null;
  // if (previousPageData && !previousPageData.length) return null; // reached the end
  return {
    url: `/families/with/members`,
    params: { page: pageIndex, pageSize: 3 },
  }; // SWR key
};

const FamiliesList = () => {
  // const {
  //   data: families,
  //   isLoading,
  //   isError,
  // } = swr({ url: '/families/with/members' });
  const { data: families, size, setSize } = useSWRInfinite(getKey);
  console.log('size :', size);
  console.log('families :', families);

  // if (isLoading) return;
  // if (isError) return;

  if (!families) return;
  return (
    <>
      {families?.map((family) => {
        return family.data.map((family) => (
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
        ));
      })}

      <button onClick={() => setSize(size + 1)}>Load more</button>
    </>
  );
};

export default FamiliesList;
