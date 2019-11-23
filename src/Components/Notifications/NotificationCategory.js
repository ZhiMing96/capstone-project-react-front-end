import React, { useState, useEffect, } from 'react'
import { Typography, ListItem, ListItemAvatar, List, ListItemText, Avatar, Grid, Divider, Button, IconButton, Tooltip, Collapse, makeStyles, Badge } from '@material-ui/core';

import NotificationsListItem from  './NotificationsListItem'; 
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';


const useStyles = makeStyles(theme => ({
    root: {
        width:'100%',
        backgroundColor: '#ECF3FA',
        height:'4vh',
        marginBottom:'1%',
        justifyContent: 'space-between',
    },
    paper: {
      margin: theme.spacing(1),
      width: 200,
      height: 500,
    },
    headingText : { 
        // textAlign: 'center',
        fontWeight:200,
        letterSpacing:1,

    },
    title:{
        textAlign:'Left',
        fontWeight:550, 
        letterSpacing:1,
        overflow: 'hidden', 
        textOverflow: 'ellipsis',
        display:'-webkit-box', 
        WebkitLineClamp:1,
        WebkitBoxOrient:'vertical',
        fontSize: 15,
        color:'grey'
    }

}));

export default function NotificationCategory(props) {
    const classes = useStyles();
    const { alertType, alerts, retrieveAlerts, handleClosePopover } = props;
    const [ openSection, setOpenSection ] = useState(false);
    const horizontal = 'right';
    const vertical = 'center';

    useEffect(()=>{
        console.log("ENTERED Use Effect for NotificationCATEGORY")
    },[props])


    const handleClick = () => {
        setOpenSection(!openSection);
    };


    return (
        <div>
            <ListItem button onClick={handleClick} className={classes.root} disabled={alerts.length !== 0 ? false : true} >
                
                    <Typography className={classes.title} style={{ }}>
                        {alertType ? alertType : "Section Header" } 
                    </Typography>
                
                <span style={{display:'inline-flex'}}>
                    {alerts.length !== 0
                        ? 
                        <span style={{borderRadius:25, paddingLeft:'7%', paddingRight:'7%', borderStyle:'solid', borderWidth:1, alignSelf:'center', width:'90px', borderColor:'maroon'}}>
                            <Typography style={{fontSize:10, textAlign:'center', color:'maroon'}}> 
                                {alerts.length} Notifications
                            </Typography>
                        </span>
                        : ""
                    } 
                    <IconButton disabled={alerts.length === 0 ? true : false} style={{ padding:0 }}>
                        {openSection && alerts.length !== 0 ? <ExpandLess /> : <ExpandMore /> }
                    </IconButton>
                    
                </span>
                {/* <ListItemText primary={alertType ? alertType : "Section Header" } className={classes.headingText} /> */}
            </ListItem>
            <Collapse in={openSection} timeout="auto" unmountOnExit>
                <List style={{ padding:0 }}>
                    {alerts
                        ? alerts.map((alert, index) => (
                            <div >
                            <NotificationsListItem alert={alert} retrieveAlerts={retrieveAlerts} handleClosePopover={ handleClosePopover }/>
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
            </Collapse>
        </div>
    )
}
