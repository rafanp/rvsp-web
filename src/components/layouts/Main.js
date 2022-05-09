import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import HeaderMenu from '../header/HeaderMenu';
import MUILink from '@mui/material/Link';
import NextLink from 'next/link';
const Main = ({ children }) => {
  return (
    <>
      <Container maxWidth="md">
        <Box sx={{ my: 4 }}>
          <HeaderMenu />

          {children}
        </Box>
      </Container>
    </>
  );
};

export default Main;
