import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Collapse from '@material-ui/core/Collapse';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone'
import { Typography, ListItem, ListItemAvatar, List, ListItemText, Avatar, Grid, Divider, Button, IconButton, Tooltip } from '@material-ui/core';
import api from '../api';
import Social from '../Pages/Social/index';
import { Link, Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';
import CircularLoading from '../Components/LoadingBars/CircularLoading';
import NotificationsIcon from '@material-ui/icons/Notifications';
import NotificationsListSkeleton from './SkeletonLoading/NotificationsListSkeleton'
import ClearIcon from '@material-ui/icons/Clear'

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
    headerBar: {
        paddingLeft:'13%', 
        paddingTop:'5%', 
        backgroundColor:'#024966',
        position: 'sticky',
        top: '0px',
        zIndex: 10,
    },
    headerIcon : {
        marginTop: 0,
        width: 30,
        height: 30 , 
        verticalAlign: "text-top",
        transform: "rotate(340deg)" ,
        color:'whitesmoke',
        marginRight:10
    },
  }));

  const defaultAvatar = ""

  const defaultImg = "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"

export default function Notifications(props) {
    const classes = useStyles();
    const [checked, setChecked] = useState(false);
    const [alerts, setAlerts] = useState();
    const alertTypes = ["MEETUP_INVITE", "ACCEPT_INVITE", "CANCEL_MEETUP", "CHANGE_MEETUP_DATE", "COMPLETE_MEETUP", "RECOMMENDATION_REQUEST", "WRITE_RECOMMENDATION"]
    const alertHeaders = ["New Meetup Invitation", "Invitation Accepted", "Meetup Was Cancelled", "Meetup Date Changed", "Write a Recommendation", "New Recommendation Request", "Write a Recommendation", ]
    const [ loadingNotifications, setLoadingNotifications ] = useState(false);

    console.log(props);

    useEffect(()=>{
        console.log("**** NEW PROPS DETECTED ****")
        setAlerts(props.alerts)
        setLoadingNotifications(false);
    }, [props.alerts])
    

    const handleSeen = (alert) => { 
        setLoadingNotifications(true);
        api.alerts.seen({"alert_id": alert.alert_id })
        .then(res => {
            console.log(res.data);
            if(res.data.response_code === 200){
                console.log("** SUCCESSFULLY MARKED AS SEEN **")
                console.log("Loading Status = " + loadingNotifications)
                props.retrieveAlerts();
            }
        
        }).catch (err => {
            console.log(err)
        })
    }

    const calculateDaysAgo = (dateString) => {
        console.log("Entered Calculate Days Ago Method")
        
        const currentDate = new Date();
        const alertDate = new Date(dateString);
        console.log(currentDate)
        console.log(alertDate)
        const dayDifference = Math.floor((Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) - Date.UTC(alertDate.getFullYear(),alertDate.getMonth(), alertDate.getDate()) ) /(1000 * 60 * 60 * 24))

        const hourDifference = Math.floor(currentDate.getHours() - alertDate.getHours());
        const minuteDifference = Math.floor(currentDate.getMinutes() - alertDate.getMinutes());
    

        // const minuteDifference = Math.floor((Date.UTC(alertDate.getFullYear(), alertDate.getMonth(), alertDate.getDate(), alertDate.getTime()) - Date.UTC(currentDate.getFullYear(),currentDate.getMonth(), currentDate.getDate(), currentDate.getTime()) ) /(1000 * 60))

        console.log(dayDifference)
        console.log(hourDifference)
        console.log(minuteDifference)

        if(dayDifference > 0){
            return (dayDifference + " days ago")
        } else if (dayDifference === 0 && hourDifference > 0) {
            
            return (hourDifference + " hours ago")
        } else if (hourDifference===0 && minuteDifference > 0 ) {
            return (minuteDifference + " min ago")
        } else {
            return "seconds ago"
        }
        
        
    }

    

    return (
        <Paper className={classes.root} elevation={5}>
            <Grid container >
                <Grid item xs={12} className={classes.headerBar}>
                    <Typography style={{ fontWeight:'bold', fontSize:30, marginBottom:'5%', color:'whitesmoke' }}>
                        < NotificationsIcon  className={classes.headerIcon}/> Notifications
                    </Typography>
                </Grid>
                <Grid item xs={12} style={{paddingLeft:'10%'}}>
                    <List style={{ padding:0 }} >
                        { loadingNotifications 
                        ? <NotificationsListSkeleton/>
                        : alerts
                        ? alerts.map((alert, index) => (
                            <div>
                            <ListItem style={{ paddingLeft:0 }} >
                                <Link
                                to={{
                                    pathname: "/profile/social",
                                    state: alert.alert_type === "RECOMMENDATION_REQUEST" || alert.alert_type === "WRITE_RECOMMENDATION" || alert.alert_type === "COMPLETE_MEETUP" ? {tabIndex: 2} : {tabIndex: 1}
                                }}
                                style={{textDecoration:'none', color:'inherit'}}
                                >
                                <ListItemAvatar style={{alignSelf:'flex-start', marginTop:9, marginRight:15}} onClick={()=> handleSeen(alert)}>
                                    <Avatar src={alert.from_user && alert.from_user.social && alert.from_user.social.profile_image_link ? alert.from_user.social.profile_image_link : defaultImg } style={{width:50, height:50}}/>
                                </ListItemAvatar>
                                </Link>
                                <ListItemText>
                                    <Grid container justify="space-between" alignItems="center">
                                        <Grid item xs={9}>
                                            <Typography style={{fontSize:17, fontWeight:'bold'}} >
                                                {alertHeaders[alertTypes.indexOf(alert.alert_type)]}
                                            </Typography>
                                        </Grid>
                                        
                                        <Grid item xs={3} style={{textAlign:'end'}}>
                                            <Tooltip title="Mark as Seen" placement="bottom-start">
                                                <IconButton size="small" onClick={()=> handleSeen(alert)}>
                                                    <ClearIcon/>
                                                </IconButton>
                                            </Tooltip>
                                        </Grid>
                                        
                                    </Grid>
                                    <Typography>
                                        From User {alert.meetup_invite ? alert.meetup_invite.from_user : "Unknown"}
                                    </Typography>
                                    <Grid container justify="space-between" alignItems="center">
                                        <Grid item>
                                            <Typography>
                                                {calculateDaysAgo(alert.created_datetime)}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </ListItemText>
                            </ListItem>
                            <Divider  />
                            </div>
                        ))
                        : 
                        <div style={{padding:'5%'}}>
                            <Typography>
                            There are no Notifications at the Moment
                            </Typography>
                        </div>
                        }
                        
                    </List>
                
                </Grid>
            </Grid>
            
           
        </Paper>
    )
}
