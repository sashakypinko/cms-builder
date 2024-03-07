import { type ReactElement, ReactNode } from 'react'
import { IconButton, Toolbar, Tooltip, Typography } from '@mui/material';
import { AddCircleOutlineRounded } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import TableColumnsManager from './table-columns-manager';
import { type TableCell } from '../table';

interface Props {
  title: string;
  cells: TableCell[];
  tools: ReactNode[];
  hiddenCellIndexes: number[];
  setHiddenCellIndexes: (newIndexed: number[]) => void;
  onAddClick?: (() => void) | undefined;
}

const TableDefaultToolbar = ({
  title,
  cells,
  tools,
  hiddenCellIndexes,
  setHiddenCellIndexes,
  onAddClick,
}: Props): ReactElement => {
  const { t } = useTranslation();

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: {
          xs: 1,
          sm: 1,
        },
      }}
    >
      <Typography sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle" component="div">
        {title}
      </Typography>
      {tools.map(tool => tool)}
      {onAddClick != null && (
        <Tooltip title={t('table.add-new')}>
          <IconButton onClick={onAddClick}>
            <AddCircleOutlineRounded />
          </IconButton>
        </Tooltip>
      )}
      <TableColumnsManager
        cells={cells}
        hiddenCellIndexes={hiddenCellIndexes}
        setHiddenCellIndexes={setHiddenCellIndexes}
      />
    </Toolbar>
  );
};

export default TableDefaultToolbar;
