import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FamiliesTable from './FamiliesTable';

const FamiliesList = ({ families }) => {
  if (!families) return;
  return (
    <>
      {families.map((family) => (
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
      ))}
    </>
  );
};

export default FamiliesList;
