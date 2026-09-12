import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import CssBaseline from "@mui/material/CssBaseline";
import './index.css';
import App from './pages/App/App';
import { ThemeProvider } from "@mui/styles";
import { createTheme } from "@mui/material/styles";
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { rootReducer } from './services/reducers';

const root = ReactDOM.createRoot(document.getElementById('root'));
const store = createStore(rootReducer);
const themes = createTheme()
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={themes} >
        <CssBaseline />
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);



