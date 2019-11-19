import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Collapse from '@material-ui/core/Collapse';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone'
import { Typography, ListItem, ListItemAvatar, List, ListItemText, Avatar, Grid, Divider, Button, IconButton, Tooltip } from '@material-ui/core';
import api from '../../api';
import { Link, Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';
import CircularLoading from '../LoadingBars/CircularLoading';
import NotificationsIcon from '@material-ui/icons/Notifications';
import NotificationsListSkeleton from '../SkeletonLoading/NotificationsListSkeleton'
import ClearIcon from '@material-ui/icons/Clear'
import EmploymentDetails from '../EmploymentDetails';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import NotificationsListItem from './NotificationsListItem'

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
    listItem: {
        backgroundColor:'whitesmoke',
        '&:hover': {
            backgroundColor: 'white'
        } 
    }
  }));

  const defaultAvatar = ""

  const defaultImg = "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"

export default function Notifications(props) {
    const classes = useStyles();
    const [alerts, setAlerts] = useState();
    const [ loadingNotifications, setLoadingNotifications ] = useState(false);

    console.log(props);

    useEffect(()=>{
        console.log("**** NEW PROPS DETECTED ****")
        setAlerts(props.alerts)
        setLoadingNotifications(false);
    }, [props.alerts])
    

    

    return (
        <Paper className={classes.root} elevation={5}>
            <Grid container >
                <Grid item xs={12} className={classes.headerBar}>
                    <Typography style={{ fontWeight:'bold', fontSize:30, marginBottom:'5%', color:'whitesmoke' }}>
                        < NotificationsIcon  className={classes.headerIcon}/> Notifications
                    </Typography>
                </Grid>
                <Grid item xs={12} style={{}}>
                    <List style={{ padding:0, }} >
                        { loadingNotifications 
                        ? <NotificationsListSkeleton/>
                        : alerts
                        ? alerts.map((alert, index) => (
                            <div >
                            <NotificationsListItem alert={alert} />
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
