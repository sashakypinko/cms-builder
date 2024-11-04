import React, { type ReactElement } from 'react';
import ReactDOM from 'react-dom/client';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { BrowserRouter as Router } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import Routes from './routes/routes';
import Header from './components/layouts/header';
import Footer from './components/layouts/footer';
import theme from './config/theme';

import './config/i18n';

const App = (): ReactElement => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Header />
        <Routes />
        <Footer />
      </Router>
    </ThemeProvider>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(<App />);

reportWebVitals();
