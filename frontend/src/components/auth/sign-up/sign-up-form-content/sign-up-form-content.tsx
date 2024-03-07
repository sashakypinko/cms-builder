import { type ReactElement } from 'react';
import { Button, CircularProgress } from '@mui/material';
import { PersonAdd } from '@mui/icons-material';
import { Form, useFormikContext } from 'formik';
import { useTranslation } from 'react-i18next';
import { type SignUpRequestDto } from '../../../../services/api/auth/dto/sign-up-request.dto';
import TextField from '../../../../common/ui/text-field';
import PasswordField from '../../../../common/ui/password-field';

const SignUpFormContent = (): ReactElement => {
  const { isSubmitting } = useFormikContext<SignUpRequestDto>();
  const { t } = useTranslation();

  return (
    <Form>
      <TextField sx={{ mt: 1 }} label={t('first-name')} name="firstName" autoFocus fullWidth />
      <TextField sx={{ mt: 1 }} label={t('last-name')} name="lastName" fullWidth />
      <TextField sx={{ mt: 1 }} label={t('email')} name="email" fullWidth />
      <PasswordField sx={{ mt: 1 }} label={t('password')} name="password" fullWidth />
      <PasswordField sx={{ mt: 1 }} label={t('confirm-password')} name="confirmPassword" fullWidth />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{
          mt: 1,
          mb: 2,
        }}
        startIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : <PersonAdd />}
        disabled={isSubmitting}
      >
        {t('auth.sign-up.button')}
      </Button>
    </Form>
  );
};

export default SignUpFormContent;
