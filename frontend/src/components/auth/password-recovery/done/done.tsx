import { FC, ReactElement } from 'react';

import { PasswordRecoveryProps, RecoveryStepProps } from '../pasword-recovery';
import Container from '../container';
import Button from '../../../../common/ui/button';
import Link from '../../../../common/ui/link';
import { RouteEnum } from '../../../../routes/enums/route.enum';

const Done: FC<RecoveryStepProps & PasswordRecoveryProps> = (): ReactElement => {
  return (
    <Container title="All done!" description="Your password has been reset so now you can log in to your account">
      <Link to={RouteEnum.SIGN_IN}>
        <Button sx={{ mt: 4 }} fullWidth variant="contained">
          Log in
        </Button>
      </Link>
    </Container>
  );
};

export default Done;
