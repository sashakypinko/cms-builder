import { createTheme } from '@mui/material/styles';
import { ThemeEnum } from './enums/theme.enum';

const darkTheme = createTheme({
  palette: {
    mode: ThemeEnum.DARK_MODE,
    primary: {
      main: '#626262',
    },
    secondary: {
      main: '#414141',
    },
    error: {
      main: '#ff4c51',
    },
    background: {
      default: '#202021',
      paper: '#232323',
    },
    text: {
      primary: '#fff',
    },
  },
});

export default darkTheme;
