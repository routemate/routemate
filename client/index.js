import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('app')
);

// import React from 'react';
// import App from './App.js';
// import './stylesheets/style.scss';
// import { createRoot } from 'react-dom/client';

// const container = document.getElementById('root');
// const root = createRoot(container);

// root.render(<App />);
