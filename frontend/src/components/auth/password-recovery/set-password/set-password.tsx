import { FC, ReactElement } from 'react';
import { PasswordRecoveryProps, PasswordRecoverySteps, RecoveryStepProps } from '../pasword-recovery';
import { Form, Formik, FormikHelpers, useFormikContext } from 'formik';
import * as Yup from 'yup';
import PasswordField from '../../../../common/ui/password-field';
import Button from '../../../../common/ui/button';
import useSnackbar from '../../../../hooks/use-snackbar.hook';
import { AuthApi } from '../../../../services/api/auth';
import Container from '../container';
import { RouteEnum } from '../../../../routes/enums/route.enum';
import Link from '../../../../common/ui/link';

interface SetPasswordForm {
  password: string;
  passwordConfirm: string;
}

const setPasswordValidationSchema = () =>
  Yup.object().shape({
    password: Yup.string()
      .required('Use at least 8 characters. Include both an uppercase, lowercase, number, and special character')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        'Password must contain at least 8 characters with at least one of each: uppercase, lowercase, number, and special character',
      ),
    passwordConfirm: Yup.string()
      .oneOf([Yup.ref('password'), ''], 'Passwords must match')
      .required(() => 'Please confirm new password'),
  });

const setPasswordInitialValues: SetPasswordForm = {
  password: '',
  passwordConfirm: '',
};

const FormContent = (): ReactElement => {
  const { isSubmitting } = useFormikContext<SetPasswordForm>();

  return (
    <Form>
      <PasswordField label="New Password" name="password" fullWidth />
      <PasswordField label="Confirm Password" name="passwordConfirm" fullWidth />
      <Button sx={{ mt: 4 }} type="submit" fullWidth variant="contained" disabled={isSubmitting} loading={isSubmitting}>
        Reset password
      </Button>
      <Link to={RouteEnum.SIGN_IN}>
        <Button sx={{ mt: 2 }} fullWidth variant="outlined" disabled={isSubmitting}>
          Back to log in
        </Button>
      </Link>
    </Form>
  );
};

const SetPassword: FC<RecoveryStepProps & PasswordRecoveryProps> = ({
  onStepChange,
  email,
  token,
}: RecoveryStepProps & PasswordRecoveryProps): ReactElement => {
  const { errorSnackbar } = useSnackbar();

  const handleSubmit = async (values: SetPasswordForm, { setSubmitting }: FormikHelpers<SetPasswordForm>) => {
    if (email && token) {
      try {
        await AuthApi.resetPassword({ ...values, email, token });
        onStepChange(PasswordRecoverySteps.DONE);
      } catch (e) {
        errorSnackbar('Error while updating your password');
      } finally {
        setSubmitting(false);
      }
    }
  };

  return (
    <Container title="Set new passord" description="Must be at least 8 characters">
      <Formik
        initialValues={setPasswordInitialValues}
        onSubmit={handleSubmit}
        validationSchema={setPasswordValidationSchema()}
        enableReinitialize
      >
        <FormContent />
      </Formik>
    </Container>
  );
};

export default SetPassword;
