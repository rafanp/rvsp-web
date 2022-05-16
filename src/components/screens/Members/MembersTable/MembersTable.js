import swr from '@/services/swr';
import { DataGrid } from '@mui/x-data-grid';
import columns from './columns';

const Table = ({ page, pageSize, setPageSize, handlePageChange }) => {
  const { data, isLoading, isError } = swr({
    url: `/members`,
    params: {
      pageSize,
      page,
    },
  });

  if (isLoading) return;
  if (isError) return;

  return (
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
  );
};

export default Table;
