import * as React from 'react';
import { type ReactElement, type ReactNode } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { type TransitionProps } from '@mui/material/transitions';
import { Divider } from '@mui/material';
import { SxProps } from '@mui/system';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction='up' ref={ref} {...props} />;
});

interface ModalProps {
  title: string;
  open: boolean;
  onClose: () => void;
  sx?: SxProps;
  children: ReactNode;
}

const Modal = ({ title, open, onClose, sx, children }: ModalProps): ReactElement => (
  <Dialog
    sx={sx}
    PaperProps={{ sx }}
    open={open}
    TransitionComponent={Transition}
    onClose={onClose}
    keepMounted
  >
    <DialogTitle>{title}</DialogTitle>
    <Divider />
    <DialogContent>{children}</DialogContent>
  </Dialog>
);

export default Modal;
