import {
  Box,
  Button,
  Divider,
  FormControlLabel,
  FormGroup,
  IconButton,
  Menu,
  Switch,
  Tooltip,
  Typography,
} from '@mui/material';
import { ViewColumnRounded } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { type MouseEvent, useState } from 'react';
import { type TableCell } from '../../table';

interface Props {
  cells: TableCell[];
  hiddenCellIndexes: number[];
  setHiddenCellIndexes: (newIndexed: number[]) => void;
}

const TableColumnsManager = ({ cells, hiddenCellIndexes, setHiddenCellIndexes }: Props) => {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleToggleColumn = (checked: boolean, cellIndex: number) => {
    if (!checked) {
      setHiddenCellIndexes([...hiddenCellIndexes, cellIndex]);
      return;
    }
    setHiddenCellIndexes(hiddenCellIndexes.filter((index) => index !== cellIndex));
  };

  const handleShowAll = () => {
    setHiddenCellIndexes([]);
  };

  const handleHideAll = () => {
    setHiddenCellIndexes(Array.from({ length: cells.length }, (_, index) => index));
  };

  return (
    <>
      <Tooltip title={t('table.manage-columns')}>
        <IconButton onClick={handleOpen}>
          <ViewColumnRounded />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        transformOrigin={{
          horizontal: 'right',
          vertical: 'top',
        }}
        anchorOrigin={{
          horizontal: 'right',
          vertical: 'bottom',
        }}
      >
        <Box sx={{ minWidth: 250 }}>
          <Typography
            sx={{
              pl: 2,
              pb: 1,
            }}
            component="div"
            variant="h6"
          >
            {t('Manage Columns')}
          </Typography>
          <Divider />
          <FormGroup sx={{ p: 2 }}>
            {cells.map((cell, index) => (
              <FormControlLabel
                key={index}
                control={<Switch />}
                label={cell.label}
                checked={!hiddenCellIndexes.includes(index)}
                onChange={(e, checked) => {
                  handleToggleColumn(checked, index);
                }}
              />
            ))}
          </FormGroup>
          <Box
            sx={{
              pl: 2,
              pr: 2,
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Button sx={{ textTransform: 'uppercase' }} onClick={handleHideAll}>
              {t('Hide All')}
            </Button>
            <Button sx={{ textTransform: 'uppercase' }} onClick={handleShowAll}>
              {t('Show All')}
            </Button>
          </Box>
        </Box>
      </Menu>
    </>
  );
};

export default TableColumnsManager;
