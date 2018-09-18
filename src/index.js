import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from 'react-redux';
import {store, persistor} from './store';
import { PersistGate } from 'redux-persist/integration/react';

ReactDOM.render(
    <PersistGate loading={true} persistor={persistor}>
        <Provider store={store}>
                <App />
        </Provider>
    </PersistGate>

, document.getElementById('root'));
registerServiceWorker();
