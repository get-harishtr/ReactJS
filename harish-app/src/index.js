import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { store } from './_helpers';
import { App } from './App';

// setup fake backend
import { configureFetchIntercepter } from './_helpers';
import * as serviceworker from './CustomServiceWorker';

configureFetchIntercepter();

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
);

serviceworker.register();