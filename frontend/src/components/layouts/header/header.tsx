import { type ReactElement, useContext } from 'react';
import {
  AppBar as MuiAppBar,
  type AppBarProps as MuiAppBarProps,
  Box,
  IconButton,
  styled,
  Toolbar,
  useTheme,
} from '@mui/material';
import { DarkModeRounded, LightModeRounded, Login, Menu } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import UserMenu from './user-menu';
import useAuthorized from '../../../hooks/use-authorized.hook';
import { RouteEnum } from '../../../routes/enums/route.enum';
import { ThemeEnum } from '../../../config/theme/enums/theme.enum';
import { ColorModeContext } from '../../../config/theme/context/color-mode.context';
import { SidebarContext } from '../sidebar/context/sidebar.context';
import LanguageSelector from './language-selector';
import NotificationsPopup from './notifications-popup';

const drawerWidth = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
  // component?: string;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Header = (): ReactElement => {
  const isAuthorised = useAuthorized();
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const sidebar = useContext(SidebarContext);

  const toggleThemeMode = () => {
    colorMode.toggleColorMode();
  };

  return (
    <AppBar component="nav" open={sidebar.opened}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box>
          {isAuthorised && (
            <IconButton sx={{ color: theme.palette.background.default }} onClick={sidebar.toggle}>
              <Menu />
            </IconButton>
          )}
        </Box>
        <Box sx={{ display: 'flex' }}>
          <LanguageSelector />
          <IconButton sx={{ ml: 1 }} onClick={toggleThemeMode} color="inherit">
            {theme.palette.mode === ThemeEnum.LIGHT_MODE ? (
              <DarkModeRounded sx={{ color: theme.palette.background.default }} />
            ) : (
              <LightModeRounded sx={{ color: theme.palette.background.default }} />
            )}
          </IconButton>
          {isAuthorised ? (
            <>
              <NotificationsPopup />
              <UserMenu />
            </>
          ) : (
            <Link to={RouteEnum.SIGN_IN}>
              <IconButton sx={{ color: theme.palette.background.default }}>
                <Login />
              </IconButton>
            </Link>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
