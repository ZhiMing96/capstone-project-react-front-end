import React, { useState, useEffect, } from 'react'
import { Typography, ListItem, ListItemAvatar, List, ListItemText, Avatar, Grid, Divider, Button, IconButton, Tooltip, Collapse, makeStyles } from '@material-ui/core';

import NotificationsListItem from  './NotificationsListItem'; 
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';


const useStyles = makeStyles(theme => ({
    root: {
        width:'100%',
        backgroundColor: '#ECF3FA',
    },
    paper: {
      margin: theme.spacing(1),
      width: 200,
      height: 500,
    },

}));

export default function NotificationCategory(props) {
    const classes = useStyles();
    const { alertType, alerts } = props;
    const [ openSection, setOpenSection ] = useState(false);


    const handleClick = () => {
        setOpenSection(!openSection);
    };


    return (
        <div>
            <ListItem button onClick={handleClick} className={classes.root}>
                <ListItemText primary={alertType ? alertType : "Section Header" } />
                {openSection ? <ExpandLess /> : <ExpandMore /> }
            </ListItem>
            <Collapse in={openSection} timeout="auto" unmountOnExit>
                <List style={{ padding:0, }}>
                    {alerts
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
            </Collapse>
        </div>
    )
}
