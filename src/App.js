import React, {useState, useEffect} from 'react';
import './App.css';
import NavBar from './Components/NavBar.js';
import { Link, Route, BrowserRouter, Switch } from 'react-router-dom';

function App() {

  return (
    <div className="App"> 
      <BrowserRouter>
        <Route 
          path='/'
          render={ props => <NavBar {...props} />}
        />
      </BrowserRouter>
      
    </div>
  );
}


export default App;
