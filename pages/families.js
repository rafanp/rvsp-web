import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import MembersTable from '../src/components/screens/Members/MembersTable';
import axios from 'axios';
import { Button } from '@mui/material';
import MembersDialog from '../src/components/screens/Members/MembersDialog';
import { MembersProvider, useMembers } from '../src/contexts/members/provider';
import FamiliesList from '@/components/screens/Families/FamiliesList';

const Families = ({ families, members }) => {
  console.log('members :', members);
  console.log('families :', families);

  return (
    <MembersProvider>
      <Container maxWidth="md">
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Families
          </Typography>
          <FamiliesList families={families} />
          {/* <MembersDialog open={true} /> */}
          {/* <MembersTable members={members} /> */}
        </Box>
      </Container>
    </MembersProvider>
  );
};

export async function getServerSideProps() {
  // Fetch data from external API
  const familiesResponse = await axios.get('http://localhost:3333/families');
  //   const membersResponse = await axios.get('http://localhost:3333/members');

  return {
    props: { families: familiesResponse.data },
  };
}

export default Families;
