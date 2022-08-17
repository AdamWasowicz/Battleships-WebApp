import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { store } from './redux/store';
import App from './components/App/App';



const root = document.getElementById('root')! as HTMLElement;

ReactDOM.render(
  
  <Provider store={store}>
    <App/>
  </Provider>,
  root
);

