import React, { type ReactElement, useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider, useDispatch } from 'react-redux';
import { io } from 'socket.io-client';
import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import { BrowserRouter as Router } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import store from './store';
import Routes from './routes/routes';
import Header from './components/layouts/header';
import Footer from './components/layouts/footer';
import { getAuthUser } from './store/auth/slice';
import { AuthStorage } from './services/storage/auth.storage';
import { ColorModeContext } from './config/theme/context/color-mode.context';
import useColorMode from './config/theme/hooks/use-color-mode.hook';
import Sidebar from './components/layouts/sidebar';
import useSidebarToggle from './components/layouts/sidebar/hooks/use-sidebar-toggle.hook';
import { SidebarContext } from './components/layouts/sidebar/context/sidebar.context';
import { getLanguages } from './store/languages/slice';
import NotificationsListener from './utils/notifications-listener';

import './config/i18n';
import { getNotifications } from './store/notifications/slice';
import Snackbar from './common/ui/snackbar';
import { Socket } from 'socket.io-client/build/esm/socket';

const App = (): ReactElement => {
  const dispatch = useDispatch();
  const { colorMode, currentTheme } = useColorMode();
  const sidebarToggle = useSidebarToggle();
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const user = AuthStorage.getUser();
    if (user !== null) {
      dispatch(getAuthUser());
      dispatch(getNotifications());
      setSocket(
        io(process.env.REACT_APP_WS_URL || 'ws://localhost:5000', {
          query: {
            userId: user._id,
          },
        }),
      );
    }
    dispatch(getLanguages());
  }, []);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <SidebarContext.Provider value={sidebarToggle}>
        <ThemeProvider theme={currentTheme}>
          <CssBaseline />
          <NotificationsListener socket={socket} />
          <Router>
            <Snackbar />
            <Box sx={{ display: 'flex' }}>
              <Header />
              <Sidebar />
              <Routes />
              <Footer />
            </Box>
          </Router>
        </ThemeProvider>
      </SidebarContext.Provider>
    </ColorModeContext.Provider>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);

reportWebVitals();
