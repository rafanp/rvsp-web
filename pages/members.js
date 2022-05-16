import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { MembersProvider } from '../src/contexts/members/provider';
import MembersTable from '@/components/screens/Members/MembersTable';
import MembersDialog from '@/components/screens/Members/MembersDialog';

const Members = () => {
  return (
    <MembersProvider>
      <Container maxWidth="md">
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Members
          </Typography>
          <MembersDialog />
          <MembersTable />
        </Box>
      </Container>
    </MembersProvider>
  );
};

export default Members;
