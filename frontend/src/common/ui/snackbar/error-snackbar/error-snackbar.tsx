import { type ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Snackbar as MuiSnackbar } from '@mui/material';
import { selectErrorSnackbar } from '../../../../store/selectors';
import { clearSnackbar } from '../../../../store/ui/slice';

const ErrorSnackbar = (): ReactElement => {
  const dispatch = useDispatch();

  const message = useSelector(selectErrorSnackbar);

  const handleClose = () => {
    dispatch(clearSnackbar());
  };

  return (
    <MuiSnackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={!!message}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert severity="error">{message}</Alert>
    </MuiSnackbar>
  );
};

export default ErrorSnackbar;
