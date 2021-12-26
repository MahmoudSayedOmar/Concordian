import 'reflect-metadata';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/App';
import { HSSComponentProvider, ApplicationError } from '@crx-dev/hss-react-components';
import { pm, HSSInfrastructureProvider, ErrorBoundary } from '@crx-dev/hss-react-infrastructure';
import store from './app/store';

async function initializeApp() {
    await pm.initialize({
        brokerUrl: `wss://${process.env.REACT_APP_GATEWAY_IP_ADDRESS || window.location.hostname}:5005/mqtt`,
        clientCredentials:
            process.env.NODE_ENV === 'production' ? pm.getClientCredentials() : process.env.REACT_APP_CLIENT_CREDS!,
        scope: 'stockOrderManagmentAPI.read stockOrderManagmentAPI.write' // Change these to the scopes for your service
    });

    ReactDOM.render(
        <Provider store={store}>
            <ErrorBoundary errorComponent={() => <ApplicationError />}>
                <HSSInfrastructureProvider>
                    <HSSComponentProvider>
                        <App />
                    </HSSComponentProvider>
                </HSSInfrastructureProvider>
            </ErrorBoundary>
        </Provider>,
        document.getElementById('root')
    );
}

initializeApp();
