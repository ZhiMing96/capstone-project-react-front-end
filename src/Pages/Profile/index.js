import React, { Fragment } from 'react';
import Sidebar from '../../Components/Sidebar';
import Grid from '@material-ui/core/Grid';
import { Paper, Typography, Box } from '@material-ui/core';
import Bookmarks from '../Bookmarks/index'
import Manage from './Manage';
import Skills from '../Skills/index';
import { Link, Route, BrowserRouter, Switch } from 'react-router-dom';


function Profile() {
  return(

    <Grid container >
      <Grid item sm={3} wrap="wrap">
          <Sidebar/> 
      </Grid>
      <Grid item sm={9} xs={11}>
        <Typography component="div">
          <Box 
            fontSize="h6.fontSize" 
            m={1} 
            letterSpacing={3}
            fontWeight="fontWeightBold" 
          >
            PROFILE
          </Box>
        </Typography>
      
        <Switch>
          <Route path="/profile/manage" component={Manage} />
          <Route path="/profile/bookmarks" component={Bookmarks} />
          <Route path="/profile/skills" component={Skills} />

        </Switch>
      </Grid> 
    </Grid>
 
  );
}

export default Profile;