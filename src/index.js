import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { App } from './components/app/app';
import { BrowserRouter, HashRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));

const Router =
  process.env.REACT_APP_GH_PAGES === 'true' ? HashRouter : BrowserRouter;

root.render(
  <Router>
    <App />
  </Router>
);
