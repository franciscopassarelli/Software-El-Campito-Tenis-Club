import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

// Crear un tema personalizado con Material UI
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Azul principal
    },
    secondary: {
      main: '#f50057', // Rosa secundario
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif', // Tipografía estándar
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    {/* Proveedor del tema global */}
    <ThemeProvider theme={theme}>
      {/* Reseteo de CSS para estilos base */}
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

// Medir rendimiento de la aplicación
reportWebVitals();
