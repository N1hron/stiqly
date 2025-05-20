import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import { store } from './store/index.ts';
import { App } from './app/App.tsx';

import './index.scss';

const rootElem = document.getElementById('root')!;
const root = createRoot(rootElem);

root.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
