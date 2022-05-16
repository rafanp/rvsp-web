import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useMembers } from '@/contexts/members/provider';
import ButtonGroup from '@mui/material/ButtonGroup';
import swr from '@/services/swr';
import { useEffect, useState } from 'react';
import { listAllMembers } from '@/services/Members';

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

export default function MembersTable() {
  const [pageSize, setPageSize] = useState(5);
  const [page, setPage] = useState(0);

  const membersUrl = {
    url: '/members',
    params: {
      pageSize,
      page,
    },
  };

  // const { data, isLoading, isError, mutate } = swr(membersUrl);
  const { data, isLoading, isError, mutate } = swr({
    url: `/members`,
    params: {
      pageSize,
      page,
    },
  });

  // listAllMembers();
  // ?pageSize=${pageSize}&page=${page + 1}
  if (isLoading) return;
  if (isError) return;

  // const { setSwrLink } = useMembers();

  // setSwrLink(membersUrl);

  // const { data: members, lastPage, count } = data;

  const handlePageChange = (newPage) => {
    console.log('newPage :', newPage);
    // We have the cursor, we can allow the page transition.
    // if (newPage === 0) {
    setPage(newPage);
    // }
  };

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        loading={isLoading}
        rows={data?.data || []}
        columns={columns}
        rowsPerPageOptions={[5, 10, 20]}
        page={page}
        pageSize={pageSize}
        rowCount={data?.count}
        onPageChange={(e) => handlePageChange(e)}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        pagination
        paginationMode="server"
        disableSelectionOnClick
      />
    </div>
  );
}
