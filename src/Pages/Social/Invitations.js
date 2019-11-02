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
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Recommendations from './Recommendations';
import './Invitations.css';


const Wrapper = styled.div`
    width:97%
`;

const Page = styled.div`
    width:90%
`;

const CarouselArrowNext = (props) => {

    const { className, style, onClick} = props;
    // console.log(props)

    if(onClick !== null){
    return (
        <div 
            className={className}
            style={{ display: "block",zIndex:60, marginRight:'1%',}}
            onClick={onClick}
        >
            <Fab
            className={className}
            size='medium'
            style={{display: "block",zIndex:60, marginRight:'20%',backgroundColor:'black', opacity:'0.6'}}
            onClick={onClick}
            > 
                <KeyboardArrowRightIcon style={{color:'white',marginTop:6}}/>
            </Fab>
        </div>
    );
    } else {
        return(<div></div>)
    }
  }
  const CarouselArrowPrev = (props) => {
    const classes = useStyles();
    const { className, onClick, style, currentSlide } = props;

    if(currentSlide !==0){
        return (
            <div 
              className={className}
              style={{ ...style, display: "block",zIndex:60,marginLeft:'1%',content:'none'}}
              onClick={onClick}
            >
              <Fab
                size='medium'
                style={{backgroundColor:'black', opacity:'0.6'}}
              > 
              <KeyboardArrowLeftIcon style={{color:'white',}}/>
            </Fab>
        
            </div>
            
        );
    } else {
        return(<div></div>)
    }
    
  }

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
    nextArrow: <CarouselArrowNext />,
    prevArrow: <CarouselArrowPrev />,
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
        marginTop:10,
        marginLeft:'5%'
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
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

