import { type ReactElement } from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { type SignInRequestDto } from '../../../services/api/auth/dto/sign-in-request.dto';
import { signIn } from '../../../store/auth/slice';
import { RouteEnum } from '../../../routes/enums/route.enum';
import Card from '../../../common/ui/card';
import { type TFunction } from 'i18next';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { Formik, type FormikHelpers } from 'formik';
import SignInFormContent from './sign-in-form-content';
import Link from '../../../common/ui/link';
import useSnackbar from '../../../hooks/use-snackbar.hook';
import { HttpStatusCode } from 'axios';
import EmailTemplateEditor from '../../email-template-editor';

const signInInitialValues: SignInRequestDto = {
  email: '',
  password: '',
};

const validationSchema = (t: TFunction) =>
  Yup.object().shape({
    email: Yup.string()
      .email(() => t('validation.invalid-email'))
      .required(() => t('validation.required')),
    password: Yup.string().required(() => t('validation.required')),
  });

const SignIn = (): ReactElement => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { errorSnackbar } = useSnackbar();

  const handleSubmit = (
    values: SignInRequestDto,
    { resetForm, setSubmitting, setErrors }: FormikHelpers<SignInRequestDto>,
  ) => {
    dispatch(
      signIn({
        data: values,
        onSuccess: resetForm,
        onError: ({ statusCode, error } = {}) => {
          if (statusCode === HttpStatusCode.BadRequest) {
            setErrors({
              email: t(`validation.${error}`),
            });
          }
          setSubmitting(false);
          errorSnackbar(t('auth.sign-in.sign-in-error'));
        },
      }),
    );
  };

  return (
    <Container sx={{ mt: 15 }} component="main" maxWidth="sm">
      <Card>
        <Typography component="h1" variant="h5">
          {t('auth.sign-in.title')}
        </Typography>
        <Box sx={{ mt: 1 }}>
          <Formik
            initialValues={signInInitialValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchema(t)}
            validateOnBlur
          >
            <SignInFormContent />
          </Formik>
          <Grid container>
            <Grid item xs>
              <Link to={RouteEnum.PASSWORD_RECOVERY}>{t('auth.sign-in.forgot')}</Link>
            </Grid>
            <Grid item>
              <Link to={RouteEnum.SIGN_UP}>{t('auth.sign-in.sign-up-link')}</Link>
            </Grid>
          </Grid>
        </Box>
      </Card>
    </Container>
  );
};

export default SignIn;
