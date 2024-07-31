import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#9155fd',
    },
    secondary: {
      main: '#1e88e5',
    },
    error: {
      main: '#ff4c51',
    },
    background: {
      default: '#f4f5fa',
    },
  },
});

export default theme;
