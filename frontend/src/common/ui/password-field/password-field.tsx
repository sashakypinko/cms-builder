import { type MouseEvent, type ReactElement, useState } from 'react';
import { FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useField } from 'formik';
import { type SxProps } from '@mui/system';
import { type Theme } from '@mui/material/styles';

interface Props {
  name: string;
  label: string;
  margin?: 'dense' | 'normal' | 'none' | undefined;
  autoFocus?: boolean | undefined;
  fullWidth?: boolean | undefined;
  sx?: SxProps<Theme>;
}

const PasswordField = ({ name, label, ...props }: Props): ReactElement => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [field, meta] = useField<string>(name);

  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const error = !!(meta.error && meta.touched);

  return (
    <FormControl {...props} variant="outlined">
      <InputLabel htmlFor={name} error={error}>
        {label}
      </InputLabel>
      <OutlinedInput
        id={name}
        type={showPassword ? 'text' : 'password'}
        value={field.value}
        error={error}
        onChange={field.onChange}
        onBlur={field.onBlur}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
              color={error ? 'error' : 'inherit'}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        label={label}
      />
      <FormHelperText error={error}>{meta.error && meta.touched ? meta.error : ' '}</FormHelperText>
    </FormControl>
  );
};

export default PasswordField;
