import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import BucketList from './src/client/BucketList';
import './styles/styles.scss';

ReactDOM.render(
  <BrowserRouter>
    <BucketList />
  </BrowserRouter>,
  document.querySelector('#root')
);
