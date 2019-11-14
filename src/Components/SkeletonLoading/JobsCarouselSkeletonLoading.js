import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Skeleton from '@material-ui/lab/Skeleton';
import { Grid, Button, CssBaseline, IconButton, Paper, Typography, Divider, Box, InputBase, Container, ButtonBase, Snackbar, SnackbarContent, Avatar, Fab, Card, CardContent, List, ListItemAvatar, ListItem, ListItemText } from '@material-ui/core';
const useStyles = makeStyles(theme => ({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        flexGrow: 1,
        marginTop: 20,
        // marginBottom:0,
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    divider: {
        height: 28,
        margin: 4,
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 500,
      minWidth:40,
    },
    dense: {
      marginTop: theme.spacing(2),
    },
    margin: {
        margin: theme.spacing(1),
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        width: 'auto',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    menu: {
        width: 200,
    },
    iconButton: {
        padding: 10,
    },
    button: {
        margin: theme.spacing(1),
        fontWeight:"bold",
    },
    img: {
        width:'100%' ,
        height:'100%',
    },
    close: {
        padding: theme.spacing(0.5),
    },
    carouselJobTitile: {
        color:'#024966',
        marginTop:20, 
        fontWeight:'bold', 
        fontSize:16,
        whiteSpace:'normal', 
        textAlign:'left',
        overflow:'hidden',
        textOverflow:'ellipsis',
        display:'-webkit-box',
        WebkitLineClamp:2,
        WebkitBoxOrient:'vertical',
        lineHeight:'18px',
        [theme.breakpoints.down('xs')]: {
            marginBottom: '20px',
            marginTop:'20px',
        },
    },
    jobListingBox:{
        backgroundColor:'white',
        width:'90%',
        textAlign: 'start', 
        padding:15, 
        paddingRight:0,
        marginBottom:5,
        // boxShadow:'none',
        '&:hover':{
            boxShadow:'0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12)'
        }
    },
    sectionHeading: {
        textAlign:"justify", 
        marginLeft:'3%', 
        color:'#024966e', 
        fontWeight:'bold', 
        marginTop:'5%',
        marginBottom:'3%',
        fontSize:30 ,
    },
    sectionArea: {
        height:'30vh', 
        argin:10, 
        marginTop:10,
        marginLeft:'3%',
        marginBottom:'4%'
    },
    sectionCaption:{
        fontSize:15,
        fontWeight:'medium', 
        color:'grey', 
        marginLeft:8,
        [theme.breakpoints.down('xs')]: {
            display:'block'
        },
    },
    tagStyle:{
        padding:5, 
        paddingLeft:8, 
        color:'white',
        fontSize:11, 
        fontWeight:'bold',
        zIndex:100,
    },
    segmentArea : {
        marginBottom:'-5%'
    },
  }));

    const Wrapper = styled.div`
        width:97%
    `;

    const Page = styled.div`
        width:90%
    `;

    const carouselSettings = {
        accessibiliy: true,
        speed:1700,
        slidesToShow: 6,
        slidesToScroll: 3,
        infinite:true,
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
              slidesToShow: 5,
              slidesToScroll: 2,
              infinite: true,
            }
          },
          {
            breakpoint: 1280, //md
            settings: {
              slidesToShow: 4,
              slidesToScroll: 2,
              infinite: true,
            }
          },
          {
            breakpoint: 1000, //md
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
              infinite: true,
            }
          },
          {
            breakpoint: 600, //sm
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              initialSlide: 2
            }
          },
          {
            breakpoint: 480, //xs
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }]
      };
    


export default function JobsCarouselSkeletonLoading() {
    const demoArray=[1,2,3,4,5,6]
    const classes=useStyles();

    return (
        <Grid container className={classes.sectionArea} spacing={0} justify="space-between" >
                <Wrapper>
                    <Slider {...carouselSettings}>
                        { demoArray.map((listing,index) => (
                            <Page>
                                <Skeleton className={classes.jobListingBox}>
                                    <Grid container justify='space-between'>
                                        <Grid item>
                                            <Skeleton variant='circle'
                                                style={{width:70, height:70, boxShadow:'0px 1px 5px 0px rgba(0,0,0,0.2)',margin:'2%'}} 
                                            />
                                        </Grid>
                                    </Grid>
                                <Grid container  justify='space-between' style={{height:'15vh'}}>
                                    <Grid item xs={12} style={{paddingRight:'6%'}}>
                                    <Skeleton  className={classes.carouselJobTitile} style={{}}/>
                                    <Skeleton   style={{fontWeight:'light', fontSize:10}}/>
                                        
                                    </Grid>
                                    <Grid item xs={12} style={{textAlign:'right', alignSelf:'flex-end',paddingRight:'5%'}}>
                                        <Skeleton variant='rect' style={{fontSize:12,fontWeight:'bold'}} />
                                    </Grid>
                                </Grid>
                                
                                </Skeleton>
                            </Page>
                        ))}
                    </Slider>
                </Wrapper>
                </Grid>
    )
}
