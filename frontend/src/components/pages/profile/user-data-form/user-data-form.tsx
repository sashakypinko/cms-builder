import { IUser } from '../../../../services/api/user/dto/user.dto';
import { Role } from '../../users/enums/role.enum';
import { TFunction } from 'i18next';
import * as Yup from 'yup';
import { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { Formik, FormikHelpers } from 'formik';
import ProfileFormContent from './profile-form-content';
import { UserApi } from '../../../../services/api/user';
import useSnackbar from '../../../../hooks/use-snackbar.hook';
import { getAuthUser } from '../../../../store/auth/slice';
import { useDispatch } from 'react-redux';

const initialValues: IUser = {
  firstName: '',
  lastName: '',
  email: '',
  isActive: false,
  verified: false,
  role: Role.MODERATOR,
  avatar: null,
};

const validationSchema = (t: TFunction) =>
  Yup.object().shape({
    firstName: Yup.string().required(() => t('validation.required')),
    lastName: Yup.string().required(() => t('validation.required')),
    email: Yup.string()
      .email()
      .required(() => t('validation.required')),
  });

interface Props {
  user: IUser | null;
  loading: boolean;
  onUpdated: () => void;
}

const UserDataForm = ({ user, loading, onUpdated }: Props): ReactElement => {
  const { t } = useTranslation();
  const { successSnackbar, errorSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const handleSave = async (values: IUser, { setSubmitting }: FormikHelpers<IUser>) => {
    try {
      await UserApi.update(values._id || '', values);
      successSnackbar('profile.update.success');
      onUpdated();
      dispatch(getAuthUser());
    } catch (e) {
      errorSnackbar('profile.update.error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={user || initialValues}
      onSubmit={handleSave}
      validationSchema={validationSchema(t)}
      enableReinitialize
      validateOnBlur
    >
      <ProfileFormContent loading={loading} />
    </Formik>
  );
};

export default UserDataForm;
