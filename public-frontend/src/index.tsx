import React, { type ReactElement } from 'react';
import ReactDOM from 'react-dom/client';
import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import { BrowserRouter as Router } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import Routes from './routes/routes';
import Header from './components/layouts/header';
import Footer from './components/layouts/footer';
import Sidebar from './components/layouts/sidebar';
import useSidebarToggle from './components/layouts/sidebar/hooks/use-sidebar-toggle.hook';
import { SidebarContext } from './components/layouts/sidebar/context/sidebar.context';
import theme from './config/theme';

import './config/i18n';

const App = (): ReactElement => {
  const sidebarToggle = useSidebarToggle();

  return (
    <SidebarContext.Provider value={sidebarToggle}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Box sx={{ display: 'flex' }}>
            <Header />
            <Sidebar />
            <Routes />
            <Footer />
          </Box>
        </Router>
      </ThemeProvider>
    </SidebarContext.Provider>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

reportWebVitals();
