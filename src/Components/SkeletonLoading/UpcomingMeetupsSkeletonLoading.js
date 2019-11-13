import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Skeleton from '@material-ui/lab/Skeleton';
import { Grid, Button, CssBaseline, IconButton, Paper, Typography, Divider, Box, InputBase, Container, ButtonBase, Snackbar, SnackbarContent, Avatar, Fab, Card, CardContent, List, ListItemAvatar, ListItem, ListItemText } from '@material-ui/core';


const useStyles = makeStyles(theme => ({
    root:{

    },
    sectionHeading: {
        fontSize:20, 
        fontWeight:'bold', 
        color:'#0091ea',
        marginBottom:'2%',
        // marginTop:'2%',
        textAlign:'left',
    },
    carouselPaper: {
        width:'80%',
        textAlign: '-webkit-center', 
        padding:15, 
        marginBottom:5,
        marginTop:10,
        marginLeft:'5%',
        height:'fit-content'
    },
    carouselAvatar: {
        margin:'5%',
        width:85, 
        height:85, 
        boxShadow:'0px 1px 5px 0px rgba(0,0,0,0.2)',
    },
    listAvatar: {
        margin:'5%',
        width:60, 
        height:60, 
        boxShadow:'0px 1px 5px 0px rgba(0,0,0,0.2)',
    },
    carouselUsername: {
        marginTop:'6%',
        fontWeight:'bold', 
        fontSize:18,
        whiteSpace:'normal', 
        overflow:'hidden',
        textOverflow:'ellipsis',
        display:'-webkit-box',
        WebkitLineClamp:1,
        WebkitBoxOrient:'vertical',
    },
    card: {
        display: 'flex',
    }, 
    userDetails :{
        display: 'flex',
        flexDirection: 'column',
    },
    controlButtons :{
        width: 30,
        height: 30,
    },


}));
export default function UpcomingMeetupsSkeletonLoading() {

    const demoArray = [1,2,];
    const classes=useStyles();



    return (
        <div>
            {demoArray.map((meetup, index) => (
                <div >
                    <Skeleton variant='rect' style={{width:'33vw', height:'fit-content', padding:'5%',marginBottom:'4%'}}>
                        <Grid container item xs={12}>
                            <Grid item xs={2}> 
                                <Skeleton variant='circle'
                                    className={classes.listAvatar}
                                />
                            </Grid>
                            <Grid item xs={6} style={{textAlign:'left', paddingLeft:'2%', margin:'10px'}}> 
                                <Skeleton/>
                                <Skeleton/>
                                <Skeleton/>
                            </Grid>
                            <Grid container item xs={3} direction="row" justify="space-between"> 
                                <Grid item  xs={12} style={{margin:'10px'}}>
                                    <Skeleton/>
                                </Grid>   
                                <Grid item container xs={12}>
                                    <Grid item xs={6} style={{textAlign:'-webkit-center', alignSelf:'center'}}>
                                        <Skeleton variant='circle'
                                        className={classes.controlButtons}
                                        />
                                    </Grid>
                                    <Grid item xs={6} style={{textAlign:'-webkit-center', alignSelf:'center'}}>
                                        <Skeleton/>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Skeleton>
                </div>
            
            ))}
        </div>
    )
}
