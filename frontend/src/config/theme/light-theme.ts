import { createTheme } from '@mui/material/styles';
import { ThemeEnum } from './enums/theme.enum';

const lightTheme = createTheme({
  palette: {
    mode: ThemeEnum.LIGHT_MODE,
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

export default lightTheme;
