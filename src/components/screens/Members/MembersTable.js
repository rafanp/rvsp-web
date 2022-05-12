import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useMembers } from '@/contexts/members/provider';
import ButtonGroup from '@mui/material/ButtonGroup';
import swr from '@/services/swr';

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
      const { editMember, deleteMember } = useMembers();

      return (
        <ButtonGroup>
          <IconButton aria-label="edit" onClick={() => editMember(params.row)}>
            <EditIcon />
          </IconButton>
          <IconButton
            aria-label="delete"
            onClick={() => deleteMember(params.row)}
          >
            <DeleteIcon />
          </IconButton>
        </ButtonGroup>
      );
    },
  },
];

// const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function MembersTable() {
  const { data: members, isLoading, isError } = swr('/members');

  if (isLoading) return;
  if (isError) return;

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
