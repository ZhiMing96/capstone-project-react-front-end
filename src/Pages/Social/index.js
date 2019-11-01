import React from 'react';
import { Grid, Typography, Box, Snackbar, Tabs, Tab, Link } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import Reco from './Recommendations'
import Invitations from './Invitations';

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

export default function Social() {
    const classes = useStyles();
    const [tabState, setTabState] = React.useState(1)

    const handleChangeIndex = (event, index) => {
        setTabState(index)
    };
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
                    <TabPanel  tabState={tabState} index={0}>
                        Find a match
                    </TabPanel>
                    <TabPanel tabState={tabState} index={1}>
                        <Invitations/>
                    </TabPanel>
                    <TabPanel tabState={tabState} index={2}>
                        <Reco/>
                    </TabPanel>
                </Grid>
            
          
        </div >
    )
}