import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Typography, ListItem, ListItemAvatar, List, ListItemText, Avatar, Grid, Divider, Button } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Skeleton from '@material-ui/lab/Skeleton';

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


export default function NotificationsListSkeleton() {
    const classes = useStyles();
    const demoArray = [1,2,3,4]


    return (
        <List style={{ padding:0 }} >
             {demoArray.map((alert, index) => (
                <div key={index}>
                    <ListItem style={{ paddingLeft:0 }} >
                        <ListItemAvatar style={{alignSelf:'flex-start', marginTop:9, marginRight:15}}>
                            <Skeleton variant='circle' style={{width:50, height:50}} />
                        </ListItemAvatar>
                        <ListItemText>
                            <Skeleton />
                            <Skeleton />
                        </ListItemText>
                    </ListItem>
                    <Divider  />
                </div>
            ))}
            
        </List>
                
    )
}
