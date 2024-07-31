import { type ReactElement, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import PageCard from '../../../common/ui/page-card';
import { Divider, Typography } from '@mui/material';
import UserDataForm from './user-data-form';
import { IUser } from '../../../services/api/user/dto/user.dto';
import { Navigate, useParams } from 'react-router-dom';
import useSnackbar from '../../../hooks/use-snackbar.hook';
import { UserApi } from '../../../services/api/user';
import { RouteEnum } from '../../../routes/enums/route.enum';

const Profile = (): ReactElement => {
  const { id } = useParams();
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const { t } = useTranslation();
  const { errorSnackbar } = useSnackbar();

  const getUser = async (id: string) => {
    try {
      setLoading(true);
      const user = await UserApi.deleteById(id);
      setUser(user);
    } catch (e) {
      errorSnackbar('profile.get-user.error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    id && getUser(id).then();
  }, [id]);

  if (!id) {
    return <Navigate to={RouteEnum.USERS} />;
  }

  return (
    <PageCard title={t('profile.title')}>
      <UserDataForm user={user} loading={loading} onUpdated={() => getUser(id).then()} />
      <Divider sx={{ mt: 3, mb: 3 }} />
      <Typography sx={{ padding: '0 24px' }} variant="h5">
        {t('profile.settings')}
      </Typography>
    </PageCard>
  );
};

export default Profile;
