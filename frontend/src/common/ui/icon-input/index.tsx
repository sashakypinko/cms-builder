import { FC, ReactElement } from 'react';
import { Box, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import  * as icons from '@mui/icons-material';
import SvgIcon from '@mui/material/SvgIcon';

interface Props {
  value: string;
  onChange: (newValue: string) => void;
}

const IconInput: FC<Props> = ({ value, onChange }): ReactElement => {
  const { t } = useTranslation();

  const Icon = (icons as Record<string, typeof SvgIcon>)[value];

  return  (
    <Box display="flex" alignItems="center" gap={2}>
      <TextField
        label={t('icon')}
        value={value}
        onChange={e => onChange(e.target.value)}
        fullWidth
      />
      {Icon && <Icon />}
    </Box>
  );
};

export default IconInput;
