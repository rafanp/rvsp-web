import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import GuestTables from '../src/components/tables/GuestTables';

export default function Index() {
  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Guests
        </Typography>
        <GuestTables />
      </Box>
    </Container>
  );
}
