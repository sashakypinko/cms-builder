import { type ChangeEvent, type MouseEvent } from 'react'
import { Box, Checkbox, TableCell, TableHead as MuiTableHead, TableRow, TableSortLabel } from '@mui/material'
import { visuallyHidden } from '@mui/utils'

type Order = 'asc' | 'desc';

interface Props {
  numSelected: number;
  onRequestSort: (event: MouseEvent<unknown>, property: any) => void;
  onSelectAllClick: (event: ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  cells: any[];
  orderBy: string;
  rowCount: number;
  loading: boolean;
  selectable: boolean;
}

const TableHead = (props: Props) => {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    cells,
    loading,
    selectable
  } = props
  const createSortHandler = (property: any) => (event: MouseEvent<unknown>) => {
    onRequestSort(event, property)
  }

  return (
    <MuiTableHead>
      <TableRow>
        {
          selectable && (
            <TableCell padding="checkbox">
              <Checkbox
                color="primary"
                indeterminate={numSelected > 0 && numSelected < rowCount}
                checked={rowCount > 0 && numSelected === rowCount}
                onChange={onSelectAllClick}
                disabled={loading}
              />
            </TableCell>
          )
        }
        {cells.map(({
          label,
          field,
          align = 'center',
          padding = 'normal'
        }) => (
          <TableCell key={field} align={align} padding={padding} sortDirection={orderBy === field ? order : false}>
            <TableSortLabel
              active={orderBy === field}
              direction={orderBy === field ? order : 'asc'}
              onClick={createSortHandler(field)}
            >
              {label}
              {orderBy === field ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </MuiTableHead>
  )
}

export default TableHead
