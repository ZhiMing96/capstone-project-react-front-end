import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import store from './redux/store';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import { lightBlue } from '@material-ui/core/colors';

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
})

ReactDOM.render(
    <Provider store={store}>
        <MuiThemeProvider theme={theme}>
            <App />
        </MuiThemeProvider>
    </Provider>, 
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
