import { ReactElement } from 'react';
import { Button } from '@mui/material';
import {ButtonProps} from '@mui/material/Button/Button';

const ButtonBlock = (props: ButtonProps): ReactElement => {
  return <Button {...props}>Button</Button>;
};

export default ButtonBlock;
