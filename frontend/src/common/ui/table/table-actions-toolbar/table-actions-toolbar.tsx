import { type FC, type ReactElement } from 'react';
import { IconButton, Toolbar, Tooltip, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import { CancelOutlined } from '@mui/icons-material';

export interface TableAction {
  Icon: FC;
  onClick: (value: any) => void;
  tooltip: string;
  multiple?: boolean;
}

interface Props {
  actions: TableAction[];
  selected: any[];
  handleCancelSelections: () => void;
}

const TableActionsToolbar = ({ selected, actions = [], handleCancelSelections }: Props): ReactElement => {
  const { t } = useTranslation();

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: {
          xs: 1,
          sm: 1,
        },
        bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
      }}
    >
      <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle1" component="div">
        {selected.length} {t('table.selected-number')}
      </Typography>
      <Tooltip title={t('table.cancel-selections')}>
        <IconButton onClick={handleCancelSelections}>
          <CancelOutlined />
        </IconButton>
      </Tooltip>
      {actions
        .filter(({ multiple = selected.length === 1 }) => multiple)
        .map(({ tooltip, Icon, onClick, multiple }) => (
          <Tooltip key={tooltip} title={tooltip}>
            <IconButton
              onClick={() => {
                onClick(multiple ? selected : selected[0]);
              }}
            >
              <Icon />
            </IconButton>
          </Tooltip>
        ))}
    </Toolbar>
  );
};

export default TableActionsToolbar;
