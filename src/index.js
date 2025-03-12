import React from 'react';
import ReactDOM from 'react-dom';
import './assets/styles.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration'; // Importación del service worker

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// Registrar el service worker para habilitar la funcionalidad PWA
serviceWorkerRegistration.register();
