import React, { FC, ReactElement, useCallback, useEffect, useState } from 'react';
import { CircularProgress, styled, Typography } from '@mui/material';
import { PasswordRecoveryProps, PasswordRecoverySteps, RecoveryStepProps } from '../pasword-recovery';
import * as Yup from 'yup';
import { Form, Formik, FormikHelpers, useFormikContext } from 'formik';
import { AuthStorage } from '../../../../services/storage/auth.storage';
import Button from '../../../../common/ui/button';
import useSnackbar from '../../../../hooks/use-snackbar.hook';
import { AuthApi } from '../../../../services/api/auth';
import Container from '../container';
import CodeInput from '../../../../common/ui/code-input';
import { RouteEnum } from '../../../../routes/enums/route.enum';
import Link from '../../../../common/ui/link';
import dayjs from 'dayjs';

const StyledLink = styled('a')(
  () => `
  margin-top: 4px;
  text-decoration: none;
  font-size: 14px;
  cursor: pointer;
`,
);

interface EnterCodeForm {
  code: string;
}

const enterCodeValidationSchema = () =>
  Yup.object().shape({
    code: Yup.string()
      .min(4, 'Please enter your code')
      .required(() => 'Please enter your code'),
  });

const enterCodeInitialValues: EnterCodeForm = {
  code: '',
};

const FormContent = ({ email, sendCode }: PasswordRecoveryProps): ReactElement => {
  const [timer, setTimer] = useState<number>(0);
  const { values, setFieldValue, isSubmitting, errors } = useFormikContext<EnterCodeForm>();
  const [loading, setLoading] = useState(false);

  const updateTimer = (timerValue: number) => {
    if (timerValue >= 0) {
      setTimer(timerValue);
      setTimeout(() => {
        updateTimer(timerValue - 1);
      }, 1000);
    }
  };

  const handleResend = useCallback(() => {
    setLoading(true);
    email &&
      sendCode(email).then(() => {
        updateTimer(100);
        AuthStorage.storeLastCodeSendTime(dayjs(new Date()).unix());
        setLoading(false);
      });
  }, [email, sendCode]);

  useEffect(() => {
    updateTimer(100 - (dayjs(new Date()).unix() - (AuthStorage.getLastCodeSendTime() || 0)) || 0);
  }, []);

  return (
    <Form>
      <CodeInput length={6} value={values.code} onChange={(code) => setFieldValue('code', code)} />
      <Button
        sx={{ mt: 4 }}
        type="submit"
        fullWidth
        variant="contained"
        disabled={isSubmitting || !!errors.code}
        loading={isSubmitting}
      >
        Continue
      </Button>
      <Link to={RouteEnum.SIGN_IN}>
        <Button sx={{ mt: 2, mb: 2 }} fullWidth variant="outlined" disabled={isSubmitting}>
          Back to log in
        </Button>
      </Link>
      <Typography sx={{ textAlign: 'center', mb: 10 }}>
        Didn&apos;t receive the email?
        {timer > 0 ? (
          ` resend in ${timer} sec`
        ) : !loading ? (
          <StyledLink onClick={handleResend}> Click to resend</StyledLink>
        ) : (
          <CircularProgress sx={{ ml: 3 }} size={18} />
        )}
      </Typography>
    </Form>
  );
};

const EnterCode: FC<RecoveryStepProps & PasswordRecoveryProps> = ({
  onStepChange,
  setToken,
  ...props
}: PasswordRecoveryProps & RecoveryStepProps): ReactElement => {
  const { errorSnackbar } = useSnackbar();

  const handleSubmit = async (values: EnterCodeForm, { setSubmitting }: FormikHelpers<EnterCodeForm>) => {
    if (!props.email) return;
    try {
      const { token } = await AuthApi.applyResetPasswordCode({ ...values, email: props.email });
      setToken && setToken(token);
      onStepChange(PasswordRecoverySteps.SET_PASSWORD);
    } catch (e) {
      errorSnackbar('This code is not valid!');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container title="Password reset" description={`We sent a code to ${props.email}`}>
      <Formik
        initialValues={enterCodeInitialValues}
        onSubmit={handleSubmit}
        validationSchema={enterCodeValidationSchema()}
        enableReinitialize
      >
        <FormContent {...props} />
      </Formik>
    </Container>
  );
};

export default EnterCode;
