import { type ReactElement } from 'react';
import { Form, useFormikContext } from 'formik';
import { type SignUpRequestDto } from '../../../../../services/api/auth/dto/sign-up-request.dto';
import { useTranslation } from 'react-i18next';
import TextField from '../../../../../common/ui/text-field';
import { CircularProgress, styled } from '@mui/material';
import Button from '../../../../../common/ui/button';

const Actions = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'end',
}));

interface Props {
  onClose: () => void;
}

const LanguageFormContent = ({ onClose }: Props): ReactElement => {
  const { isSubmitting } = useFormikContext<SignUpRequestDto>();
  const { t } = useTranslation();

  return (
    <Form>
      <TextField sx={{ mt: 1 }} label={t('code')} name="code" fullWidth />
      <Actions>
        <Button disabled={isSubmitting} onClick={onClose}>
          {t('cancel')}
        </Button>
        <Button
          type="submit"
          endIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : null}
          disabled={isSubmitting}
        >
          {t('save')}
        </Button>
      </Actions>
    </Form>
  );
};

export default LanguageFormContent;
