import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { MembersProvider } from '../src/contexts/members/provider';
import FamiliesList from '@/components/screens/Families/FamiliesList';
import { listAllFamiliesWithMembers } from '@/services/Families';

const Families = ({ families, members }) => {
  return (
    <MembersProvider>
      <Container maxWidth="md">
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Families
          </Typography>
          <FamiliesList families={families} />
        </Box>
      </Container>
    </MembersProvider>
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
