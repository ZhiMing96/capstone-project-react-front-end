import React, {useState, useEffect} from 'react';
import './App.css';
import NavBar from './Components/NavBar.js';
import { Link, Route, BrowserRouter, Switch } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { SnackbarProvider } from 'notistack';
import { useTheme } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
  root : {
    [theme.breakpoints.down('sm')]: {
      maxWidth:'80%',
      marginLeft: '10px'
    //   position: 'fixed',
    //   zIndex:'10px',
    //   // top: '16%',
    },
    
  }
}));

function App(props) {
  const classes = useStyles();

  return (
    <div className="App"> 
    <SnackbarProvider maxSnack={2} preventDuplicate
        classes={{
          anchorOriginBottomLeft: classes.root
        }}
    >
      <BrowserRouter>
        <Route 
          path='/'
          render={ props => <NavBar {...props} />}
        />
      </BrowserRouter>
    </SnackbarProvider>
    </div>
  );
}


export default App;
