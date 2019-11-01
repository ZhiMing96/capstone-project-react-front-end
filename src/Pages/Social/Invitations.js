import React, { useEffect, useState, } from 'react';
import api from '../../api';
import { Grid, Button, CssBaseline, IconButton, Paper, Typography, Divider, Box, InputBase, Container, ButtonBase, Snackbar, SnackbarContent, Avatar, Fab, Card, CardContent, List, ListItemAvatar, ListItem, ListItemText } from '@material-ui/core';
import { BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Popover from '@material-ui/core/Popover';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import CompleteMeetupIcon from  '../../images/completeMeetup.svg';
import RemoveMeetupIcon from '../../images/removeMeetup.svg';


const Wrapper = styled.div`
    width:97%
`;

const Page = styled.div`
    width:90%
`;

const carouselSettings = {
    accessibiliy: true,
    speed:1700,
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
    // nextArrow: <CarouselArrowNext />,
    // prevArrow: <CarouselArrowPrev />,
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
        fontSize:18, 
        fontWeight:'bold', 
        color:'grey',
         marginBottom:'2%',
         marginTop:'2%',
         textAlign:'left',
    },
    carouselPaper: {
        width:'80%',
        textAlign: '-webkit-center', 
        padding:15, 
        marginBottom:5,
        marginTop:10
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


  }))

  const defaultAvatar = '';

