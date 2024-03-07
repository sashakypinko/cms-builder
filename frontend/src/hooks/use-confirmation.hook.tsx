import { type ReactNode, useState } from 'react';
import ConfirmationDialog from '../common/ui/confirmation-dialog';
import { type ConfirmationDialogProps } from '../common/ui/confirmation-dialog/confirmation-dialog';

interface ShowConfirmationParams {
  text: string;
  description?: string;
  onConfirm: () => void;
  onCancel?: () => void;
}

const initConfirmationDialogProps: ConfirmationDialogProps = {
  open: false,
  text: '',
  /* eslint-disable @typescript-eslint/no-empty-function */
  onConfirm: () => {},
  /* eslint-disable @typescript-eslint/no-empty-function */
  onCancel: () => {},
};

const useConfirmation = (): { Confirmation: ReactNode; showConfirmation: (params: ShowConfirmationParams) => void } => {
  const [confirmationDialogProps, setConfirmationDialogProps] =
    useState<ConfirmationDialogProps>(initConfirmationDialogProps);

  const Confirmation = <ConfirmationDialog {...confirmationDialogProps} />;

  /* eslint-disable @typescript-eslint/no-empty-function */
  const showConfirmation = ({ text, description, onConfirm, onCancel = () => {} }: ShowConfirmationParams): void => {
    setConfirmationDialogProps({
      open: true,
      text,
      description,
      onConfirm: () => {
        setConfirmationDialogProps(initConfirmationDialogProps);
        onConfirm();
      },
      onCancel: () => {
        setConfirmationDialogProps(initConfirmationDialogProps);
        onCancel();
      },
    });
  };

  return {
    Confirmation,
    showConfirmation,
  };
};

export default useConfirmation;
