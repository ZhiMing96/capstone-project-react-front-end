import React, { useState, useEffect} from 'react'
import { CssBaseline, Box, Grid, Card, CardMedia, CardContent, Button, Paper, Avatar, Typography, createMuiTheme, Slide} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import styled from 'styled-components';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Wrapper = styled.div`
    width:100%
`;

const Page = styled.div`
    width:100%
`;

const carouselSettings = {
    accessibiliy: true,
    speed:1700,
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite:true,
    dots:true,
    autoplay: true,
    arrows:true,
    autoplaySpeed:8000,
    draggable:true,
    lazyLoad: "progressive",
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }]
  };

const theme = createMuiTheme({
    overrides: {}
});

const useStyles = makeStyles(theme => ({
    root:{
        paddingLeft:'3%',
        paddingRight:'3%',
        marginRight:'17%',
        marginLeft:'17%',
        backgroundColor:'white',
        // [theme.breakpoints.down('xs')]: {
        //     paddingLeft:'5px',
        //     paddingRight:'5px',
        // },
        [theme.breakpoints.down('md')]: {
            marginLeft:'6%',
            marginRight:'6%',
            paddingLeft:'5%',
            paddingRight:'5%',
        },
        [theme.breakpoints.down('xs')]: {
            marginLeft:'2%',
            marginRight:'2%',
            paddingLeft:'5%',
            paddingRight:'5%',
        },
    },
    digestHeading:{
        width:'100%', 
        height:'14vh', 
        paddingTop:'5%', 
        textAlign:'left'
    },
    sectionArea:{
        width:'100%', marginTop:'10%', textAlign:'left'
    },
    sectionHeading:{
        fontWeight:'bold',
        fontSize:'35px',
    },
    eventsImg:{
        width:'20%', 
        boxShadow:'0px 1px 3px 0px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 2px 1px -1px rgba(0,0,0,0.12)',
        [theme.breakpoints.down('xs')]: {
            width:'30%', 
        },
    },
    jobsListingArea:{
        width:'90%',
        textAlign: 'start', 
        padding:15, 
        marginBottom:5,
        maxWidth:'330px',
        [theme.breakpoints.down('xs')]: {
            margin:20
        },
        boxShadow: '0px 1px 3px 0px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.12)',
        '&:hover': {
           boxShadow:'0px 1px 8px 0px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 3px 3px -2px rgba(0,0,0,0.12)'
        }
    },
    jobListingPhoto:{
        width:70,
        height:70, 
        boxShadow:'0px 1px 5px 0px rgba(0,0,0,0.2)'
    },
    articleHeading:{
        lineHeight: 1.3,
        fontWeight:'bold',
        overflow:'hidden',
        textOverflow:'ellipsis', 
        display:'-webkit-box',
        WebkitLineClamp:2,
        WebkitBoxOrient:'vertical',
    },
    articleDescription:{
        lineHeight: 1.3, 
        color:'grey',
        overflow:'hidden',
        textOverflow:'ellipsis', 
        display:'-webkit-box',
        WebkitLineClamp:3,
        WebkitBoxOrient:'vertical',
    },
    eventListing: {
        display: 'flex',
        boxShadow:'none', backgroundColor:'inherit',
        border:0, 
        marginTop:'5%',
        height:'25%', 
        marginBottom:'3%',
        padding:'2%',
        '&:hover': {
            boxShadow:'0px 1px 8px 0px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 3px 3px -2px rgba(0,0,0,0.12)'
         }
    }
  }));

