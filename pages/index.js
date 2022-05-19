import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ProTip from '../src/ProTip';
import Link from '../src/Link';
import Copyright from '../src/Copyright';

export default function Index() {
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          RSVP Example
        </Typography>
        <Typography variant="p" component="p" gutterBottom>
          Répondez S'il Vous Plaît
        </Typography>
        <Typography variant="p" component="p" gutterBottom>
          Example with useSwr, context-api and Material-UI
        </Typography>
        {/* <Link href="/about" color="secondary">
          Répondez S'il Vous Plaît,
        </Link> */}
        <ProTip />
        <Copyright />
      </Box>
    </Container>
  );
}
