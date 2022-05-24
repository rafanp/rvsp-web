import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import FamiliesListInfiniteLoader from '@/components/screens/Families/FamiliesListInfiniteLoader';
import { FamiliesProvider } from '@/contexts/families/provider';
import FamiliesDialog from '@/components/screens/Families/FamiliesDialog';
import FamiliesListVirtualized from '@/components/screens/Families/FamiliesListVirtualized';
import FamiliesListWithDinamicHeight from '@/components/screens/Families/FamiliesListWithDinamicHeight';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';

const Scrolltest = () => {
  return (
    <FamiliesProvider>
      <Container maxWidth="md">
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Scroll examples
          </Typography>
          <Stack spacing={6} divider={<Divider flexItem />}>
            <FamiliesDialog />
            <FamiliesListInfiniteLoader />
            <FamiliesListVirtualized />
            <FamiliesListWithDinamicHeight />
          </Stack>
        </Box>
      </Container>
    </FamiliesProvider>
  );
};

export default Scrolltest;
