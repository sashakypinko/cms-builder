import { type ChangeEvent, type MouseEvent, type ReactElement, ReactNode, useEffect, useMemo, useState } from 'react';
import {
  Box,
  Checkbox,
  Container,
  LinearProgress,
  Paper,
  Table as MuiTable,
  TableBody,
  TableContainer,
  TableRow,
  TableCell as MuiTableCell,
} from '@mui/material';
import TableActionsToolbar from './table-actions-toolbar';
import TableDefaultToolbar from './table-default-toolbar';
import TablePagination from './table-pagination';
import { type TableAction } from './table-actions-toolbar/table-actions-toolbar';
import TableHead from './table-head/table-head';

function descendingComparator<T>(a: T, b: T, orderBy: keyof T, fieldValue: any) {
  const orderValueA = fieldValue ? fieldValue(a) : a[orderBy];
  const orderValueB = fieldValue ? fieldValue(b) : b[orderBy];
  if (orderValueB < orderValueA) {
    return -1;
  }
  if (orderValueB > orderValueA) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
  cells: Array<any>,
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
  const { fieldValue } = cells.find(({ field }) => field === orderBy) || {};

  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy, fieldValue)
    : (a, b) => -descendingComparator(a, b, orderBy, fieldValue);
}

function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

export interface TableCell {
  field: string;
  label: string;
  fieldValue?: (row: any) => number | string;
  align?: 'inherit' | 'left' | 'center' | 'right' | 'justify';
  padding?: 'normal' | 'checkbox' | 'none';
  render?: (row: any) => number | string | ReactNode;
}

interface Props {
  title: string;
  cells: any[];
  rows: any[];
  actions: TableAction[];
  keyField: string;
  tools: ReactNode[];
  loading: boolean;
  onAddClick?: () => void;
  selectable: boolean;
}

const Table = ({
  cells,
  rows,
  title,
  actions,
  keyField,
  tools,
  loading,
  onAddClick,
  selectable,
}: Props): ReactElement => {
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<any>();
  const [selected, setSelected] = useState<any[]>([]);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [hiddenCellIndexes, setHiddenCellIndexes] = useState<number[]>([]);

  useEffect(() => {
    setSelected([]);
  }, [rows]);

  const handleRequestSort = (event: MouseEvent<unknown>, property: any) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelected(rows);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: ChangeEvent<HTMLInputElement>, row: any) => {
    if (event.target.checked) {
      setSelected([...selected, row]);
      return;
    }

    setSelected(selected.filter((item) => row[keyField] !== item[keyField]));
  };

  const isSelected = (key: number | string): boolean => !!selected.find((item) => item[keyField] === key);

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy, cells)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      ),
    [rows, order, orderBy, page, rowsPerPage],
  );

  const visibleCells = useMemo(
    () => cells.filter((cell, key) => !hiddenCellIndexes.includes(key)),
    [cells, hiddenCellIndexes],
  );

  return (
    <Box sx={{ width: '100%' }}>
      <Paper
        sx={{
          width: '100%',
          mb: 2,
        }}
      >
        {selected.length > 0 ? (
          <TableActionsToolbar
            selected={selected}
            actions={actions}
            handleCancelSelections={() => {
              setSelected([]);
            }}
          />
        ) : (
          <TableDefaultToolbar
            title={title}
            tools={tools}
            onAddClick={onAddClick}
            cells={cells}
            hiddenCellIndexes={hiddenCellIndexes}
            setHiddenCellIndexes={setHiddenCellIndexes}
          />
        )}
        <TableContainer>
          {loading ? <LinearProgress /> : <Box sx={{ height: '4px' }} />}
          <MuiTable
            sx={{
              minWidth: 750,
              opacity: loading ? 0.5 : 1,
            }}
            aria-labelledby="tableTitle"
            size={'medium'}
          >
            <TableHead
              cells={visibleCells}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              loading={loading}
              selectable={selectable}
            />
            <TableBody>
              {visibleRows.map((row) => {
                const isItemSelected = isSelected(row[keyField]);
                const labelId = `enhanced-table-checkbox-${row[keyField]}`;

                return (
                  <TableRow
                    hover
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row[keyField]}
                    selected={isItemSelected}
                    sx={{ cursor: 'pointer' }}
                  >
                    {selectable && (
                      <MuiTableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          onChange={(event) => {
                            handleClick(event, row);
                          }}
                          inputProps={{ 'aria-labelledby': labelId }}
                          disabled={loading}
                        />
                      </MuiTableCell>
                    )}
                    {visibleCells.map(({ field, align = 'center', padding = 'normal', render }) => (
                      <MuiTableCell key={field} align={align} padding={padding}>
                        {render ? render(row) : row[field]}
                      </MuiTableCell>
                    ))}
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <MuiTableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </MuiTable>
        </TableContainer>
        <TablePagination
          rows={rows}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={setPage}
          onRowsPerPageChange={setRowsPerPage}
        />
      </Paper>
    </Box>
  );
};

Table.defaultProps = {
  loading: false,
  actions: [],
  tools: [],
  selectable: true,
};

export default Table;
