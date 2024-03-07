import * as React from 'react';
import { type ReactElement, type ReactNode } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { type TransitionProps } from '@mui/material/transitions';
import { Divider } from '@mui/material';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface ModalProps {
  title: string;
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal = ({ title, open, onClose, children }: ModalProps): ReactElement => (
  <Dialog
    open={open}
    TransitionComponent={Transition}
    keepMounted
    onClose={onClose}
  >
    <DialogTitle>{title}</DialogTitle>
    <Divider />
    <DialogContent>{children}</DialogContent>
  </Dialog>
);

export default Modal;