function DailyDigest() {
    const classes = useStyles();
    const token = window.localStorage.getItem('authToken');
    const [recommendedArticles, setRecommendedArticles] = useState();
    const [recommendedEvents, setRecommendedEvents] = useState();
    const [searchHistoryJobs, setsearchHistoryJobs] = useState();
    const [skillsJobs, setskillsJobs] = useState();
    const [jobTag,setJobTag] = useState();

    

    return (
        <div style={{ backgroundColor:'whitesmoke', width:'100%', height:'100%'}}>
            <div className={classes.root}>
            <CssBaseline/>
            <div className={classes.digestHeading}>
                <Typography variant='subtitle1' gutterBottom>
                    25th October 2019
                </Typography>
                <Typography variant='h3'>
                    <span style={{fontWeight:550}}>JOPIFY DAILY</span> <span style={{fontWeight:'lighter'}}>DIGEST</span>
                </Typography>
            </div>
            <div className={classes.sectionArea}>
                <Typography className={classes.sectionHeading}>
                    From The Blog
                </Typography>
                <div style={{textAlign:'right'}}>
                    <Typography variant='caption' gutterBottom>
                    Recommended Topic
                    </Typography>
                    <Typography variant='body1' style={{color:'#024966',fontWeight:'bold'}}>
                    Grow Your Career
                    </Typography>
                </div>
                
                <Grid container spacing={4} style={{marginTop:8}}>
                    <Grid item xs={12} sm={6}>
                        <Card style={{boxShadow:'none'}}>
                            <CardMedia
                            component="img"
                            alt="Contemplative Reptile"
                            height="250"
                            image="https://content.mycareersfuture.sg/wp-content/uploads/2018/05/When-to-make-the-leap-and-change-the-direction-of-your-career-1-795x373.png"
                            title=""/>
                            <CardContent style={{paddingBottom:5}}>
                                <Typography className={classes.articleHeading} gutterBottom variant='h6'>
                                4 Strategic Ways to Organise Your Job Application Process
                                </Typography>
                                <Typography className={classes.articleDescription}
                                gutterBottom variant='subtitle2'>
                                    Before you start applying for a job, it is imperative to have a killer resume. After all, your resume could make or break a first impression.
                                </Typography>
                                <Typography variant='caption'>
                                    5 min read
                                </Typography >
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Card style={{boxShadow:'none'}}>
                            <CardMedia
                            component="img"
                            alt="Contemplative Reptile"
                            height="250"
                            image="https://content.mycareersfuture.sg/wp-content/uploads/2019/09/resume-template-795x373.png"
                            title="Contemplative Reptile"/>
                        
                            <CardContent style={{paddingBottom:5}}>
                            <Typography className={classes.articleHeading} gutterBottom variant='h6'>
                                Career and Children: 3 Singaporean Mum Share How it’s Like Re-entering.
                            </Typography>
                            <Typography className={classes.articleDescription}
                                gutterBottom variant='subtitle2'>
                                Before you start applying for a job, it is imperative to have a killer resume. After all, your resume could make or break a first impression.
                            </Typography>
                            <Typography variant='caption'>
                                5 min read
                            </Typography >
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
                <div style={{textAlign:'right', marginTop:10}}>
                    <Button
                    size="small"
                    style={{color:'#30A0D8', fontWeight:'bold', fontSize:18}}
                    href='/articles'
                    >
                    View All Articles
                    </Button>
                </div>
            </div>
            <div className={classes.sectionArea}>
                <Typography className={classes.sectionHeading}>
                    From The Jobs Bank
                </Typography>
                <div style={{textAlign:'right'}}>
                    <Typography variant='caption' gutterBottom>
                    Recommended By
                    </Typography>
                    <Typography variant='body1' style={{color:'#024966',fontWeight:'bold'}}>
                    Search History
                    </Typography>
                </div>

                {/* <Grid container spacing={2}> */}
                    {/* { searchHistoryJobs.slice(0,2).map((listing, index)=>( */}
                        {/* <Grid item xs={12} sm={6} md={4}> */}
                        <Wrapper>
                            <Slider {...carouselSettings}>
                                <Page>
                                    <Paper className={classes.jobsListingArea}>
                                        <Avatar alt="List"
                                            src='https://cdn.cleverism.com/wp-content/themes/cleverism/assets/img/src/logo-placeholder.png'
                                            className={classes.jobListingPhoto}
                                            imgProps={{style:{objectFit:'contain',border:0}}}
                                        />
                                        <Grid container  justify='space-between' style={{height:'14vh'}}>
                                        <Grid item xs={12}>
                                            <Typography gutterBottom style={{marginTop:12,fontWeight:'bold', fontSize:18, whiteSpace:'normal',textAlign:'left'}}>
                                                UI/UX Designer
                                            </Typography>
                                            <Typography gutterBottom style={{fontWeight:'bold', fontSize:16, whiteSpace:'normal',textAlign:'left'}}>
                                                Google Facebook Pte Ltd
                                            </Typography>
                                            </Grid>
                                            <Grid item xs={12} style={{textAlign:'right', alignSelf:'flex-end'}}>
                                                <Button color='primary' style={{fontSize:12,fontWeight:'bold'}} size='small'
                                                
                                                >
                                                    Details
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                </Page>
                            </Slider>
                        </Wrapper>
                        {/* </Grid> */}
                    {/* ))} */}
                {/* </Grid> */}
                <div style={{marginTop:20}}>
                    <div style={{textAlign:'right'}}>
                        <Typography variant='caption' gutterBottom>
                        Recommended By
                        </Typography>
                        <Typography variant='body1' style={{color:'#024966',fontWeight:'bold'}}>
                        Your Skills
                        </Typography>
                    </div>
                    <Wrapper>
                        <Slider {...carouselSettings}>
                            <Page>
                                <Paper className={classes.jobsListingArea}>
                                    <Avatar alt="List"
                                        src='https://cdn.cleverism.com/wp-content/themes/cleverism/assets/img/src/logo-placeholder.png'
                                        style={{width:90, height:90, boxShadow:'0px 1px 5px 0px rgba(0,0,0,0.2)'}} 
                                        imgProps={{style:{objectFit:'contain',border:0}}}
                                    />
                                    <Grid container  justify='space-between' style={{height:'14vh'}}>
                                        <Grid item xs={12}>
                                            <Typography gutterBottom style={{marginTop:12,fontWeight:'bold', fontSize:18, whiteSpace:'normal',textAlign:'left'}}>
                                                UI/UX Designer
                                            </Typography>
                                            <Typography gutterBottom style={{fontWeight:'bold', fontSize:16,            whiteSpace:'normal',textAlign:'left'}}>
                                                Google Facebook Pte Ltd
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} style={{textAlign:'right', alignSelf:'flex-end'}}>
                                            <Button color='primary' style={{fontSize:12,fontWeight:'bold'}} size='small'
                                            
                                            >
                                            Details
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Page>
                        </Slider>
                    </Wrapper>
                    <Grid container spacing={4}>
                        {/* { skillsJobs.slice(0,2).map((listing, index)=>(  */}
                            <Grid item xs={12} sm={6} md={4}>
                                
                            </Grid>
                        {/* ))} */}
                    </Grid>
                </div>
                <div style={{textAlign:'right', marginTop:10}}>
                    <Button
                    size="small"
                    style={{color:'#30A0D8', fontWeight:'bold', fontSize:18}}
                    href='/jobs'
                    >
                    Search a Job
                    </Button>
                </div>
            </div>
            <div className={classes.sectionArea}>
                <Typography className={classes.sectionHeading}>
                From Events
                </Typography>
                <div style={{textAlign:'right'}}>
                    <Typography variant='caption' gutterBottom>
                    Recommended Topic
                    </Typography>
                    <Typography variant='body1' style={{color:'#024966',fontWeight:'bold'}}>
                    Grow Your Career
                    </Typography>
                </div>
                <Card className={classes.eventListing}>
                    <CardContent style={{flex: '1 0 auto', height:'100%', textAlign:'left'}}>
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                            <Typography variant='h6' style={{fontWeight:'bold'}} >
                            EVENT TITLE
                            </Typography>
                            <Typography variant='subtitle1' color='textSecondary' >
                            EVENT DESCRIPTION
                            </Typography>
                            <Typography>
                                Date of Event
                            </Typography>
                        </div>
                        </CardContent>
                    <CardMedia
                    component="img"
                    alt="Contemplative Reptile"
                    className={classes.eventsImg}
                    image="https://content.mycareersfuture.sg/wp-content/uploads/2019/09/resume-template-795x373.png"
                    />
                </Card>
                <div style={{textAlign:'right', marginTop:10, marginbottom:'10%'}}>
                    <Button
                    size="small"
                    style={{color:'#30A0D8', fontWeight:'bold', fontSize:18, marginTop:10}}
                    href='/events'
                    >
                    View All Events
                    </Button>
                </div>
            </div>
        </div>
   
        </div>
        
   )
}
export default DailyDigest;

