import { type ReactElement } from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useTranslation } from 'react-i18next';
import Button from '../button';

export interface ConfirmationDialogProps {
  open: boolean;
  text: string;
  description?: string;
  onCancel: () => void;
  onConfirm: () => void;
}

const ConfirmationDialog = ({
  open,
  text,
  description,
  onCancel,
  onConfirm,
}: ConfirmationDialogProps): ReactElement => {
  const { t } = useTranslation();

  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle>{text}</DialogTitle>
      {description && (
        <DialogContent>
          <DialogContentText>{description}</DialogContentText>
        </DialogContent>
      )}
      <DialogActions>
        <Button color="success" onClick={onCancel} autoFocus>
          {t('no')}
        </Button>
        <Button color="error" onClick={onConfirm}>
          {t('yes')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