function Invitations(props) {

    const classes=useStyles();
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [demoArray, setDemoArray] = useState([1,2,3,4,5])
    const [selectedInvitationIndex, setSelectedInvitationIndex] = useState()
    const [openInvitation, setOpenInvitation] = useState(false);
    const [selectedMeetupIndexWithDate, setSelectedMeetupIndexWithDate] = useState()
    const [selectedMeetupIndexWithoutDate, setSelectedMeetupIndexWithoutDate] = useState()
    const [openMeetupConfirmation, setOpenMeetupConfirmation] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(123456);
    const [openMeetupCancellation, setOpenMeetupCancellation] = useState(false);

    const handleSelectUser = userId => {
        console.log("***** Entered Handled Select User ****");
        console.log(userId);
        setSelectedUserId(userId);
    }
    
    const handleDateChange = date => {
        console.log(date)  
        //API Call to update of this change in date 
    }; 

    const handleOpenConfirmationDialog = (index,type) => {
        if(type === 'invitation'){
            setSelectedInvitationIndex(index)
            setOpenInvitation(true);
        } else if (type === 'meetupWithDate') {
            setSelectedMeetupIndexWithDate(index)
            setSelectedMeetupIndexWithoutDate(null)
            setOpenMeetupConfirmation(true);
        } else if (type === 'meetupWithoutDate') {
            setSelectedMeetupIndexWithoutDate(index)
            setSelectedMeetupIndexWithDate(null)
            setOpenMeetupConfirmation(true);
        }
    };
    const handleOpenCancellationDialog = (index,type) => {
        if (type === 'meetupWithDate') {
            setSelectedMeetupIndexWithDate(index)
            setSelectedMeetupIndexWithoutDate(null)
            setOpenMeetupCancellation(true);
        } else if (type === 'meetupWithoutDate') {
            setSelectedMeetupIndexWithoutDate(index)
            setSelectedMeetupIndexWithDate(null)
            setOpenMeetupCancellation(true);
        }
    };

    const handleCloseDialog = () => {
        // if(type === 'invitation'){
            setOpenInvitation(false);
        // } else if (type === 'meetup') {
            setOpenMeetupConfirmation(false);
            setOpenMeetupCancellation(false);
        // }
    };
 

    const deleteElement = (index) => {
        console.log('Index = ' + index)
        var array = [...demoArray]
        array.splice(index,1)
        setDemoArray(array);
        console.log(demoArray)
    }
    
    const timeLeft = (date) => {
        const dateFormat =  new Date(date);
    }

    const handleMeetupConfirmation = () => {
        //API call to confirm Meetup 
        setOpenMeetupConfirmation(false);
    }


    return (
        <div>
            {/* <Router> */}
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
                                <div>
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
                                                    onClick={()=>handleOpenConfirmationDialog(index,'invitation')}
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
                                <Dialog
                                open={index === selectedInvitationIndex ? openInvitation: false}
                                TransitionComponent={Transition}
                                keepMounted
                                onClose={handleCloseDialog}
                                aria-labelledby="alert-dialog-slide-title"
                                aria-describedby="alert-dialog-slide-description"
                                >
                                    <DialogTitle id="alert-dialog-slide-title">{"Find Out More About Yi Qiong!"}</DialogTitle>
                                    <DialogContent>
                                        <Grid container >
                                            <Grid item xs={3}>
                                                <Avatar alt="List"
                                                    src='' 
                                                    className={classes.carouselAvatar} 
                                                    imgProps={{style:{objectFit:'contain',border:0}}}
                                                    // onClick={()=> handleHrefClick(listing)}
                                                />
                                            </Grid>
                                            <Grid Item xs={9}>
                                                <DialogContentText id="alert-dialog-slide-description">
                                                    Let Google help apps determine location. This means sending anonymous location data to
                                                    Google, even when no apps are running.
                                                </DialogContentText>
                                            </Grid>
                                        </Grid>
                                    </DialogContent>
                                    <DialogActions>
                                        <Link to={{
                                            pathname: "/profile",
                                            state: { user: true }
                                        }} 
                                        style={{textDecoration:'none'}}>
                                            <Button 
                                                color="primary"
                                                onClick={()=> handleCloseDialog()}
                                                >
                                                    View Profile 
                                            </Button>
                                        </Link>
                                            
                                        <Button onClick={handleCloseDialog} color="primary">
                                            Accept
                                        </Button>
                                    </DialogActions>
                                </Dialog>
                                </div>
                            ))}
                        </Slider>
                    </Wrapper>
                </Grid>
            </Grid>
        
            <Grid container spacing={6}>
                <Grid container item xs={12} md={6} style={{}}>
                    <Grid item xs={12}>
                        <Typography className={classes.sectionHeading} style={{marginTop:'10%'}}>
                            Upcoming Meetups
                        </Typography>
                    </Grid>
                    {demoArray.map((element, index) => (
                        <div>
                            <Card style={{width:'100%', height:'fit-content', padding:'5%',marginBottom:'4%'}}>
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
                                                onOpen={()=> handleSelectUser(element)}
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
                                                onClick={()=>handleOpenConfirmationDialog(index,'meetupWithDate')}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Card>
                            <Dialog
                            open={index === selectedMeetupIndexWithDate ? openMeetupConfirmation: false}
                            TransitionComponent={Transition}
                            keepMounted
                            onClose={handleCloseDialog}
                            aria-labelledby="alert-dialog-slide-title"
                            aria-describedby="alert-dialog-slide-description"
                            >
                                <DialogContent>
                                    <Grid container>
                                        <Grid item xs={12} style={{textAlign:'-webkit-center'}}>
                                            <Avatar alt="List"
                                            src={CompleteMeetupIcon} 
                                            className={classes.carouselAvatar} 
                                            imgProps={{style:{objectFit:'contain',border:0}}}
                                            // onClick={()=> handleHrefClick(listing)}
                                            />
                                        </Grid>
                                    </Grid>
                                <Typography style={{fontSize:20, fontWeight:"bold"}}>
                                    Have you completed your MeetUp with [User]?
                                </Typography>
                                </DialogContent>
                                <DialogActions>
                                <Button onClick={handleCloseDialog} color="primary">
                                    Cancel
                                </Button>
                                <Button onClick={handleMeetupConfirmation} color="primary">
                                    Yes
                                </Button>
                                </DialogActions>
                            </Dialog>
                        
                        </div>
                    ))}
                </Grid>
            
                <Grid container item xs={12} md={6}>
                    <Grid item xs={12}>
                        <Typography className={classes.sectionHeading} style={{marginTop:'10%'}}>
                            Pending Meetup Date
                        </Typography>
                    </Grid>
                    {demoArray.map((element, index) => (
                        <div>
                            <Card style={{width:'100%', height:'fit-content', padding:'5%',marginBottom:'4%'}}>
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
                                        <MuiPickersUtilsProvider utils={DateFnsUtils} style={{color:'#992E24'}}>
                                            <KeyboardDatePicker
                                                margin="normal"
                                                id="date-picker-dialog"
                                                format="MM/dd/yyyy"
                                                value={null}
                                                onChange={handleDateChange}
                                                KeyboardButtonProps={{
                                                    'aria-label': 'change date',
                                                    'color':'#992E24'
                                                }}
                                                onOpen={()=> handleSelectUser(element)}
                                                style={{width:'65%', }}
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
                                                onClick={()=> handleOpenConfirmationDialog(index, 'meetupWithoutDate')}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Card>
                            <Dialog
                            open={index === selectedMeetupIndexWithoutDate ? openMeetupConfirmation: false}
                            TransitionComponent={Transition}
                            keepMounted
                            onClose={handleCloseDialog}
                            aria-labelledby="alert-dialog-slide-title"
                            aria-describedby="alert-dialog-slide-description"
                            >
                                <DialogContent>
                                    <Grid container>
                                        <Grid item xs={12} style={{textAlign:'-webkit-center'}}>
                                            <Avatar alt="List"
                                            src={CompleteMeetupIcon} 
                                            className={classes.carouselAvatar} 
                                            imgProps={{style:{objectFit:'contain',border:0}}}
                                            // onClick={()=> handleHrefClick(listing)}
                                            />
                                        </Grid>
                                    </Grid>
                                <Typography style={{fontSize:20, fontWeight:"bold"}}>
                                    Have you completed your MeetUp with [User]?
                                </Typography>
                                </DialogContent>
                                <DialogActions>
                                <Button onClick={handleCloseDialog} color="primary">
                                    Cancel
                                </Button>
                                <Button onClick={handleMeetupConfirmation} color="primary">
                                    Yes
                                </Button>
                                </DialogActions>
                            </Dialog>
                        </div>
                    ))}
                </Grid>
            </Grid>
            
        </div>
    )
}

export default Invitations;