function Invitations() {

    const classes=useStyles();
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [demoArray, setDemoArray] = useState([1,2,3,4,5])

    const handleDateChange = date => {
        setSelectedDate(date);
    };

    // if(demoArray.length === 0){
    //     setDemoArray([1,2,3,4,5])
    // }


    useEffect(()=>{
        console.log("RELOADING")
    }, [demoArray])

    const deleteElement = (index) => {
        console.log('Index = ' + index)
        var array = [...demoArray]
        // console.log(array);
        // if( array.length === 0){
        //     array = [];
        // } else
        
        //  if(index === array.length-1){
        //     array.splice(index,1)
        // } else if (index === 0 ){
        //     array = demoArray.slice(1, demoArray.length)
        // } else {
        //     array1 = demoArray.slice(0,index)
        //     console.log(demoArray);
        //     array2 = demoArray.slice(index+1, demoArray.length)
        //     console.log(demoArray);
        //     array = array.push(array2)
        //     console.log(array);
        // }
        array.splice(index,1)
        setDemoArray(array);
        console.log(demoArray)
    }

    
    return (
        <div>
            <Grid container direction="row" style={{ width: '100%', textAlign: 'left' }}>
                <Grid item xs={12}>
                    <Typography className={classes.sectionHeading}>
                        Interested In Meeting You!
                    </Typography>
                </Grid>
                <Grid container style={{ margin:10, marginTop:10, }} spacing={1} justify="space-between" > 
                    <Wrapper>
                        <Slider {...carouselSettings}>
                            {demoArray.map((element, index) => (
                                <Page>
                                    <Paper className={classes.carouselPaper} elevation={5}>
                                        <Avatar alt="List"
                                        src='' 
                                        className={classes.carouselAvatar} 
                                        imgProps={{style:{objectFit:'contain',border:0}}}
                                        // onClick={()=> handleHrefClick(listing)}
                                        />
                                        <Grid container  justify='space-between' style={{height:'15vh'}}>
                                            <Grid item xs={12}>
                                            <Typography gutterBottom className={classes.carouselUsername} style={{}}>
                                                Yi Qiong
                                            </Typography>
                                            <Typography style={{fontSize:13, color:'grey'}}>
                                                Fintech Analyst 
                                            </Typography>
                                            </Grid>
                                            <Divider style={{width: '100%', height: '2px', marginTop:'5px',marginBottom:'5px',}}/>
                                            <Grid container item xs={12} direction="row"
                                            justify="space-between"
                                            alignItems="flex-end"
                                            style={{height:'fit-content'}}
                                            >
                                                <Grid item xs={6}>
                                                    <Button color='primary' style={{fontSize:15,fontWeight:'bold'}} size='small'
                                                    // onClick={()=>handleHrefClick(listing)}
                                                    >
                                                        Accept
                                                    </Button>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Button color='primary' style={{fontSize:15,fontWeight:'bold', color:'#992E24'}} size='small'
                                                    onClick={()=>deleteElement(index)}
                                                    >
                                                        Decline
                                                    </Button>
                                                </Grid>
                                                
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                </Page>
                            ))}
                        </Slider>
                    </Wrapper>
                </Grid>
            </Grid>
        
                <Grid container spacing={4}>

                
                <Grid container item xs={12} md={6} style={{}}>
                    <Grid item xs={12}>
                        <Typography className={classes.sectionHeading} style={{marginTop:'10%'}}>
                            Upcoming Meetups
                        </Typography>
                    </Grid>
                    <Card style={{width:'100%', height:'fit-content', padding:'5%'}}>
                    <Grid container item xs={12}>
                        <Grid item xs={3}> 
                            <Avatar alt="List"
                                src='' 
                                className={classes.listAvatar} 
                                imgProps={{style:{objectFit:'contain',border:0}}}
                                // onClick={()=> handleHrefClick(listing)}
                            />
                        </Grid>
                        <Grid item xs={6} style={{textAlign:'left', paddingLeft:'2%'}}> 
                            <Typography>
                                Chong Yi Qiong
                            </Typography>
                            <Typography>
                                Chong Yi Qiong
                            </Typography>
                            <MuiPickersUtilsProvider utils={DateFnsUtils} >
                                <KeyboardDatePicker
                                    margin="normal"
                                    id="date-picker-dialog"
                                    format="MM/dd/yyyy"
                                    value={selectedDate}
                                    onChange={handleDateChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                    style={{width:'65%'}}
                                />
                            </MuiPickersUtilsProvider>
                            
                        </Grid>
                        <Grid container item xs={3} direction="row" justify="space-between"> 
                            <Grid item  xs={12}>
                                <Typography>
                                    2 Days Left
                                </Typography>
                            </Grid>   
                            <Grid item container xs={12}>
                                <Grid item xs={6} style={{textAlign:'-webkit-center', alignSelf:'center'}}>
                                    <Avatar
                                    className={classes.controlButtons}
                                    src={RemoveMeetupIcon}
                                    />
                                </Grid>
                                <Grid item xs={6} style={{textAlign:'-webkit-center', alignSelf:'center'}}>
                                    <Avatar
                                    className={classes.controlButtons}
                                    src={CompleteMeetupIcon}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    </Card>
                </Grid>
            
                <Grid container item xs={12} md={6}>
                    <Grid item xs={12}>
                        <Typography className={classes.sectionHeading} style={{marginTop:'10%'}}>
                            Pending Meetup Date
                        </Typography>
                    </Grid>
                    <Card style={{width:'100%', height:'fit-content', padding:'5%'}}>
                    <Grid container item xs={12}>
                        <Grid item xs={3}> 
                            <Avatar alt="List"
                                src='' 
                                className={classes.listAvatar} 
                                imgProps={{style:{objectFit:'contain',border:0}}}
                                // onClick={()=> handleHrefClick(listing)}
                            />
                        </Grid>
                        <Grid item xs={6} style={{textAlign:'left', paddingLeft:'2%'}}> 
                            <Typography>
                                Chong Yi Qiong
                            </Typography>
                            <Typography>
                                Chong Yi Qiong
                            </Typography>
                            <MuiPickersUtilsProvider utils={DateFnsUtils} >
                                <KeyboardDatePicker
                                    margin="normal"
                                    id="date-picker-dialog"
                                    format="MM/dd/yyyy"
                                    value={selectedDate}
                                    onChange={handleDateChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                    style={{width:'65%'}}
                                />
                            </MuiPickersUtilsProvider>
                            
                        </Grid>
                        <Grid container item xs={3} direction="row" justify="space-between"> 
                            <Grid item  xs={12}>
                                <Typography>
                                    2 Days Left
                                </Typography>
                            </Grid>   
                            <Grid item container xs={12}>
                                <Grid item xs={6} style={{textAlign:'-webkit-center', alignSelf:'center'}}>
                                    <Avatar
                                    className={classes.controlButtons}
                                    src={RemoveMeetupIcon}
                                    />
                                </Grid>
                                <Grid item xs={6} style={{textAlign:'-webkit-center', alignSelf:'center'}}>
                                    <Avatar
                                    className={classes.controlButtons}
                                    src={CompleteMeetupIcon}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    </Card>
                </Grid>
                </Grid>
            {/* </Grid> */}
        </div>
    )
}

export default Invitations;


{/* <List>
                            <Paper>
                                <ListItem alignItems="flex-start">
                                    <ListItemAvatar style={{marginRight:20}}>
                                        <Avatar className={classes.listAvatar}  alt="Remy Sharp" src="" />
                                    </ListItemAvatar>
                                    <ListItemText
                                    primary="Chong Yi Qiong"
                                    secondary="Software Developer - FINTECH Pte ltd"
                                    />
                                    
                                </ListItem>
                            </Paper>
                        </List> */}