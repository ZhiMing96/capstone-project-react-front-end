import React, {useState, useEffect, Component } from 'react';
import Sidebar from '../../Components/Sidebar';
import Grid from '@material-ui/core/Grid';
import { Paper, Typography, Box, Hidden, IconButton, makeStyles } from '@material-ui/core';
import Bookmarks from '../Bookmarks';
import Skills from './Skills/';
import Profile from './UserProfile'
import { Link, Route, BrowserRouter, Switch,Redirect } from 'react-router-dom';
import './index.css';
import MobileSideBar from '../../Components/MobileSideBar/MobileSideBar' ;
import Backdrop from '../../Components/MobileSideBar/Backdrop';
import MenuIcon from '@material-ui/icons/Menu';
import { connect } from "react-redux";
import Drawer from '@material-ui/core/Drawer';



const useStyles = makeStyles(theme => ({
  drawer: {
    width: '23%',
    flexShrink: 0,
    //position:'relative',
    //zIndex: 40
  },
  drawerPaper: {
    width: '23%',
    flexShrink: 0,
    zIndex: 40,
    marginTop: 64//appbar height
  },
}))

function Main(props) {
  const classes = useStyles();
    console.log("PRINTING PROPS OF PROFILE PAGE")
    console.log(props);

    // const[openSideBar, setOpenSideBar] = useState(false);
    // const drawerTogglerClickHandler = () =>{
    //   setOpenSideBar(!openSideBar);
    // }
    console.log(props.userId)

    // const backdropClickHandler = () => {
    //   setOpenSideBar(false);
    // }

    // let responsiveSideBar;
    // let backdrop;

    // if(openSideBar){
    //   // responsiveSideBar = <MobileSideBar show={openSideBar}/>;
    //   backdrop = <Backdrop click={backdropClickHandler}/>
    // }
    console.log(props.userId)
    if(window.localStorage.getItem('authToken') ===null){
      return(
      <Redirect to={{
        pathname: '/auth/signin',
        state:{from:props.location}
      }} /> )
    }
    return(
      <div style={{height:'100%'}}>

        {/* <MobileSideBar show={openSideBar} backdropClickHandler={backdropClickHandler}/> */}
        {/* {backdrop} */}
        <Grid container style={{width: '100%'}} >
        <Grid item sm={3} >
              <Hidden xsDown>
              <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
         <Sidebar/> 
         </Drawer>
        </Hidden>
        </Grid>
                {/*

               <Hidden smUp>
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

const mapStateToProps = state => {
  return { 
    userId: state.auth.user_id,
   }
  
};

export default connect(mapStateToProps)(Main);

