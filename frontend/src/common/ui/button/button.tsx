import type { ReactElement, ReactNode } from 'react';
import { Button as MuiButton, CircularProgress, Typography } from '@mui/material';
import { ButtonProps } from '@mui/material/Button/Button';

interface Props extends ButtonProps {
  startIcon?: ReactNode;
  loading?: boolean;
}

const Button = ({ loading, startIcon, children, ...props }: Props): ReactElement => {
  return (
    <MuiButton {...props}>
      {startIcon && (
        <Typography sx={{ mt: '2px', mr: 0.5 }} component="span">
          {startIcon}
        </Typography>
      )}
      {loading ? <CircularProgress color="inherit" size={20} /> : children}
    </MuiButton>
  );
};

export default Button;
