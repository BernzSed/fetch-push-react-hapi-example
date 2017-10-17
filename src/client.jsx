import React from 'react';
import ReactDOM  from 'react-dom';
import App from './components';

ReactDOM.hydrate(
  <App fetch={fetch} />,
  document.getElementById('react-view')
);
