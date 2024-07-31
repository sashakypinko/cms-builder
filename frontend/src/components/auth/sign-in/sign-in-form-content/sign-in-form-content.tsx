import { type ReactElement } from 'react';
import { CircularProgress } from '@mui/material';
import { Login } from '@mui/icons-material';
import { Form, useFormikContext } from 'formik';
import { useTranslation } from 'react-i18next';
import { type SignUpRequestDto } from '../../../../services/api/auth/dto/sign-up-request.dto';
import TextField from '../../../../common/ui/text-field';
import PasswordField from '../../../../common/ui/password-field';
import Button from '../../../../common/ui/button';

const SignInFormContent = (): ReactElement => {
  const { isSubmitting } = useFormikContext<SignUpRequestDto>();
  const { t } = useTranslation();

  return (
    <Form>
      <TextField sx={{ mt: 1 }} label={t('email')} name="email" fullWidth autoFocus />
      <PasswordField sx={{ mt: 1 }} label={t('password')} name="password" fullWidth />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{
          mt: 1,
          mb: 2,
        }}
        startIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : <Login />}
        disabled={isSubmitting}
      >
        {t('auth.sign-in.button')}
      </Button>
    </Form>
  );
};

export default SignInFormContent;
