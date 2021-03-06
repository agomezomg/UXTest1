import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom'

import registerServiceWorker from './registerServiceWorker';
import './index.css';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme();

ReactDOM.render(
    <BrowserRouter>
      <App/>
    </BrowserRouter>,
  document.getElementById('root')
);
registerServiceWorker();
