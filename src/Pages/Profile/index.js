import React, { Fragment } from 'react';
import Sidebar from '../../Components/Sidebar';
import Grid from '@material-ui/core/Grid';
import { Paper, Typography, Box } from '@material-ui/core';
import Bookmarks from './Bookmarks';
import Skills from './Skills';
import Profile from './Profile'
import { Link, Route, BrowserRouter, Switch } from 'react-router-dom';


function main() {
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
      
        <Grid item xs={3} >
            <Sidebar/> 
        </Grid>
      
      
        <Grid item xs={9}>
    
            {/*<Typography component="div">
              <Box 
                fontSize="h6.fontSize" 
                m={3.5} 
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

export default main;