import { useState } from 'react';
import Table from './Table';

const MembersTable = () => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <div style={{ height: 400, width: '100%' }}>
      <Table
        page={page}
        pageSize={pageSize}
        setPageSize={setPageSize}
        handlePageChange={handlePageChange}
      />
      <div style={{ display: 'none' }}>
        <Table
          page={page + 1}
          pageSize={pageSize}
          setPageSize={setPageSize}
          handlePageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default MembersTable;
