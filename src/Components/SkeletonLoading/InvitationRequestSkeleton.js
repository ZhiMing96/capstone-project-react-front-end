import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Skeleton from '@material-ui/lab/Skeleton';
import { Grid, Button, CssBaseline, IconButton, Paper, Typography, Divider, Box, InputBase, Container, ButtonBase, Snackbar, SnackbarContent, Avatar, Fab, Card, CardContent, List, ListItemAvatar, ListItem, ListItemText } from '@material-ui/core';

const Wrapper = styled.div`
    width:97%
`;

const Page = styled.div`
    width:90%
`;

const carouselSettings = {
    accessibiliy: true,
    speed:1000,
    slidesToShow: 5,
    slidesToScroll: 1,
    infinite: false,
    dots:false,
    //autoplay: true,
    arrows:true,
    //autoplaySpeed:8000,
    draggable:true,
    //lazyLoad: "progressive",
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1920, //lg
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: false,
        }
      },
      {
        breakpoint: 1280, //md
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: false,
        }
      },
      {
        breakpoint: 1000, //md
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          //infinite: true,
        }
      },
      {
        breakpoint: 600, //sm
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          //initialSlide: 2
          infinite: false,
        }
      },
      {
        breakpoint: 480, //xs
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: false,
        }
      }]
  };

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


export default function InvitationRequestSkeleton() {

    const demoArray = [1,2,3,4,5];
    const classes=useStyles();

    return (
            <Wrapper>
                    <Slider {...carouselSettings}>
                        {demoArray.map((demo, index) => (
                            <div key={index}>
                            <Page>
                                <Skeleton className={classes.carouselPaper} elevation={5} >
                                    <Skeleton variant='circle'
                                    className={classes.carouselAvatar} 
                                    />
                                    <Grid container  justify='space-between' style={{height:'15vh'}}>
                                        <Grid item xs={12}>
                                            <Skeleton className={classes.carouselUsername} style={{}} />
                                                
                                            <Skeleton style={{fontSize:13, color:'grey'}}/>
                                        </Grid>
                                        <Divider style={{width: '100%', height: '2px', marginTop:'5px',marginBottom:'5px',}}/>
                                        <Grid container item xs={12} direction="row"
                                        justify="space-between"
                                        alignItems="flex-end"
                                        style={{height:'fit-content'}}
                                        >
                                            <Grid item xs={6}>
                                                <Skeleton variant='rect'  style={{fontSize:15,fontWeight:'bold'}} 
                                                />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Skeleton variant='rect'  style={   {fontSize:15,fontWeight:'bold'}} 
                                                />
                                            </Grid>
                                            
                                        </Grid>
                                    </Grid>
                                </Skeleton>
                            </Page>
                            </div>
                        ))}
                    </Slider>
                </Wrapper>
    )
}
