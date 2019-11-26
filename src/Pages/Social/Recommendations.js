import React, { useState, useEffect, useRef, Fragment } from 'react';
import { Grid, Typography, Box, List, Badge, Fab, IconButton, Snackbar } from '@material-ui/core'
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
//import Snackbar from '../../Components/Snackbar';
import RecommendationRequestSkeletonLoading from '../../Components/SkeletonLoading/RecommendationRequestSkeletonLoading'
import './Recommendations.css'
import CloseIcon from '@material-ui/icons/Close';
import { useSnackbar } from 'notistack';
import ClearIcon from '@material-ui/icons/Clear'

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        marginTop: theme.spacing(2),
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

const CarouselArrowNext = (props) => {

    const { className, style, onClick } = props;
    // console.log(props)

    if (onClick !== null) {
        return (
            <div
                className={className}
                style={{ display: "block", zIndex: 40, marginRight: '1%', }}
                onClick={onClick}
            >
                <Fab
                    className={className}
                    size='medium'
                    style={{ display: "block", zIndex: 40, marginRight: '20%', backgroundColor: 'black', opacity: '0.6' }}
                    onClick={onClick}
                >
                    <KeyboardArrowRightIcon style={{ color: 'white', marginTop: 6 }} />
                </Fab>
            </div>
        );
    } else {
        return (<div></div>)
    }
}
const CarouselArrowPrev = (props) => {
    const classes = useStyles();
    const { className, onClick, style, currentSlide } = props;

    if (currentSlide !== 0) {
        return (
            <div
                className={className}
                style={{ ...style, display: "block", zIndex: 40, marginLeft: '1%', content: 'none' }}
                onClick={onClick}
            >
                <Fab
                    size='medium'
                    style={{ backgroundColor: 'black', opacity: '0.6' }}
                >
                    <KeyboardArrowLeftIcon style={{ color: 'white', }} />
                </Fab>

            </div>

        );
    } else {
        return (<div></div>)
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
    focusOnSelect: false,
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
            breakpoint: 1480,
            settings: {
                slidesToShow: 2,
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
            breakpoint: 800,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                //initialSlide: 2
                infinite: false,
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

    console.log(props)
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const classes = useStyles();
    const [recoRequests, setRecoRequests] = useState([])
    const [completedMeetups, setCompletedMeetups] = useState();
    const [loadingCompletedMeetups, setLoadingCompletedMeetups] = useState(false);
    const [recommendations, setRecommendations] = useState([])
    const demoArray = [1, 2, 3];

    /*
    const queueRef = useRef([]);
    const [open, setOpen] = useState(false);
    const [messageInfo, setMessageInfo] = useState(undefined);
    */

    const action = key => (
        <Fragment>
            <IconButton onClick={() => { closeSnackbar(key) }} size="small" style={{ color: 'white' }}>
                <ClearIcon />
            </IconButton>
        </Fragment>
    );


    const getCompletedMeetups = () => {
        console.log("ENTERED GET COMPLETED MEETUPS")
        setLoadingCompletedMeetups(true);
        api.invitations.getCurrent()
            .then(res => {
                if (res.data.response_code === 200) {
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
                    for (let i = 0; i < combined.length; i++) {
                        const invitation = combined[i]
                        console.log(invitation)
                        if (invitation.is_completed === 1 && invitation.processed === 0) {
                            temp.push(invitation)
                        }
                    }
                    setCompletedMeetups(temp);

                } else {
                    console.log('**** ERROR: Unable to Retrieve Completed Meetups  ***')
                    console.log(res.data.response_message)
                    enqueueSnackbar('Unable to Retrieve Completed Meetups', { variant: "error", action });
                }

                setLoadingCompletedMeetups(false)
            }).catch(err => {
                if (err.response) {
                    const status = err.response.status
                    const statusText = err.response.statusText
                    console.log(status);
                    console.log(statusText);
                    enqueueSnackbar(`Error ${status}: ${statusText}`, { variant: "error", action });
                }
            })
    }

    const getRecoRequests = () => {
        api.recommendations.retrieveAllRequest()
            .then(res => {
                if (res.data.response_code === 200) {
                    setRecoRequests(res.data.requests)
                    console.log(res.data.requests)
                } else {
                    console.log("error retrieving recommendation requests")
                }

            }).catch(err => console.error(err));
    }

    const getRecommendations = () => {
        api.recommendations.retrieveAll()
            .then(res => {
                if (res.data.response_code === 200) {
                    setRecommendations(res.data.recommendations)
                } else {
                    console.log("error retrieving recommendations")
                }

            }).catch(err => console.error(err));
    }


    useEffect(() => {
        console.log("Getting getCompletedMeetups");
        // setLoadingCompletedMeetups(true);
        // setTimeout({getCompletedMeetups}, 1500);
        if (window.localStorage.getItem('authToken') !== null) {
            getCompletedMeetups();
            getRecoRequests()
            getRecommendations()
        }
    }, [props.tabChange])
    useEffect(() => {
        console.log("Getting getCompletedMeetups");
        // setLoadingCompletedMeetups(true);
        // setTimeout({getCompletedMeetups}, 1500);
        if (window.localStorage.getItem('authToken') !== null) {
            getCompletedMeetups();
            getRecoRequests()
            getRecommendations()
        }
    }, [props.refresh])

    const removeRecoRequest = (request_id) => {
        console.log("received request_id" + request_id)
        api.recommendations.reject({
            "request_id": request_id
        }
        ).then(res => {
            if (res.data.response_code === 200) {
                const current = recoRequests
                setRecoRequests(current.filter((value) => (
                    value.request_id !== request_id
                )))
                enqueueSnackbar("Request deleted.", { variant: "success", action });
            }
        }).catch(err => {
            console.log(err)
        })
    }

    /*
    const processQueue = () => {
    if (queueRef.current.length > 0) {
      setMessageInfo(queueRef.current.shift());
      setOpen(true);
    }
    };

    const setSnackbar = (message, undoButton = false) => {
        queueRef.current.push({
            message,
            key: new Date().getTime(),
            undoButton
        });
        if (open) {
            // immediately begin dismissing current message
            // to start showing new one
            setOpen(false);
        } else {
            processQueue();
        }
    }
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    const handleExited = () => {
        processQueue();
    };
    */

    const handleProcessRequestFromCompletedMeetup = (meetup) => {
        console.log("Entered Handle Cancel Request Method")
        console.log(meetup)
        api.recommendations.processRecord({ "request_id": meetup.request_id })
            .then(res => {
                console.log(res.data);
                if (res.data.response_code === 200) {
                    enqueueSnackbar('Requstion Option Removed', { variant: "success", action });
                    console.log("Meetup Record Processed SUCCESSFULLY - OPEN SNACK BAR TO INFORM")
                    getCompletedMeetups();
                } else {
                    enqueueSnackbar('Unable to Perform Operation', { variant: "error", action });
                }
            }).catch(err => {
                const status = err.response.status
                const statusText = err.response.statusText
                console.log(status);
                console.log(statusText);
                enqueueSnackbar(`Error ${status}: ${statusText}`, { variant: "error", action });
            })
    }

    return (
        <div>
            <Grid container className={classes.root}>
                <Grid item container spacing={10} alignItems='flex-start'>
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

                        {recoRequests.length > 0 ?
                            <Grid item container direction="row" justify="space-evenly" alignItems="stretch" spacing={3} style={{ marginTop: 20, marginBottom: 20 }}>
                                <Wrapper>

                                    <Slider {...carouselSettings}>
                                        {recoRequests.map((value, index) => {
                                            return (
                                                <Grid item xs={10}>
                                                    <RecoRequestCard request={value} removeCard={removeRecoRequest} />
                                                </Grid>
                                            )
                                        })
                                        }
                                    </Slider>


                                </Wrapper>
                            </Grid>
                            :
                            <Grid item container>
                                <Typography color='textSecondary' variant="subtitle1">
                                    There are no requests for your recommendations.
                            </Typography>
                            </Grid>
                        }
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
                            ? demoArray.map((element, index) => (
                                <RecommendationRequestSkeletonLoading />
                            ))


                            : completedMeetups && completedMeetups.length !== 0
                                ?
                                <Grid item style={{ width: '100%' }}>
                                    <List>
                                        {completedMeetups.map((meetup, index) => (
                                            <RecoRequestListItem meetup={meetup}
                                                getCompletedMeetups={getCompletedMeetups} handleProcessRequestFromCompletedMeetup={handleProcessRequestFromCompletedMeetup} redirectProfile={props.redirectProfile} />
                                        ))}
                                    </List>
                                </Grid>
                                :
                                <div style={{ textAlign:'left'}}>
                                    <Typography color='textSecondary' variant="subtitle1">
                                        Complete a meetup to request for a recommendation!
                                </Typography>
                                </div>
                        }
                    </Grid>
                </Grid>
                <div>
                    &nbsp;
                </div>

                <Grid item container style={{ width: '100%' }}>
                    <Grid item container style={{ marginTop: 20, marginBottom: 20 }}>
                        <Typography component="div">
                            <Box
                                fontSize="h6.fontSize"
                                style={{ fsontSize: 'large' }}
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
                        {recommendations.length > 0 ?
                            <List>
                                {recommendations.map((reco, index) => {
                                    return (
                                        <RecoListItem reco={reco} />
                                    )
                                })
                                }
                            </List>
                            :
                            <Grid style={{textAlign:"left"}}>
                                <Typography color='textSecondary' variant="subtitle1">
                                    You do not have any recommendations yet.
                                </Typography>
                            </Grid>
                        }
                    </Grid>
                </Grid>
            </Grid>
            {/*
            <Snackbar
                key={messageInfo ? messageInfo.key : undefined}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={open}
                autoHideDuration={5000}
                onClose={handleClose}
                onExited={handleExited}
                ContentProps={{
                    'aria-describedby': 'message-id',
                }}
                message={<span id="message-id">{messageInfo ? messageInfo.message : undefined}</span>}

                action={
                    <IconButton
                        key="close"
                        aria-label="close"
                        color="inherit"
                        className={classes.close}
                        onClick={handleClose}
                    >
                        <CloseIcon />
                    </IconButton>
                }
            />
            */}
        </div>
    )
}
