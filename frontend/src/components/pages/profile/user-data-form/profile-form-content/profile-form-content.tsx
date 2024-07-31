import { type ReactElement } from 'react';
import { Form, useFormikContext } from 'formik';
import { useTranslation } from 'react-i18next';
import { Grid } from '@mui/material';
import UserImage from './user-image';
import { IUser } from '../../../../../services/api/user/dto/user.dto';
import TextField from '../../../../../common/ui/text-field';
import Button from '../../../../../common/ui/button';

interface Props {
  loading: boolean;
}

const ProfileFormContent = ({ loading }: Props): ReactElement => {
  const { t } = useTranslation();
  const { values, setFieldValue, isSubmitting, dirty } = useFormikContext<IUser>();

  return (
    <Form>
      <Grid sx={{ mt: 3 }} container spacing={3}>
        <Grid display="flex" justifyContent="center" item xs={12} md={3}>
          <UserImage image={values.avatar} onChange={(file) => setFieldValue('avatar', file)} loading={isSubmitting} />
        </Grid>
        <Grid display="flex" flexDirection="column" item xs={12} md={6} lg={4}>
          <TextField label={t('firstName')} name="firstName" fullWidth />
          <TextField label={t('lastName')} name="lastName" fullWidth />
          <TextField label={t('email')} name="email" fullWidth />
        </Grid>
        <Grid sx={{ minHeight: 60 }} display="flex" justifyContent="end" item xs={12}>
          {dirty && (
            <Button variant="contained" type="submit" loading={isSubmitting}>
              Save
            </Button>
          )}
        </Grid>
      </Grid>
    </Form>
  );
};

export default ProfileFormContent;
