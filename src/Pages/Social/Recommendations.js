import React, { useState, useEffect} from 'react';
import { Grid, Typography, Box, List, Badge, Fab } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import RecoRequestCard from '../../Components/RecommendationRequestCard'
import RecoRequestListItem from '../../Components/RecoRequestListItem'
import RecoListItem from '../../Components/RecoListItem'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from 'styled-components';
import api from '../../api';
import './index.css';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'
import CircularLoading from '../../Components/LoadingBars/CircularLoading'
import Snackbar from '../../Components/Snackbar';
import  RecommendationRequestSkeletonLoading from '../../Components/SkeletonLoading/RecommendationRequestSkeletonLoading'

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

const CarouselArrowNext = (props) => {

    const { className, style, onClick} = props;
    // console.log(props)

    if(onClick !== null){
    return (
        <div 
            className={className}
            style={{ display: "block",zIndex:40, marginRight:'1%',}}
            onClick={onClick}
        >
            <Fab
            className={className}
            size='medium'
            style={{display: "block",zIndex:40, marginRight:'20%',backgroundColor:'black', opacity:'0.6'}}
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
              style={{ ...style, display: "block",zIndex:40,marginLeft:'1%',content:'none'}}
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
    accessibility: true,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1,
    infinite: false,
    dots: true,
    //autoplay: true,
    arrows: true,
    //autoplaySpeed:8000,
    draggable: true,
    //lazyLoad: "progressive",
    pauseOnHover: true,
    nextArrow: <CarouselArrowNext />,
    prevArrow: <CarouselArrowPrev />,
    responsive: [
        {
            breakpoint: 1920, //lg
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                infinite: false,
            }
        },
        {
            breakpoint: 1280, //md
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                infinite: false,
            }
        },
        {
            breakpoint: 959, //md
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                //infinite: true,
            }
        },
        {
            breakpoint: 600, //sm
            settings: {
                slidesToShow: 2,
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

const Wrapper = styled.div`
width:97%
`;

export default function Reco(props) {
    const classes = useStyles();
    const requests = [0, 1, 2, 3, 4, 5] //api
    const [completedMeetups, setCompletedMeetups] = useState();
    const [loadingCompletedMeetups, setLoadingCompletedMeetups] = useState(false);
    const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);
    const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);
    const requestErrorMsg = "An Error Has Occured! Request was Unsucessful"
    const requestSuccessMsg = "Requst Sent Successfully! "
    const demoArray = [1,2,3];


    const getCompletedMeetups = () => { 

        setLoadingCompletedMeetups(true);
        api.invitations.getCurrent()
        .then(res=>{
            if(res.data.response_code === 200){
                console.log('**** Completed Meetups Retrieved ***')
                const invitesSent = res.data.invites_sent
                const invitesReceived = res.data.invites_received
                console.log('****** Invitations Sent *****')
                console.log(invitesSent);
                console.log('****** Invitations Received *****')
                console.log(invitesReceived);
                var combined = invitesSent.concat(invitesReceived)
                console.log('****** Combined Invitations *****')
                console.log(combined);
                var temp = [];
                for(let i=0; i<combined.length;i++){
                    const invitation = combined[i]
                    console.log(invitation)
                    if(invitation.is_completed === 1){
                        temp.push(invitation)
                    }
                }
                setCompletedMeetups(temp);

            } else {
                console.log('**** ERROR: Unable to Retrieve Completed Meetups  ***')
                console.log(res.data.response_message)
            }

            setLoadingCompletedMeetups(false)
        }).catch(err=> console.error(err));
    }


    useEffect(()=>{
        getCompletedMeetups();
    },[props])

    const resetSnackBars = (reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenErrorSnackbar(false);
        // setOpenSuccessSnackbar(false);
    }

    const handleOpenSnackBar = (type) => {
        console.log(" $$$$ ENTERED OPEN SNACKBAR ")

        if(type === "Error"){
            setOpenErrorSnackbar(true);
        } else if (type == "Success"){
            setOpenSuccessSnackbar(true);
        }
     }


    return (
        <Grid container className={classes.root}>
            <Grid item container spacing={10} alignItems='flex-start' style={{marginBottom:40, marginTop:40}}>
                <Grid item container sm={12} md={7}>
                    <Grid item container style={{ marginTop: 20, marginBottom: 20 }}>
                        <Typography component="div">
                            <Box
                                fontSize="h6.fontSize"
                                style={{ fontSize: 'large' }}
                                letterSpacing={2}
                                textAlign='left'
                                color="primary.main"
                                fontWeight="fontWeightBold"
                            >

                                WRITE A RECOMMENDATION

                            </Box>
                        </Typography>
                    </Grid>


                    <Grid item container direction="row" justify="space-evenly" alignItems="stretch" spacing={3} style={{ marginTop: 20, marginBottom: 20 }}>
                        <Wrapper>
                            <Slider {...carouselSettings}>
                                {requests.map((value, index) => {
                                    return (
                                        <Grid item xs={10}>
                                            <RecoRequestCard />
                                        </Grid>
                                    )
                                })
                                }
                            </Slider>
                        </Wrapper>
                    </Grid>
                </Grid>

                <Grid item container sm={12} md={5}>
                    <Grid item container style={{ marginTop: 20, marginBottom: 20, width: '100%' }}>
                        <Typography component="div">
                            {/* <Badge 
                            badgeContent={completedMeetups? completedMeetups.length:null} 
                            color="error"
                            anchorOrigin={{ vertical: 'top', horizontal: 'left',}}
                            > */}
                                <Box
                                    fontSize="h6.fontSize"
                                    style={{ fontSize: 'large' }}
                                    letterSpacing={2}
                                    textAlign='left'
                                    color="primary.main"
                                    fontWeight="fontWeightBold"
                                >
                                    RECOMMENDATION REQUEST

                                </Box>
                            {/* </Badge> */}
                        </Typography>
                    </Grid>
                    {loadingCompletedMeetups
                    ? demoArray.map((element,index)=>(
                        <RecommendationRequestSkeletonLoading/>
                    ))

                    
                    : completedMeetups
                    ?
                    <Grid item style={{ width: '100%' }}>
                        <List>
                            {completedMeetups.map((meetup, index)=>(
                                <RecoRequestListItem meetup={meetup} 
                                handleOpenSnackBar={handleOpenSnackBar} />
                            ))}
                        </List>
                    </Grid>
                    : 'Complete A Meetup to Request for a Recommendation!'
                    }
                </Grid>
            </Grid>
            {
                
            }
            {/* <Snackbar
            open={ openSuccessSnackbar || openErrorSnackbar ? true : false }
            handleClose={resetSnackBars}
            variant={openSuccessSnackbar ? "success" : openErrorSnackbar ? "error" : "success"}
            message={openSuccessSnackbar ? requestSuccessMsg : openErrorSnackbar ? requestErrorMsg : ""}
        /> */}

            <Grid item container style={{ width: '100%' }}>
                <Grid item container style={{ marginTop: 20, marginBottom: 20 }}>
                    <Typography component="div">
                        <Box
                            fontSize="h6.fontSize"
                            style={{ fontSize: 'large' }}
                            letterSpacing={2}
                            textAlign='left'
                            color="primary.main"
                            fontWeight="fontWeightBold"
                        >

                            YOUR RECOMMENDATIONS

                        </Box>
                    </Typography>
                </Grid>
                <Grid item style={{ width: '100%' }}>
                    <List>
                        <RecoListItem />
                        <RecoListItem />
                        <RecoListItem />
                        <RecoListItem />
                    </List>
                </Grid>
            </Grid>
        </Grid>
    )
}
