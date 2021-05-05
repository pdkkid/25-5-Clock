import React from 'react';
import ReactDOM from 'react-dom';
import { RecoilRoot } from 'recoil';
import { createGlobalStyle } from 'styled-components';
import { App } from './components/App';
import registerServiceWorker from './registerServiceWorker';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    background: #1A1B25;
    font-family: "Open Sans", sans-serif !important;
  }
`

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <GlobalStyle/>
      <App/>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root')
);
registerServiceWorker();