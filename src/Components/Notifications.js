import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Collapse from '@material-ui/core/Collapse';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone'
import { Typography, ListItem, ListItemAvatar, List, ListItemText, Avatar, Grid, Divider, Button } from '@material-ui/core';
import api from '../api';
import Social from '../Pages/Social/index';
import { Link, Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';
import CircularLoading from '../Components/LoadingBars/CircularLoading'

const useStyles = makeStyles(theme => ({
    root: {
    width:400, 
    height:"fit-content",
    backgroundColor:'white',
    maxHeight: 500, 
    overflowY: 'auto'
    },
    paper: {
      margin: theme.spacing(1),
      width: 200,
      height: 500,
    },
  }));

  const defaultAvatar = ""

export default function Notifications(props) {
    const classes = useStyles();
    const [checked, setChecked] = useState(false);
    const [alerts, setAlerts] = useState(props.alerts);
    const alertTypes = ["MEETUP_INVITE", "ACCEPT_INVITE" , "CANCEL_MEETUP", "CHANGE_MEETUP_DATE", "COMPLETE_MEETUP", "RECOMMENDATION_REQUEST", "WRITE_RECOMMENDATION"]
    const alertHeaders = ["New Meetup Invitation", "Invitation Accepted", "Meetup Was Cancelled", "Meetup Date Changed", "Meetup Completed", "New Recommendation Request", "Write a Recommendation", ]
    const [ loadingNotifications, setLoadingNotifications ] = useState(false);

    console.log(props);

    useEffect(()=>{
        console.log("**** NEW PROPS DETECTED ****")
        setAlerts(props.alerts)
        setLoadingNotifications(props.loading);
    }, [props])
    

    const handleSeen = (alert) => { 
        setLoadingNotifications(true);
        api.alerts.seen({"alert_id": alert.alert_id })
        .then(res => {
            console.log(res.data);
            if(res.data.response_code === 200){
                console.log("** SUCCESSFULLY MARKED AS SEEN **")
                props.retrieveAlerts();
            }
        setLoadingNotifications(false);
        }).catch (err => {
            console.log(err)
        })
    }

    

    return (
        <Paper className={classes.root} elevation={5}>
            <Grid container style={{paddingLeft:'10%'}}>
                <Grid item xs={12} style={{ paddingTop:'8%'}}>
                    <Typography style={{ fontWeight:'bold', fontSize:20 }}>
                        Notifications
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <List style={{ padding:0 }} >
                        { loadingNotifications 
                        ? <CircularLoading/>
                        : alerts
                        ? alerts.map((alert, index) => (
                            <Link
                            to={{
                                pathname: "/profile/social",
                                state: { tabIndex: 1 }
                              }}
                            style={{textDecoration:'none', color:'inherit'}}
                            >
                                <ListItem style={{ paddingLeft:0 }} onClick={() => handleSeen(alert)}>
                                    <ListItemAvatar style={{alignSelf:'flex-start', marginTop:9, marginRight:15}}>
                                        <Avatar alt="Remy Sharp" src="" style={{width:50, height:50}}/>
                                    </ListItemAvatar>
                                    <ListItemText>
                                        <Typography>
                                            {alertHeaders[alertTypes.indexOf(alert.alert_type)]}
                                        </Typography>
                                        <Typography>
                                            From Zhi Ming
                                        </Typography>
                                        <Grid container justify="space-between" alignItems="center">
                                            <Grid item>
                                                <Typography>
                                                    2 days ago
                                                </Typography>
                                            </Grid>
                                            <Grid item>
                                                <Button size="small" onClick={()=> handleSeen(alert)}>
                                                    Mark as Seen
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </ListItemText>
                                </ListItem>
                                <Divider variant="inset" component="li" />
                            </Link>
                        ))
                        : "There are no Notifications at the Moment"
                        }
                        
                    </List>
                </Grid>
            </Grid>
            
           
        </Paper>
    )
}
