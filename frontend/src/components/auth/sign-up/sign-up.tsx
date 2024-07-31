import { type ReactElement } from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { type TFunction } from 'i18next';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { Formik, type FormikHelpers } from 'formik';
import { HttpStatusCode } from 'axios';
import { signUp } from '../../../store/auth/slice';
import { type SignUpRequestDto } from '../../../services/api/auth/dto/sign-up-request.dto';
import Card from '../../../common/ui/card';
import { RouteEnum } from '../../../routes/enums/route.enum';
import SignUpFormContent from './sign-up-form-content';
import Link from '../../../common/ui/link';
import useSnackbar from '../../../hooks/use-snackbar.hook';
import { useNavigate } from 'react-router-dom';

const signUpInitialValues: SignUpRequestDto = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const validationSchema = (t: TFunction) =>
  Yup.object().shape({
    firstName: Yup.string()
      .min(2, () => t('validation.too-short'))
      .max(20, () => t('validation.too-long'))
      .required(() => t('validation.required')),
    lastName: Yup.string()
      .min(2, () => t('validation.too-short'))
      .max(20, () => t('validation.too-long'))
      .required(() => t('validation.required')),
    email: Yup.string()
      .email(() => t('validation.invalid-email'))
      .required(() => t('validation.required')),
    password: Yup.string()
      .required(() => t('validation.required'))
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/, () => t('validation.password-not-strength')),
    confirmPassword: Yup.string()
      .required(() => t('validation.required'))
      .oneOf([Yup.ref('password')], () => t('validation.password-mismatch')),
  });

const SignUp = (): ReactElement => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { successSnackbar, errorSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const handleSubmit = (
    values: SignUpRequestDto,
    { resetForm, setSubmitting, setErrors }: FormikHelpers<SignUpRequestDto>,
  ) => {
    dispatch(
      signUp({
        data: values,
        onSuccess: () => {
          resetForm();
          successSnackbar(t('auth.sign-up.success'));
          navigate(RouteEnum.SIGN_IN);
        },
        onError: ({ statusCode, error } = {}) => {
          if (statusCode === HttpStatusCode.BadRequest) {
            setErrors({
              email: t(`validation.${error}`),
            });
          }
          setSubmitting(false);
          errorSnackbar(t('auth.sign-up.error'));
        },
      }),
    );
  };

  return (
    <Container sx={{ mt: 15 }} component="main" maxWidth="sm">
      <Card>
        <Typography component="h1" variant="h5">
          {t('auth.sign-up.title')}
        </Typography>
        <Box sx={{ mt: 1 }}>
          <Formik
            initialValues={signUpInitialValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchema(t)}
            validateOnBlur
          >
            <SignUpFormContent />
          </Formik>
        </Box>
        <Grid container>
          <Grid item>
            <Link to={RouteEnum.SIGN_IN}>{t('auth.sign-up.sign-in-link')}</Link>
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
};

export default SignUp;
