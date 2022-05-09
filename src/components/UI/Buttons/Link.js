import PropTypes from 'prop-types';
import MUILink from '@mui/material/Link';
import NextLink from 'next/link';

const Link = ({ href, children }) => {
  return (
    <>
      <NextLink href={href} passHref>
        <MUILink variant="body2" underline="none">
          {children}
        </MUILink>
      </NextLink>
    </>
  );
};

export default Link;

Link.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
};
