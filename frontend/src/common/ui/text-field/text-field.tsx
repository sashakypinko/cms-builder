import type { ReactElement } from 'react';
import { TextField as CommonTextField } from '@mui/material';
import type { SxProps } from '@mui/system';
import type { Theme } from '@mui/material/styles';
import { useField } from 'formik';

interface Props {
  name: string;
  label: string;
  type?: string;
  margin?: 'dense' | 'normal' | 'none' | undefined;
  autoFocus?: boolean | undefined;
  fullWidth?: boolean | undefined;
  sx?: SxProps<Theme>;
}

const TextField = ({ name, ...props }: Props): ReactElement => {
  const [field, meta] = useField<string>(name);

  return (
    <CommonTextField
      {...props}
      id={name}
      name={name}
      value={field.value}
      helperText={meta.error && meta.touched ? meta.error : ' '}
      error={!!(meta.error && meta.touched)}
      onChange={field.onChange}
      onBlur={field.onBlur}
    />
  );
};

export default TextField;
