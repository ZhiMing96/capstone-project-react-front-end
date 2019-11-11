import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import Paper from '@material-ui/core/Paper';
import Collapse from '@material-ui/core/Collapse';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone'
import { Typography, ListItem, ListItemAvatar, List, ListItemText, Avatar, Grid, Divider } from '@material-ui/core';
import api from '../api';

const useStyles = makeStyles(theme => ({
    root: {
    width:400, 
    height:500,
    backgroundColor:'whitesmoke',
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
    const [alerts, setAlerts] = useState(null);

    console.log(props);
    // useEffect(()=>{
    //     api.alerts.retrieve({"alert_type": "MEETUP_INVITE"})
    //     .then(res => {
    //         console.log(res.data)
    //         if (res.data.response_code === 200){
    //             console.log(res.data.alerts)
    //             setAlerts(res.data.alerts);
                
    //         }
    //     }).catch(err => console.log(err))
    // },[])

    useEffect(() => {
        // props.setAlertLength(alerts ? alerts.length : null)
    }, [alerts])

    const handleSeen = (alert) => { 
        api.alerts.seen({"alert_id": alert.alert_id })
    }

    

    const handleChange = () => {
        setChecked(prev => !prev);
    };

    

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
                        <ListItem style={{ paddingLeft:0 }}>
                            <ListItemAvatar style={{alignSelf:'flex-start', marginTop:9, marginRight:15}}>
                                <Avatar alt="Remy Sharp" src="" style={{width:50, height:50}}/>
                            </ListItemAvatar>
                            <ListItemText>
                                <Typography>
                                    New Meetup Invitation
                                </Typography>
                                <Typography>
                                    From Zhi Ming
                                </Typography>
                                <Typography>
                                    2 days ago
                                </Typography>

                            </ListItemText>
                        </ListItem>
                        <Divider variant="inset" component="li" />
                    </List>
                </Grid>
            </Grid>
            
           
        </Paper>
    )
}
