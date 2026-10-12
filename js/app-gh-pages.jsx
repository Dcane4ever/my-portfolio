import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import App from './app.jsx';

document.documentElement.classList.remove('no-js');
hydrateRoot(document.getElementById('root'), <App />);
