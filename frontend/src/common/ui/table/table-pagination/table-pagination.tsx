import { type ChangeEvent, type ReactElement, useEffect } from 'react';
import { TablePagination as MuiTablePagination } from '@mui/material';

interface Props {
  rows: any[];
  page: number;
  rowsPerPage: number;
  onPageChange: (value: number) => void;
  onRowsPerPageChange: (value: number) => void;
}

const TablePagination = ({ rows, page, rowsPerPage, onPageChange, onRowsPerPageChange }: Props): ReactElement => {
  useEffect(() => {
    const maxPage = Math.max(0, Math.ceil(rows.length / rowsPerPage) - 1);
    if (maxPage >= 0 && page > maxPage) {
      onPageChange(maxPage);
    }
  }, [rows]);

  const handleChangePage = (event: unknown, newPage: number) => {
    onPageChange(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    onRowsPerPageChange(parseInt(event.target.value, 10));
    onPageChange(0);
  };

  return (
    <MuiTablePagination
      rowsPerPageOptions={[5, 10, 25]}
      component="div"
      count={rows.length}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  );
};

export default TablePagination;
