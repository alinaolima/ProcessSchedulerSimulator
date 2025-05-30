import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { CustomThemeProvider } from './context/ThemeContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <CustomThemeProvider>
    <App />
  </CustomThemeProvider>
);
