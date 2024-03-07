import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, CircularProgress, Container, Grid, Typography } from '@mui/material';
import { CheckCircleOutlineRounded, HighlightOffRounded } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import Card from '../../../common/ui/card';
import useQuery from '../../../hooks/use-query.hook';
import Link from '../../../common/ui/link';
import { RouteEnum } from '../../../routes/enums/route.enum';
import { verify } from '../../../store/actions/auth';
import { selectAuth } from '../../../store/selectors';

const Verify = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { code } = useQuery();
  const { loading, error } = useSelector(selectAuth);

  useEffect(() => {
    dispatch(verify(code));
  }, [code]);

  return (
    <Container sx={{ mt: 15 }} component="main" maxWidth="sm">
      <Card>
        <Typography component="h1" variant="h5">
          {t(loading ? 'auth.verify.in-progress' : error ? 'auth.verify.error' : 'auth.verify.success')}
        </Typography>
        <Box sx={{ mt: 1 }}>
          {
            loading
              ? <CircularProgress sx={{m: 3}} size={200} color="inherit" />
              : error
                ? <HighlightOffRounded sx={{m: 3, fontSize: 200}} color="error"/>
                : <CheckCircleOutlineRounded sx={{m: 3, fontSize: 200}} color="success"/>
          }
        </Box>
        <Grid container>
          <Grid item>
            <Link to={RouteEnum.SIGN_IN}>{t('auth.verify.sign-in-link')}</Link>
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
};

export default Verify;
