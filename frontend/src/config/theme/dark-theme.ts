import { createTheme } from '@mui/material/styles';
import { ThemeEnum } from './enums/theme.enum';

const darkTheme = createTheme({
  palette: {
    mode: ThemeEnum.DARK_MODE,
    primary: {
      main: '#9155fd',
    },
    secondary: {
      main: '#414141',
    },
    error: {
      main: '#ff4c51',
    },
    background: {
      default: '#28243d',
      paper: '#312d4b',
    },
  },
});

export default darkTheme;
