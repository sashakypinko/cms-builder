import React, { type ReactElement, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider, useDispatch } from 'react-redux';
import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import { BrowserRouter as Router } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import store from './store';
import Routes from './routes/routes';
import Header from './components/layouts/header';
import Footer from './components/layouts/footer';
import { setAuthData } from './store/actions/auth';
import { AuthStorage } from './services/storage/auth.storage';
import { ColorModeContext } from './config/theme/context/color-mode.context';
import useColorMode from './config/theme/hooks/use-color-mode.hook';
import Sidebar from './components/layouts/sidebar';
import useSidebarToggle from './components/layouts/sidebar/hooks/use-sidebar-toggle.hook';
import { SidebarContext } from './components/layouts/sidebar/context/sidebar.context';
import { getLanguages } from './store/actions/languages';

import './config/i18n';
import SuccessSnackbar from './common/ui/snackbar';
// import NotificationsListener from './utils/notifications-listener';
// import { createWebSocketConnection } from './utils/web-socket';

const App = (): ReactElement => {
  const dispatch = useDispatch();
  const { colorMode, currentTheme } = useColorMode();
  const sidebarToggle = useSidebarToggle();
  // const socket = await createWebSocketConnection(process.env.REACT_APP_WS_URL || '')

  useEffect(() => {
    const user = AuthStorage.getUser();
    if (user != null) {
      dispatch(setAuthData({ user }));
    }
    dispatch(getLanguages());
  }, []);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <SidebarContext.Provider value={sidebarToggle}>
        <ThemeProvider theme={currentTheme}>
          <CssBaseline />
          {/*          <NotificationsListener socket={} />         */}
          <Router>
            <SuccessSnackbar />
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
