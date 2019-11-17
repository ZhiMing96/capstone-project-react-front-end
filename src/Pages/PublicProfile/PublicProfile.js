import React, { useState, useEffect,useRef } from 'react';
import { Grid, Typography, Box, List, Badge, Fab,IconButton,Snackbar } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';

export default function PublicProfile(props){
    var user_id 
    console.log(props)
    if(props.match !== undefined){
        user_id= props.match.params.id;
    } 

    return (
        <div>

        
        <Divider orientation="vertical" style={{ width: 7, height: 30, backgroundColor: '#1382B9', marginRight: 10 }} />
        <Typography>
            profile of user_ID {user_id}
        </Typography>
        </div>
    )




}
