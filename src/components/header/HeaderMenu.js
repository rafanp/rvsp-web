import Typography from '@mui/material/Typography';
import MUILink from '@mui/material/Link';
import NextLink from 'next/link';
import Link from '../UI/Buttons/Link';
import { Stack } from '@mui/material';

const HeaderMenu = () => {
  return (
    <>
      <Stack direction="row" spacing={3} justifyContent="center">
        <Link href={'/families'}>Families</Link>
        <Link href={'/members'}>Members</Link>
      </Stack>
    </>
  );
};

export default HeaderMenu;
