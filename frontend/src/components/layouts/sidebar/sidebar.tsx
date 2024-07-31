import {
  type CSSObject,
  Divider,
  Drawer as MuiDrawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
  type Theme,
  useTheme,
} from '@mui/material';
import { ChevronLeft, ChevronRight, TranslateRounded, LanguageRounded, PeopleRounded } from '@mui/icons-material';
import { type FC, useContext } from 'react';
import { SidebarContext } from './context/sidebar.context';
import useAuthorized from '../../../hooks/use-authorized.hook';
import { RouteEnum } from '../../../routes/enums/route.enum';
import { useTranslation } from 'react-i18next';
import Link from '../../../common/ui/link';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const sidebarLinks: Array<{ label: string; link: string; Icon: FC }> = [
  // {
  //   label: 'sidebar.main',
  //   link: RouteEnum.MAIN,
  //   Icon: DashboardRounded,
  // },
  {
    label: 'sidebar.users',
    link: RouteEnum.USERS,
    Icon: PeopleRounded,
  },
  {
    label: 'sidebar.languages',
    link: RouteEnum.LANGUAGES,
    Icon: LanguageRounded,
  },
  {
    label: 'sidebar.translations',
    link: RouteEnum.TRANSLATIONS,
    Icon: TranslateRounded,
  },
];

const Sidebar = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const sidebar = useContext(SidebarContext);
  const isAuthorised = useAuthorized();

  if (!isAuthorised) return null;

  return (
    <Drawer variant="permanent" open={sidebar.opened}>
      <DrawerHeader>
        <IconButton onClick={sidebar.toggle}>
          {theme.direction === 'rtl' ? <ChevronRight /> : <ChevronLeft />}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        {sidebarLinks.map(({ label, link, Icon }) => (
          <ListItem key={label} disablePadding sx={{ display: 'block' }}>
            <Link to={link}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: sidebar.opened ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: sidebar.opened ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <Icon />
                </ListItemIcon>
                <ListItemText primary={t(label)} sx={{ opacity: sidebar.opened ? 1 : 0 }} />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
