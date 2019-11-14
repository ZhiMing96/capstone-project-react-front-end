import React, { Fragment, useState, useEffect, useRef } from 'react'
import { Grid, Typography, Box, Button, CssBaseline, Paper, ButtonBase, Slide, IconButton, Snackbar, Hidden} from '@material-ui/core'
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import {Bookmark as BookmarkIcon, Schedule as ScheduleqIcon, Done as DoneIcon, NearMe as NearMeIcon, Event as EventIcon, Room as LocationIcon, PriorityHigh as PriorityHighIcon, Filter} from '@material-ui/icons';
import CloseIcon from '@material-ui/icons/Close';
import Skeleton from '@material-ui/lab/Skeleton';

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    paper: {
      padding: '1%',
      textAlign: 'center',
      margin: 20,
      boxShadow:'none',
      '&:hover':{
        boxShadow:'0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12)'
      },
      height:'fit-content'
      
    },
    image: {
        width: '60%',
        height: '10vh',
        marginLeft:"20%"
      },
    img: {
        margin: 'auto',
        display: 'block',
        width: 100,
        height:100,
        maxWidth: '100%',
        maxHeight: '100%',
        blockSize:'auto'
    },
    close: {
        padding: theme.spacing(0.5),
    },
    smallIcons: {
        width: 15,
        height: 12,
        margin: 2,
    },
    filterArea: {
        [theme.breakpoints.up('sm')]: {
            paddingRight:20,
        },
        [theme.breakpoints.down('xs')]: {
            justifyContent:'flex-start',
            marginLeft:20
        },
    },
    
    
  }));

export default function JobListingsSkeletonLoading() {
    const classes = useStyles();
    const demoArray=[1,2,3,4,5,6,7,8,9,10];
    return (
        <div>
            {demoArray.map((list,index) => (
            <div key={index} >
                <Skeleton variant='rect' className={classes.paper} >
                    <Box display="flex" flexWrap="wrap">
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={2} xl={1} style={{alignSelf:'center'}}>
                            <Box display={{ xs: 'none', sm: 'block' }}>
                                <Skeleton className={classes.image} />
                            </Box>
                        </Grid>
                        <Grid item container xs={12} sm={10} xl={11}>
                            <Grid item xs={10} md={8} >
                                <Grid item xs>
                                    <Skeleton style={{marginLeft:10}}/> 
                                    <Skeleton style={{marginLeft:10}}/> 
                                    <Skeleton style={{marginLeft:10}}/> 
                                </Grid>
                            </Grid>
                            
                            <Grid item xs={12} md={4} container style={{paddingRight:15, paddingBottom:15,}}>
                                    
                                <Grid item md={12} sm={6} xs style={{textAlignLast:'end'}}>
                                    <Skeleton style={{marginLeft:10}}/>
                                    <Skeleton style={{marginLeft:10}}/>
                                    <Skeleton variant="rect" className={classes.button}  style={{marginLeft:10}}/>
                                </Grid>

                            </Grid>
                        </Grid>
                    </Grid>
                    
                    </Box>
                    
                </Skeleton>
            </div>
        ))}
        </div>
    )
}
