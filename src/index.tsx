import React from 'react';
import ReactDOM from 'react-dom';
import { createGlobalStyle } from 'styled-components';
import { App } from './components/App';
import registerServiceWorker from './registerServiceWorker';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    background: #95a5a6;
    font-family: "Open Sans", sans-serif !important;
  }
`

ReactDOM.render(
  <React.StrictMode>
      <GlobalStyle/>
      <App/>
  </React.StrictMode>,
  document.getElementById('root')
);
registerServiceWorker();