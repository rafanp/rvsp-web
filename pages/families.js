import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import FamiliesList from '@/components/screens/Families/FamiliesList';
import { listAllFamiliesWithMembers } from '@/services/Families';
import { FamiliesProvider } from '@/contexts/families/provider';
import FamiliesDialog from '@/components/screens/Families/FamiliesDialog';

const Families = ({ families, members }) => {
  return (
    <FamiliesProvider>
      <Container maxWidth="md">
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Families
          </Typography>
          <FamiliesDialog />
          <FamiliesList families={families} />
        </Box>
      </Container>
    </FamiliesProvider>
  );
};

export async function getServerSideProps() {
  try {
    const familiesResponse = await listAllFamiliesWithMembers();
    return {
      props: { families: familiesResponse?.data || [] },
    };
  } catch (err) {
    return {
      props: {},
    };
  }
}

export default Families;
