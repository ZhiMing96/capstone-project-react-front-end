import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Collapse from '@material-ui/core/Collapse';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone'
import { Typography, ListItem, ListItemAvatar, List, ListItemText, Avatar, Grid, Divider, Button, IconButton, Tooltip, InputBase } from '@material-ui/core';
import api from '../../api';
import { Link, Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';
import CircularLoading from '../LoadingBars/CircularLoading';
import NotificationsIcon from '@material-ui/icons/Notifications';
import NotificationsListSkeleton from '../SkeletonLoading/NotificationsListSkeleton'
import ClearIcon from '@material-ui/icons/Clear'
import EmploymentDetails from '../EmploymentDetails';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import NotificationsListItem from './NotificationsListItem'
import NotificationCategory from './NotificationCategory';
import SearchIcon from '@material-ui/icons/Search';

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
        
        // backgroundColor:'#024966',
        backgroundColor:'white',
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
        // color:'whitesmoke',
        color:'black',
        marginRight:10
    },
    listItem: {
        backgroundColor:'whitesmoke',
        '&:hover': {
            backgroundColor: 'white'
        } 
    },
    input: {
        width: '100%',
        flex: 1,
        paddingLeft:'4%',
    },
    searchBar: {
        borderRadius: 25, 
        borderColor:'black',
        
        marginLeft:'10%',
        marginRight:'10%',
        borderStyle: "solid",
        borderWidth: 1,
        marginBottom: '3%',
        paddingLeft:'2%',
        display:'flex',
    }
  }));

  const defaultAvatar = ""

  const defaultImg = "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"

export default function Notifications(props) {
    const classes = useStyles();
    const [alerts, setAlerts] = useState();
    const [ loadingNotifications, setLoadingNotifications ] = useState(false);
    const [ keyword, setKeyword ] = useState(null);

    const [ sorttedAlerts, setSorttedAlerts ] = useState([
        {
            type: "MEETUP_INVITE", title: "New Meetup Invitations",
            alerts: [], 
        },
        {
            type: "ACCEPT_INVITE", title: "Invitations Accepted",
            alerts: [], 
        },
        {
            type: "CANCEL_MEETUP", title: "Cancelled Meetups",
            alerts: [], 
        },
        {
            type: "CHANGE_MEETUP_DATE", title: "Meetup Date Modified",
            alerts: [], 
        },
        {
            type: "COMPLETE_MEETUP", title: "Meetup Completed",
            alerts: [], 
        },
        {
            type: "RECOMMENDATION_REQUEST", title: "Recommendation Requests",
            alerts: [], 
        },
        {
            type: "WRITE_RECOMMENDATION", title: "Write a Recommendation",
            alerts: [], 
        },
    ])


    console.log(props);

    const resetAlerts = () =>{
        for(let b=0 ; b < sorttedAlerts.length  ; b++) {
            var arr = [...sorttedAlerts];
            arr[b].alerts = [];
            setSorttedAlerts(arr)
        }
    }

    useEffect(()=>{
        console.log("ENTERED Use Effect for Notifications")
        resetAlerts();
        console.log("**** NEW PROPS DETECTED ****")
        const alerts = props.alerts
        if(alerts) {
            for(let i=0; i < alerts.length ; i++ ) {
                console.log("Start of I FOR Loop Number " + i)
                for(let a=0; a<sorttedAlerts.length ; a++){
                    console.log("Start of A FOR Loop Number " + a)
                    if(alerts[i].alert_type === sorttedAlerts[a].type){
                        var temp = [...sorttedAlerts]
                        temp[a].alerts.push(alerts[i]);
                        setSorttedAlerts(temp);
                        break;
                    }
                }
                
            }   
        }
        // setAlerts(props.alerts)
        setLoadingNotifications(false);
    }, [props])

    const handleChange = event => {
        event.preventDefault();
        console.log(event.target.value)
        setKeyword(event.target.value);
    }
    

    console.log("PRINTING ALERTS");
    console.log(sorttedAlerts);

    return (
        <Paper className={classes.root} elevation={5}>
            <Grid container >
                <Grid item xs={12} className={classes.headerBar}>
                    <Typography style={{ fontWeight:'bold', fontSize:30, marginBottom:'5%', color:'black', paddingLeft:'13%', paddingTop:'5%',  }}>
                        < NotificationsIcon  className={classes.headerIcon}/> Notifications
                    </Typography>
                    <Paper className={classes.searchBar} elevation={0}>
                        <SearchIcon style={{alignSelf:'center'}}/>
                        <InputBase
                        className={classes.input}
                        placeholder="Type your keyword(s)..."
                        required
                        value={keyword}
                        onChange={handleChange}
                        />
                    </Paper>
                </Grid>
                <Grid item xs={12} style={{}}>
                    <List style={{ padding:0, }} >
                        { loadingNotifications 
                        ? <NotificationsListSkeleton/>
                        : sorttedAlerts
                        ?
                        sorttedAlerts.map((category, index) => (
                            <NotificationCategory alerts={category.alerts} alertType={category.title}
                            retrieveAlerts={props.retrieveAlerts}/>
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
