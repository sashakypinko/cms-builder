import { FC, ReactElement, useEffect, useState } from 'react';
import Done from './done';
import EnterCode from './enter-code';
import SendCode from './send-code';
import SetPassword from './set-password';
import useQuery from '../../../hooks/use-query.hook';
import useSnackbar from '../../../hooks/use-snackbar.hook';
import { AuthApi } from '../../../services/api/auth';
import { Container } from '@mui/material';
import Card from '../../../common/ui/card';

export enum PasswordRecoverySteps {
  SEND_CODE,
  ENTER_CODE,
  SET_PASSWORD,
  DONE,
}

export interface RecoveryStepProps {
  onStepChange: (step: PasswordRecoverySteps) => void;
}

export interface PasswordRecoveryProps {
  email?: string;
  token?: string;
  setToken?: (token: string) => void;
  sendCode: (sendTo: string) => Promise<void>;
}

type StepsType = {
  [key in PasswordRecoverySteps]: FC<RecoveryStepProps & PasswordRecoveryProps>;
};

const steps: StepsType = {
  [PasswordRecoverySteps.SEND_CODE]: SendCode,
  [PasswordRecoverySteps.ENTER_CODE]: EnterCode,
  [PasswordRecoverySteps.SET_PASSWORD]: SetPassword,
  [PasswordRecoverySteps.DONE]: Done,
};

const PasswordRecovery = (): ReactElement => {
  const [step, setStep] = useState(PasswordRecoverySteps.SEND_CODE);
  const [email, setEmail] = useState<string>('');
  const [token, setToken] = useState<string>('');

  const { params, setParams } = useQuery();
  const { successSnackbar, errorSnackbar } = useSnackbar();

  const sendCode = async (sendTo: string) => {
    try {
      await AuthApi.sendResetPasswordCode(sendTo);
      successSnackbar('Code sent successfully');
      setEmail(sendTo);
      setParams({ email: sendTo, step: PasswordRecoverySteps.ENTER_CODE });
      setStep(PasswordRecoverySteps.ENTER_CODE);
    } catch (e) {
      errorSnackbar('Error while sending a code. Please try again');
    }
  };

  const changeStep = (step: PasswordRecoverySteps) => {
    setStep(step);
    setParams({ step });
  };

  useEffect(() => {
    params.step && setStep(parseInt(params.step) as PasswordRecoverySteps);
    params.email && setEmail(params.email);
  }, []);

  const ActivePage = steps[step];

  return (
    <Container sx={{ mt: 15 }} component="main" maxWidth="sm">
      <Card>
        <ActivePage onStepChange={changeStep} email={email} token={token} setToken={setToken} sendCode={sendCode} />
      </Card>
    </Container>
  );
};

export default PasswordRecovery;
