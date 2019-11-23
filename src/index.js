import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import store from './redux/store';
import { createMuiTheme, MuiThemeProvider, IconButton } from '@material-ui/core';
import { SnackbarProvider } from 'notistack';
import ClearIcon from '@material-ui/icons/Clear';

window.store = store;

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#0091ea'

        },
        secondary: {
            main: '#024966'
        },
        danger: {
            main: '#e30606'
        },
    }
});

ReactDOM.render(
    <SnackbarProvider maxSnack={2}>
        <Provider store={store}>
            <MuiThemeProvider theme={theme}>
                <App />
            </MuiThemeProvider>
        </Provider>
    </SnackbarProvider>, 
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
