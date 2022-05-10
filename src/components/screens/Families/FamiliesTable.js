import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';

const BooleanIcon = ({ value, ...props }) => {
  if (value) {
    return <CheckIcon color="success" {...props} />;
  } else {
    return <CloseIcon color="rgba(0, 0, 0, 0.5)" {...props} />;
  }
};

const FamiliesTable = ({ members }) => {
  if (!members.length) {
    return (
      <div>
        <Typography fontSize="14px">There is no data to show</Typography>
      </div>
    );
  }
  return (
    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell align="center">Child?</TableCell>
          <TableCell align="center">Attending?</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {members.map((row) => (
          <TableRow
            key={row.id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              {row.name}
            </TableCell>
            <TableCell align="center">
              <BooleanIcon value={row.child} />
            </TableCell>
            <TableCell align="center">
              <BooleanIcon value={row.attending} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default FamiliesTable;
