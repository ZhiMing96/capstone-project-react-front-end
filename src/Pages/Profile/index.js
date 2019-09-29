import React, { Fragment } from 'react';
import Sidebar from '../../Components/Sidebar';
import Grid from '@material-ui/core/Grid';
import { Paper, Typography, Box } from '@material-ui/core';
import Bookmarks from '../Bookmarks';
import Skills from './Skills/';
import Profile from './Profile'
import { Link, Route, BrowserRouter, Switch } from 'react-router-dom';


function main() {
  return(

    <Grid container style={{width: '100%'}} >
      <Grid item sm={3} wrap="wrap">
          <Sidebar/> 
      </Grid>
      <Grid item sm={9} xs={11} style={{width:'100%', paddingRight:'2%'}}>
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
  );
}

export default main;