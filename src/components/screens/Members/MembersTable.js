import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import { useMembers } from '../../../contexts/members/provider';

const columns = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'name', headerName: 'Name', width: 200 },
  { field: 'child', headerName: 'Child', type: 'boolean', width: 200 },
  {
    field: 'attending',
    headerName: 'Attending',
    type: 'boolean',
    width: 200,
  },
  {
    field: 'action',
    headerName: 'Action',
    sortable: false,
    renderCell: (params) => {
      const { editMember } = useMembers();

      return (
        <IconButton aria-label="delete" onClick={() => editMember(params.row)}>
          <EditIcon />
        </IconButton>
      );
    },
  },
];

export default function MembersTable({ members }) {
  if (!members) return;

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={members}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
    </div>
  );
}
