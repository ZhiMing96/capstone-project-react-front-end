import React, { Fragment,useState, useEffect, Component } from 'react';
import Sidebar from '../../Components/Sidebar';
import Grid from '@material-ui/core/Grid';
import { Paper, Typography, Box, Hidden, IconButton } from '@material-ui/core';
import Bookmarks from '../Bookmarks';
import Skills from './Skills/';
import Profile from './PublicProfile/'
import { Link, Route, BrowserRouter, Switch } from 'react-router-dom';
import './index.css';
import MobileSideBar from '../../Components/MobileSideBar/MobileSideBar' ;
import Backdrop from '../../Components/MobileSideBar/Backdrop';
import MenuIcon from '@material-ui/icons/Menu';

function Main(props) {
  
    console.log("PRINTING PROPS OF PROFILE PAGE")
    console.log(props);

    // const[openSideBar, setOpenSideBar] = useState(false);
    // const drawerTogglerClickHandler = () =>{
    //   setOpenSideBar(!openSideBar);
    // }

    // const backdropClickHandler = () => {
    //   setOpenSideBar(false);
    // }

    // let responsiveSideBar;
    // let backdrop;

    // if(openSideBar){
    //   // responsiveSideBar = <MobileSideBar show={openSideBar}/>;
    //   backdrop = <Backdrop click={backdropClickHandler}/>
    // }

    return(
      <div style={{height:'100%'}}>

        {/* <MobileSideBar show={openSideBar} backdropClickHandler={backdropClickHandler}/> */}
        {/* {backdrop} */}
        <Grid container style={{width: '100%'}} >
              <Hidden xsDown>
                <Grid item className="sidebar" sm={3} wrap="wrap">
                    <Sidebar/> 
                </Grid>
              </Hidden>
              {/* <Hidden smUp>
                <Grid item sm={1}>
                  <IconButton onClick={drawerTogglerClickHandler}>
                    <MenuIcon/>
                  </IconButton>
                </Grid>
              </Hidden> */}
              <Grid item sm={9} xs={12} style={{width:'100%', paddingRight:'2%', paddingLeft:'2%'}}>
                {/*<Typography component="div">
                  <Box 
                    fontSize="h6.fontSize" 
                    m={1} 
                    letterSpacing={3}
                    fontWeight="fontWeightBold" 
                  >
                    PROFILE
                  </Box>
                </Typography>*/}
              
                <Switch>
                  <Route exact path="/profile" component={Profile} />
                  <Route path="/profile/bookmarks" component={Bookmarks} />
                  <Route path="/profile/skills" component={Skills} />
                </Switch>
              </Grid> 
          
          </Grid>
      </div>
    );
  
  
}

export default Main;