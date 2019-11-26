import React, { useEffect, useState } from 'react';
import { Grid, Typography, Box, Snackbar, Tabs, Tab, Link } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import Reco from './Recommendations'
import Invitations from './Invitations';
import Search from './Search';
import { Route, Switch, Redirect } from 'react-router-dom';

function TabPanel(props) {
    console.log(props);
    const { children, tabState, index} = props;
  
    return (
      <Typography
        component="div"
        hidden={tabState !== index}
        style={{width:'inherit'}}
      >
        <Box m={2} >{children}</Box>
      </Typography>
    );
}

const useStyles = makeStyles(theme => ({
    '@global': {
      body: {
        backgroundColor: theme.palette.common.white,
      },
    },
    tabs: {
      margin: theme.spacing(1),
      alignItems: 'center',
      flexGrow: 0.5,
    },
    tabLabel:{
        fontSize:'medium',
        letterSpacing: 2,
    }
  
}));

export default function Social(props) {
    
    console.log("**** PROPS FOR SOCIAL INDEX ******")
    console.log(props)
    const classes = useStyles();
    const [tabState, setTabState] = React.useState(0)
    const [ redirect, setRedirect ] = useState(false);
    const [ refresh, setRefresh ] = useState(false);
    const [ tabChange, setTabChange ] = useState(false);
    

    const redirectProfile=(user_id)=>{
        props.history.replace({ 
            pathname: '/profile/social', 
            state: {tabIndex: tabState}
        })
        props.history.push({
            pathname: "/profile/public",
            state: { user_id: user_id }
        })
    }


    useEffect(() => {
        setRefresh(!refresh);
        setTabChange(!tabChange);
        setTabState(props.location.state && props.location.state.tabIndex ? props.location.state.tabIndex : 0)
    }, [props.location.state])


    if(props.match.params && props.match.params.index ){
        if(props.match.params.index === `0`){
            props.history.push({
                pathname: "/profile/social",
                state: { tabIndex : 0 }
            })
        } else if(props.match.params.index === `1`){
            props.history.push({
                pathname: "/profile/social",
                state: { tabIndex : 1 }
            })
        } else if(props.match.params.index === `2`){
            props.history.push({
                pathname: "/profile/social",
                state: { tabIndex : 2 }
            })
        }
        
    }

    if (window.localStorage.getItem('authToken') === null) {
        return (
          <Redirect to={{
            pathname: '/auth/signin',
            state: { from: props.location }
          }} />
        )
    }

    const handleChangeIndex = (event, index) => {
        setTabChange(!tabChange)
        setTabState(index)
    };
    console.log("Printing TAB STATE")
    console.log(tabState)

    return (
        <div>
            <Typography component="div">
                <Box
                    fontSize="h5.fontSize"
                    m={3.5}
                    letterSpacing={3}
                    fontWeight="fontWeightBold"
                >
                    SOCIAL ACTIVITY
              </Box>
            </Typography>

            <Grid container justify="center" fullWidth>
                
                    <Tabs
                        value={tabState}
                        onChange={handleChangeIndex}
                        textColor="primary"
                        variant='fullWidth'
                        centered
                        indicatorColor="primary"
                        className = {classes.tabs}
                    >

                        <Tab label={<span className={classes.tabLabel}>Find a match</span>} disableRipple className = {classes.tabs}/>

                        <Tab label={<span className={classes.tabLabel}>Invitations</span>} disableRipple className = {classes.tabs}/>

                        <Tab label={<span className={classes.tabLabel}>Recommendations</span>} disableRipple className = {classes.tabs}/>
                    </Tabs>
                </Grid>
                <Grid container fullWidth>
                    <TabPanel tabState={tabState} index={0}>
                        <Search redirectProfile={redirectProfile}/>

                    </TabPanel>
                    <TabPanel tabState={tabState} index={1}>
                        <Invitations redirectProfile={redirectProfile} refresh={refresh} tabChange={tabChange}/>
                    </TabPanel>
                    <TabPanel tabState={tabState} index={2} >
                        <Reco redirectProfile={redirectProfile} refresh={refresh} tabChange={tabChange}/>
                    </TabPanel>
                </Grid>
            
          
        </div >
    )
}