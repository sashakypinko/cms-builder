import { type ReactElement } from 'react';
import { Container, Grid, IconButton, Typography } from '@mui/material';
import { CheckCircleOutlineOutlined, ErrorOutlineOutlined, InfoOutlined } from '@mui/icons-material';
import useSnackbar from '../../../hooks/use-snackbar.hook';

const Main = (): ReactElement => {
  const { successSnackbar, errorSnackbar, infoSnackbar } = useSnackbar();

  return (
    <>
      <Container maxWidth="xl">
        <Grid sx={{ mt: 10 }} container spacing={2}>
          <Grid item md={12}>
            <Typography variant="h4" gutterBottom>
              Main
            </Typography>
          </Grid>
          <Grid item md={12}>
            <Typography variant="h6" gutterBottom>
              Test Snackbars:
            </Typography>
            <IconButton
              color="success"
              onClick={() => {
                successSnackbar('Success');
              }}
            >
              <CheckCircleOutlineOutlined />
            </IconButton>
            <IconButton
              color="error"
              onClick={() => {
                errorSnackbar('Error');
              }}
            >
              <ErrorOutlineOutlined />
            </IconButton>
            <IconButton
              color="info"
              onClick={() => {
                infoSnackbar('Info');
              }}
            >
              <InfoOutlined />
            </IconButton>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Main;
