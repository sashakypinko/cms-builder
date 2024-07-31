import * as Yup from 'yup';
import { FC, ReactElement } from 'react';
import { Form, Formik, FormikHelpers, useFormikContext } from 'formik';
import { PasswordRecoveryProps, RecoveryStepProps } from '../pasword-recovery';
import TextField from '../../../../common/ui/text-field';
import Button from '../../../../common/ui/button';
import Container from '../container';
import { RouteEnum } from '../../../../routes/enums/route.enum';
import Link from '../../../../common/ui/link';

interface SendCodeForm {
  email: string;
}

const sendCodeValidationSchema = () =>
  Yup.object().shape({
    email: Yup.string()
      .email(() => 'This email is invalid')
      .required(() => 'Please enter your email'),
  });

const sendCodeInitialValues: SendCodeForm = {
  email: '',
};

const FormContent = (): ReactElement => {
  const { isSubmitting } = useFormikContext<SendCodeForm>();

  return (
    <Form>
      <TextField label="Enter your email" name="email" fullWidth />
      <Button sx={{ mt: 4 }} type="submit" fullWidth variant="contained" disabled={isSubmitting} loading={isSubmitting}>
        Send verification code
      </Button>
      <Link to={RouteEnum.SIGN_IN}>
        <Button sx={{ mt: 2 }} fullWidth variant="outlined" disabled={isSubmitting}>
          Back to log in
        </Button>
      </Link>
    </Form>
  );
};

const SendCode: FC<RecoveryStepProps & PasswordRecoveryProps> = ({
  onStepChange,
  ...props
}: PasswordRecoveryProps & RecoveryStepProps): ReactElement => {
  const handleSubmit = (values: SendCodeForm, { setSubmitting }: FormikHelpers<SendCodeForm>) => {
    props.sendCode(values.email).then(() => {
      setSubmitting(false);
    });
  };

  return (
    <Container title="Forgot Password?" description="No worries, we’ll send you reset instructions">
      <Formik
        initialValues={sendCodeInitialValues}
        onSubmit={handleSubmit}
        validationSchema={sendCodeValidationSchema()}
        enableReinitialize
      >
        <FormContent />
      </Formik>
    </Container>
  );
};

export default SendCode;
