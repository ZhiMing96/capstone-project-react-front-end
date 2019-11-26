import React, { useState, useEffect, Fragment } from 'react'
import { CssBaseline, Box, Grid, Card, CardMedia, CardContent, Button, Paper, Avatar, Typography, createMuiTheme, IconButton, Divider, Hidden} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import styled from 'styled-components';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import api from '../../api';
import axios from 'axios';
import { connect } from "react-redux";
import {doLogin} from  '../../redux/actions/auth'
import CircularLoading from '../../Components/LoadingBars/CircularLoading';
import { useSnackbar } from 'notistack';
import ClearIcon from '@material-ui/icons/Clear'


const defaultJobIcon ='https://cdn.cleverism.com/wp-content/themes/cleverism/assets/img/src/logo-placeholder.png'

const Wrapper = styled.div`
    width:100%
`;

const Page = styled.div`
    width:100%
`;

const carouselSettings = {
    accessibiliy: true,
    speed:1700,
    slidesToShow: 4,
    slidesToScroll: 4,
    infinite:true,
    dots:false,
    autoplay: true,
    arrows:true,
    autoplaySpeed:8000,
    draggable:true,
    lazyLoad: "progressive",
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1920, //lg 
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 960, //md
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          dots: false
        }
      },
      {
        breakpoint: 480, //sm
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false
        }
      }]
  };

const theme = createMuiTheme({
    overrides: {}
});

const useStyles = makeStyles(theme => ({
    root:{
        marginRight:'17%',
        marginLeft:'17%',
        backgroundColor:'white',
        [theme.breakpoints.down('xs')]: {
            // paddingLeft:'5px',
            // paddingRight:'5px',
        },
        [theme.breakpoints.down('md')]: {
            marginLeft:'10%',
            marginRight:'10%',
            // paddingLeft:'5%',
            // paddingRight:'5%',
        },
        [theme.breakpoints.down('xs')]: {
            marginLeft:'2%',
            marginRight:'2%',
            // paddingLeft:'5%',
            // paddingRight:'5%',
        },
    },
    digestHeading:{
        width:'100%', 
        height:'14vh', 
        paddingTop:'5%', 
        textAlign:'left',
        paddingLeft:'5%',
        paddingRight:'5%',
        marginBottom:'3%'
    },
    sectionArea:{
        width:'100%', 
        marginTop:'10%', 
        textAlign:'left',
        paddingTop:'3%',
        paddingBottom:'3%',
        paddingLeft:'5%',
        paddingRight:'5%',
        backgroundColor:'white'
    },
    sectionAreaAlternate:{
        width:'100%', 
        marginTop:'10%', 
        textAlign:'left',
        paddingLeft:'5%',
        paddingRight:'5%',
    },
    sectionHeading:{
        fontWeight:'bold',
        fontSize:'35px',
        marginBottom:'2%'
    },
    eventsImg:{
        width:'35%', 
        padding:'3%',
        // boxShadow:'0px 1px 3px 0px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 2px 1px -1px rgba(0,0,0,0.12)',
        [theme.breakpoints.down('xs')]: {
            width:'100%'
        },
        objectFit:'contain'
    },
    jobsListingArea:{
        width:'90%',
        textAlign: 'start', 
        padding:15, 
        paddingRight:0,
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
        marginTop:'1%',
        height:'25%', 
        marginBottom:'1%',
        padding:'2%',
        '&:hover': {
            boxShadow:'0px 1px 8px 0px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 3px 3px -2px rgba(0,0,0,0.12)'
         },
         [theme.breakpoints.down('xs')]: {
            display: 'inherit'
        },
    },
    jobTitle : {
        marginTop:12,
        fontWeight:'bold', 
        fontSize:16, 
        whiteSpace:'normal',
        textAlign:'left',
        lineHeight:'18px',
        overflow:'hidden',
        textOverflow:'ellipsis',
        display:'-webkit-box',
        WebkitLineClamp:2,
        WebkitBoxOrient:'vertical',
    },
    jobText : {
        fontWeight:'bold', 
        fontSize:11, 
        whiteSpace:'normal',
        textAlign:'left'
    },
    tagStyle:{
        padding:5, 
        paddingLeft:8, 
        color:'white',
        fontSize:11, 
        fontWeight:'bold',
        zIndex:100,
    },
    headingTypography : {
        [theme.breakpoints.down('xs')]: {
            fontSize:'30px'
        },
    },
    eventCardContent : {
        flex: '1 0 auto', 
        height:'100%', 
        textAlign:'left', 
        width:'55%', 
        paddingRight:'10%',
        [theme.breakpoints.down('xs')]: {
            width:'100%',
            paddingRight:'4%',

        },
    }
  }));

  const jobUrlDefault ='https://www.mycareersfuture.sg/job/'
  
  const defaultImg = 'https://portal.ssg-wsg.gov.sg/content/dam/eventCatalog/products/import/categories/events/E-0000981/E-0000981.jpg'

function DailyDigest(props) {
    var urlToken=''
    if(props.match !== undefined){
        urlToken = props.match.params.token;

        console.log('urlToken = ' + urlToken);
    } 
    console.log('PROPS FOR Daily Digest COMPONENT')
    console.log(props)

    const classes = useStyles();
    const token = window.localStorage.getItem('authToken');
    const [recommendedArticles, setRecommendedArticles] = useState();
    const [recommendedEvents, setRecommendedEvents] = useState();
    const [searchHistoryJobs, setsearchHistoryJobs] = useState();
    const [skillsJobs, setskillsJobs] = useState();
    const [jobTag,setJobTag] = useState();
    const [date, setDate] = useState();
    const [openModal, setOpenModal] = useState(false);
    const tagColor = { 
        green: '#4CB593',
        blue: '#42A5F5',
        orange: '#FF7043'
    }
    const [loading, setLoading] = useState(false);
    const [name, setName]  = useState('');
    const [popularJobs, setPopularJobs] = useState();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const action = key => (
        <Fragment>
            <IconButton onClick={() => { closeSnackbar(key) }} size="small" style={{ color:'white' }}>
                <ClearIcon/>
            </IconButton>
        </Fragment>
    );
    

    useEffect(()=>{
        setTimeout( handleOpen, 5000)
    },[])

    const handleOpen = () =>{
        console.log('HANDLE OPEN')
    }


    useEffect(()=>{
        const currentDate = new Date();
        const currentDay = currentDate.getDate()
        const currentMonth = currentDate.toLocaleString('en-GB',{month: 'long'});
        const currentYear = currentDate.getFullYear();
        const currentWeekday = currentDate.toLocaleString('en-GB',{weekday: 'long'});
        console.log(currentMonth)
        setDate(`${currentDay} ${currentMonth} ${currentYear}, ${currentWeekday}`)
    },[token])

    useEffect(()=>{
        if(token){
            api.profile.get().then(
                res=>{
                  if(res.data.profile){
                    console.log(res.data.profile.first_name)
                    const firstName = res.data.profile.first_name
                    setName(firstName);
                    
                  } else {
                    props.history.push("/",{tokenInvalid:true})
                    enqueueSnackbar("Invalid Token",  { variant: "error", action } );
                  }
                } 
              ).catch(err => {
                if(err.response) {
                    const status = err.response.status
                    const statusText = err.response.statusText
                    console.log(status);
                    console.log(statusText);
                    enqueueSnackbar(`Error ${status}: ${statusText}`,  { variant: "error", action } );
                  }
              })
        }
        
    },[])


    useEffect(()=>{
        console.log(window.localStorage.getItem('authToken'));
        console.log(urlToken)
        // setLoading(true);
        console.log('****** ENTERED METHOD ********')
        if(urlToken === undefined){
            if(token){
                console.log('****** ENTERED IF TOKEN  ********')
                api.dailyDigest.get()
                .then(res => {
                    console.log("GOT RESPONSE");
                    console.log(res.data)
                    const results = res.data
                    if(results.response_code === 200){
                        console.log('Daily Digest Retrieved Successfully!')
                        setRecommendedArticles(results.articles);
                        setsearchHistoryJobs(results.recommended_jobs_search);
                        setskillsJobs(results.recommended_jobs_skills);

                        console.log('***** EVENTS RESULTS *******')
                        console.log(results.events)
                        setRecommendedEvents(results.events);
                        setLoading(false);
                    } else {
                        enqueueSnackbar("Unable To Retrieve Daily Digest!",  { variant: "error", action } );
                        props.history.push("/",{tokenInvalid:true})
                    }
                }).catch(err=> {
                    const status = err.response.status
                    const statusText = err.response.statusText
                    console.log(status);
                    console.log(statusText);
                    enqueueSnackbar(`Error ${status}: ${statusText}`,  { variant: "error", action } );
                    props.history.push("/",{tokenInvalid:true})
                });

            } else {
                console.log('****** ENTERED ELSE ********')
                api.dailyDigest.getPublic()
                .then(res => {
                    console.log(res.data)
                    const results = res.data
                    if(results.response_code === 200){
                        console.log('Daily Digest Retrieved Successfully!')
                        setRecommendedArticles(results.articles);
                        setPopularJobs(results.recommended_jobs);
                        console.log('***** EVENTS RESULTS *******')
                        console.log(results.events)
                         setRecommendedEvents(results.events);
                        setLoading(false);
                    } else {
                        enqueueSnackbar("Unable To Retrieve Daily Digest!",  { variant: "error", action } );
                        props.history.push("/",{tokenInvalid:true})
                    }
                }).catch(err=> {
                    const status = err.response.status
                    const statusText = err.response.statusText
                    console.log(status);
                    console.log(statusText);
                    enqueueSnackbar(`Error ${status}: ${statusText}`,  { variant: "error", action } );
                    props.history.push("/",{tokenInvalid:true})
                });
            }
        } else {
            console.log('Entered Getting DAILY DIGEST From URL ')
            console.log(urlToken)
            api.dailyDigest.getFromUrl(urlToken)
            .then(res => {
                console.log(res.data)
                const results = res.data
                if(results.response_code === 200){
                    console.log('Daily Digest Retrieved Successfully!')
                    setRecommendedArticles(results.articles);
                    setsearchHistoryJobs(results.recommended_jobs_search);
                    setskillsJobs(results.recommended_jobs_skills);
                    setRecommendedEvents(results.events);
                    setLoading(false);
                } else {
                    enqueueSnackbar("Unable To Retrieve Daily Digest!",  { variant: "error", action } );
                    props.history.push("/",{tokenInvalid:true})
                }
                window.localStorage.setItem('authToken', urlToken);
                api.profile.get() 
                .then(res => {
                    if(res.data.response_code === 200){
                        let userId = res.data.profile.user_id
                        props.doLogin(userId) //link to store action to hydrate store, connect
                    } else {
                        enqueueSnackbar("Unable To Login!",  { variant: "error", action } );
                    }
                    
                }).catch(err => {
                    if(err.response) {
                        const status = err.response.status
                        const statusText = err.response.statusText
                        console.log(status);
                        console.log(statusText);
                        enqueueSnackbar(`Error ${status}: ${statusText}`,  { variant: "error", action } );
                      }
                })
            }).catch(err=> {
                if(err.response) {
                    const status = err.response.status
                    const statusText = err.response.statusText
                    console.log(status);
                    console.log(statusText);
                    enqueueSnackbar(`Error ${status}: ${statusText}`,  { variant: "error", action } );
                  }
                props.history.push("/",{tokenInvalid:true})
            });
        }
    }, [] )

    const handleHrefClick = list => {
        console.log('***** HREF CLICK *****')
        console.log(list)
        console.log(list.job_uuid)
        console.log(token);
        if(token !== null){
            console.log('TRACKING CLICK')
            api.searchJobsAcct.click({ uuid: list.job_uuid })
            .then(response => {
                console.log(response);
                if(response.data.response_code===200){
                    console.log("Click Stored SUCCESSFULLY ");
                }
            })
            .catch(error =>{
                console.log(error);
            })
            
        } else {
            console.log('NOT TRACKING CLICK') 
        }
        
        const url = jobUrlDefault + list.job_uuid
        window.open(url,'_blank');
        
    }

    const getDate =(dateString) => {
        var date = new Date(dateString);
        var time = date.getHours();
        if (time <= 12) {
          time = `${time}am`
          //console.log(time);
        } else {
          time = `${time - 12}pm`
          //console.log(time);
        }
    
        var month = date.toLocaleString('en-GB', { month: 'short' });
        var day = date.getMonth();
        var year = date.getFullYear();
        return(`${day} ${month} ${year}: ${time}`);
    }
    


    
    // console.log('Recommended Articles:')
    // console.log(recommendedArticles);
    // console.log('Recommended Jobs:')
    // console.log(searchHistoryJobs)
    // console.log(skillsJobs)
    // console.log('Recommended Events:')
    // console.log(recommendedEvents)
    // console.log('NAME = ' + name)


    return (
        <div style={{ backgroundColor:'whitesmoke', width:'100%', height:'100%'}}>
            <div className={classes.root}>
            <CssBaseline/>
            <div className={classes.digestHeading}>
                <Typography variant='subtitle1' gutterBottom>
                    {date}
                </Typography>
                <Typography gutterBottom variant='h3' className={classes.headingTypography}>
                    <span style={{fontWeight:550}}>JOPIFY DAILY</span> <span style={{fontWeight:'lighter'}}>DIGEST</span>
                </Typography>
                { name
                ?
                <Typography variant='h6'>
                    For {name.toUpperCase()}
                </Typography>
                : ''
                }
                
            </div>
            { loading 
            ? <CircularLoading/>
            : 
            <div>
            <div className={classes.sectionArea}>
            {recommendedArticles && recommendedArticles.length !== 0
            ?
            <div>
                <Typography className={classes.sectionHeading}>
                    From The Blog
                </Typography>
                {token
                ?
                <div style={{textAlign:'right'}}>
                    <Typography variant='caption' gutterBottom>
                    Recommended Topic
                    </Typography>
                    <Typography variant='body1' style={{color:'#024966',fontWeight:'bold'}}>
                    {recommendedArticles[0][0].jobtag}
                    </Typography>
                </div>
                :''
                }
                <Grid container spacing={4} style={{marginTop:8}}>
                    {recommendedArticles.slice(0,2).map((article,index)=>(
                    <Grid item xs={12} sm={6} key={index}>
                        <Card style={{boxShadow:'none'}} >
                            <a href={article[0].link} target="_blank">
                                <CardMedia
                                component="img"
                                alt="Contemplative Reptile"
                                height="250"
                                image={article[0].imagelink}
                                title={article[0].title}/>
                            </a>
                            <CardContent style={{paddingBottom:5}}>
                                <Typography className={classes.articleHeading} gutterBottom variant='h6'>
                                {article[0].title}
                                </Typography>
                                <Typography className={classes.articleDescription}
                                gutterBottom variant='subtitle2'>
                                    {article[0].sentence1}
                                    {article[0].sentence2}
                                    {article[0].sentence3}
                                </Typography>
                                <Typography variant='caption'>
                                    {article[0].readtime} min read
                                </Typography >
                            </CardContent>
                        </Card>
                    </Grid>
                    ))}
                </Grid>
                </div>
                :
                    <div style={{textAlign:'left', marginTop:'2%', paddingBottom:'7%',}}>
                        <Typography className={classes.sectionHeading}>
                            Oops..
                        </Typography>
                        <Typography style={{fontWeight:'bold'}}>
                            No Articles Available.
                        </Typography>
                    </div>
                }
                <div style={{textAlign:'right', marginTop:10,}}>
                    <Button
                    size="small"
                    style={{color:'#30A0D8', fontWeight:'bold', fontSize:18}}
                    href='/articles'
                    >
                    View All Articles
                    </Button>
                </div>
            </div>
            
            
            
            <div className={classes.sectionAreaAlternate}>
                <div>
                    <Typography className={classes.sectionHeading}>
                        Apply Now <span style={{fontSize:15, fontWeight:'bold', color:'grey'}}>  Jobs that we recommend </span>
                    </Typography>
                </div>
                <div>
                {token
                ? 
                <div>
                    {searchHistoryJobs && searchHistoryJobs.length !== 0 
                    ? 
                    <div style={{marginTop:'5%'}}>
                        <div style={{textAlign:'right', marginBottom:'2%'}}>
                            <Typography variant='caption' gutterBottom>
                            Recommended By
                            </Typography>
                            <Typography variant='body1' style={{color:'#024966',fontWeight:'bold'}}>
                            Search History
                            </Typography>
                        </div>
                        <Wrapper>
                            <Slider {...carouselSettings}>
                                {searchHistoryJobs.map((job,index)=> (
                                <Page>
                                    <Paper className={classes.jobsListingArea}>
                                    <Grid container justify='space-between'>
                                        <Grid item>
                                        <Avatar alt="List"
                                            src={job.company_logo ? job.company_logo:defaultJobIcon}
                                            className={classes.jobListingPhoto}
                                            imgProps={{style:{objectFit:'contain',border:0}}}
                                        />
                                        </Grid>
                                        <Grid item style={{ }}>
                                        { job.skills_match < 0.3
                                            ?
                                            <Typography className={classes.tagStyle} style={{backgroundColor:tagColor.orange,}}>
                                                Add Skills
                                            </Typography>
                                            : job.skills_match < 0.7
                                            ?
                                            <Typography className={classes.tagStyle} style={{backgroundColor:tagColor.green,}}>
                                                Recommended
                                            </Typography>
                                            : job.skills_match < 1
                                            ?
                                            <Typography className={classes.tagStyle} style={{backgroundColor:tagColor.blue,}}>
                                                Apply Now
                                            </Typography>
                                            :''
                                        }
                                        </Grid>
                                    </Grid>
                                        <Grid container  justify='space-between' style={{height:'14vh',paddingRight:10}}>
                                        <Grid item xs={12}>
                                            <Typography gutterBottom className={classes.jobTitle}>
                                                {job.title}
                                            </Typography>
                                            <Typography gutterBottom className={classes.jobText}>
                                                {job.postedCompany?job.postedCompany.name: job.hiringCompany? job.hiringCompany.name: 'Unknown Company'}
                                            </Typography>
                                            </Grid>
                                            <Grid item xs={12} style={{textAlign:'right', alignSelf:'flex-end'}}>
                                                <Button color='primary' style={{fontSize:12,fontWeight:'bold'}} size='small'
                                                onClick={()=>handleHrefClick(job)}
                                                >
                                                    Details
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                </Page>
                                ))}
                            </Slider>
                        </Wrapper>
                    </div>
                    : ''
                    }
                    {skillsJobs && skillsJobs.length !== 0
                    ? 
                    <div style={{marginTop:'5%'}}>
                        <div style={{textAlign:'right', marginBottom:'2%'}}>
                            <Typography variant='caption' gutterBottom>
                            Recommended By
                            </Typography>
                            <Typography variant='body1' style={{color:'#024966',fontWeight:'bold'}}>
                            Your Skills
                            </Typography>
                        </div>
                        <Wrapper>
                            <Slider {...carouselSettings}>
                                {skillsJobs.map((job,index)=>(
                                <Page>
                                    <Paper className={classes.jobsListingArea}>
                                    <Grid container justify='space-between'>
                                        <Grid item>
                                        <Avatar alt="List"
                                            src={job.company_logo ? job.company_logo:defaultJobIcon}
                                            className={classes.jobListingPhoto}
                                            imgProps={{style:{objectFit:'contain',border:0}}}
                                        />
                                        </Grid>
                                        <Grid item style={{ }}>
                                        { job.skills_match < 0.3
                                            ?
                                            <Typography className={classes.tagStyle} style={{backgroundColor:tagColor.orange,}}>
                                                Add Skills
                                            </Typography>
                                            : job.skills_match < 0.7
                                            ?
                                            <Typography className={classes.tagStyle} style={{backgroundColor:tagColor.green,}}>
                                                Recommended
                                            </Typography>
                                            : job.skills_match < 1
                                            ?
                                            <Typography className={classes.tagStyle} style={{backgroundColor:tagColor.blue,}}>
                                                Apply Now
                                            </Typography>
                                            :''
                                        }
                                        </Grid>
                                    </Grid>
                                    <Grid container  justify='space-between' style={{height:'14vh', paddingRight:10}}>
                                        <Grid item xs={12}>
                                            <Typography gutterBottom className={classes.jobTitle} style={{}}>
                                                {job.title}
                                            </Typography>
                                            <Typography gutterBottom className={classes.jobText}>
                                                {job.postedCompany?job.postedCompany.name: job.hiringCompany? job.hiringCompany.name: 'Unknown Company'}
                                            </Typography>
                                            </Grid>
                                            <Grid item xs={12} style={{textAlign:'right', alignSelf:'flex-end'}}>
                                                <Button color='primary' style={{fontSize:12,fontWeight:'bold'}} size='small'
                                                onClick={()=>handleHrefClick(job)}
                                                >
                                                    Details
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                </Page>
                                ))}
                            </Slider>
                        </Wrapper>
                    </div>
                    : skillsJobs && skillsJobs.length === 0 && searchHistoryJobs && searchHistoryJobs.length === 0
                    ? 
                    <div style={{textAlign:'left', marginTop:'2%', paddingBottom:'7%', }}>
                        <Typography className={classes.sectionHeading}>
                            Oops...
                        </Typography>
                        <Typography style={{fontWeight:'bold'}}>
                            No Job Recommendations Available.
                        </Typography>
                    </div>
                    : '' 
                    }
                </div>
                    
                : popularJobs && popularJobs.length !== 0
                ? 
                <div style={{marginTop:'5%'}}>
                        <Wrapper>
                            <Slider {...carouselSettings}>
                                {popularJobs.map((job,index)=>(
                                <Page>
                                    <Paper className={classes.jobsListingArea}>
                                    <Grid container justify='space-between'>
                                        <Grid item>
                                        <Avatar alt="List"
                                            src={job.company_logo ? job.company_logo:defaultJobIcon}
                                            className={classes.jobListingPhoto}
                                            imgProps={{style:{objectFit:'contain',border:0}}}
                                        />
                                        </Grid>
                                        <Grid item style={{ }}>
                                        { job.skills_match < 0.3
                                            ?
                                            <Typography className={classes.tagStyle} style={{backgroundColor:tagColor.orange,}}>
                                                Add Skills
                                            </Typography>
                                            : job.skills_match < 0.7
                                            ?
                                            <Typography className={classes.tagStyle} style={{backgroundColor:tagColor.green,}}>
                                                Recommended
                                            </Typography>
                                            : job.skills_match < 1
                                            ?
                                            <Typography className={classes.tagStyle} style={{backgroundColor:tagColor.blue,}}>
                                                Apply Now
                                            </Typography>
                                            :''
                                        }
                                        </Grid>
                                    </Grid>
                                    <Grid container  justify='space-between' style={{height:'14vh', paddingRight:10}}>
                                        <Grid item xs={12}>
                                            <Typography gutterBottom className={classes.jobTitle} style={{}}>
                                                {job.title}
                                            </Typography>
                                            <Typography gutterBottom className={classes.jobText}>
                                                {job.postedCompany?job.postedCompany.name: job.hiringCompany? job.hiringCompany.name: 'Unknown Company'}
                                            </Typography>
                                            </Grid>
                                            <Grid item xs={12} style={{textAlign:'right', alignSelf:'flex-end'}}>
                                                <Button color='primary' style={{fontSize:12,fontWeight:'bold'}} size='small'
                                                onClick={()=>handleHrefClick(job)}
                                                >
                                                    Details
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                </Page>
                                ))}
                            </Slider>
                        </Wrapper>
                </div>
                : 
                <div style={{textAlign:'left', marginTop:'2%', paddingBottom:'7%', }}>
                    <Typography className={classes.sectionHeading}>
                        Oops...
                    </Typography>
                    <Typography style={{fontWeight:'bold'}}>
                        No Job Recommendations Available.
                    </Typography>
                </div>
                }
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
            </div>
            

            <div className={classes.sectionArea}>
            { recommendedEvents
            ?
                <div>
                <Typography className={classes.sectionHeading}>
                From Events
                </Typography>
                {token
                ?
                <div style={{textAlign:'right', marginBottom:'1%'}}>
                    <Typography variant='caption' gutterBottom>
                    Recommended Topic
                    </Typography>
                    <Typography variant='body1' style={{color:'#024966',fontWeight:'bold'}}>
                    {recommendedEvents[0][0].job_phase==="GROW_CAREER" ? 'Grow Your Career' : recommendedEvents[0][0].job_phase==='SEARCH_JOB' ? 'Search For Job':'' } 
                    </Typography>
                </div>
                :''
                }
                
                {recommendedEvents.map((event, index) => (
                    <div>
                    <a href={event[0].url} target="_blank" style={{textDecoration:'none'}}>
                    <Card className={classes.eventListing}>
                        <Hidden smUp> {/* Only show in XS */}
                            <CardMedia
                                component="img"
                                alt="Contemplative Reptile"
                                className={classes.eventsImg}
                                image={event[0].logo ? event[0].logo : defaultImg}
                                />
                        </Hidden>
                            <CardContent className={classes.eventCardContent}>
                            <div style={{display: 'flex', flexDirection: 'column'}}>
                                <Typography variant='h6' style={{fontWeight:'bold'}} >
                                {event[0].event_title}
                                </Typography>
                                <Typography variant='subtitle1' color='textSecondary' style={{overflow:'hidden',textOverflow:'ellipsis', display:'-webkit-box',WebkitLineClamp:3,WebkitBoxOrient:'vertical',}}>
                                {event[0].summary}
                                </Typography>
                                <Typography>
                                    {getDate(event[0].date_time)}
                                </Typography>
                            </div>
                            </CardContent>
                            <Hidden xsDown>
                                <CardMedia
                                    component="img"
                                    alt="Contemplative Reptile"
                                    className={classes.eventsImg}
                                    image={event[0].logo ? event[0].logo : defaultImg}
                                />
                            </Hidden>
                            
                    </Card>
                    <Divider/>
                    </a>
                    </div>
                 ))} 
                
            </div>
            : 
            <div style={{textAlign:'left', marginTop:'2%', paddingBottom:'7%',}}>
                <Typography className={classes.sectionHeading}>
                    Oops...
                </Typography>
                <Typography style={{fontWeight:'bold'}}>
                    No Events Available.
                </Typography>
            </div>
            }
            <div style={{textAlign:'right', marginTop:15, marginbottom:'10%',}}>
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
        }
        </div>
    </div>
   )
}
export default connect(null, { doLogin })(DailyDigest);




{/* </div> */}
{/* 
                {searchHistoryJobs || skillsJobs || popularJobs 
                ?
                <div>
                    <Typography className={classes.sectionHeading}>
                        Apply Now <span style={{fontSize:15, fontWeight:'bold', color:'grey'}}>  Jobs that we recommend </span>
                    </Typography>
                <div>
                {searchHistoryJobs && searchHistoryJobs.length !== 0 
                    ?
                    <div>
                        
                        {token
                        ?
                        <div style={{textAlign:'right', marginBottom:'2%'}}>
                            <Typography variant='caption' gutterBottom>
                            Recommended By
                            </Typography>
                            <Typography variant='body1' style={{color:'#024966',fontWeight:'bold'}}>
                            Search History
                            </Typography>
                        </div>
                        : ''
                        }
                        <Wrapper>
                            <Slider {...carouselSettings}>
                                {searchHistoryJobs.map((job,index)=> (
                                <Page>
                                    <Paper className={classes.jobsListingArea}>
                                    <Grid container justify='space-between'>
                                        <Grid item>
                                        <Avatar alt="List"
                                            src={job.company_logo ? job.company_logo:defaultJobIcon}
                                            className={classes.jobListingPhoto}
                                            imgProps={{style:{objectFit:'contain',border:0}}}
                                        />
                                        </Grid>
                                        <Grid item style={{ }}>
                                        { job.skills_match < 0.3
                                            ?
                                            <Typography className={classes.tagStyle} style={{backgroundColor:tagColor.orange,}}>
                                                Add Skills
                                            </Typography>
                                            : job.skills_match < 0.7
                                            ?
                                            <Typography className={classes.tagStyle} style={{backgroundColor:tagColor.green,}}>
                                                Recommended
                                            </Typography>
                                            : job.skills_match < 1
                                            ?
                                            <Typography className={classes.tagStyle} style={{backgroundColor:tagColor.blue,}}>
                                                Apply Now
                                            </Typography>
                                            :''
                                        }
                                        </Grid>
                                    </Grid>
                                        <Grid container  justify='space-between' style={{height:'14vh',paddingRight:10}}>
                                        <Grid item xs={12}>
                                            <Typography gutterBottom className={classes.jobTitle}>
                                                {job.title}
                                            </Typography>
                                            <Typography gutterBottom className={classes.jobText}>
                                                {job.postedCompany?job.postedCompany.name: job.hiringCompany? job.hiringCompany.name: 'Unknown Company'}
                                            </Typography>
                                            </Grid>
                                            <Grid item xs={12} style={{textAlign:'right', alignSelf:'flex-end'}}>
                                                <Button color='primary' style={{fontSize:12,fontWeight:'bold'}} size='small'
                                                onClick={()=>handleHrefClick(job)}
                                                >
                                                    Details
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                </Page>
                                ))}
                            </Slider>
                        </Wrapper>
                    </div>
                    :''
                }
                </div>
                <div>
                {skillsJobs && skillsJobs.length !== 0
                    ?
                    <div style={{marginTop:'5%'}}>
                        {token
                        ?
                        <div style={{textAlign:'right', marginBottom:'2%'}}>
                            <Typography variant='caption' gutterBottom>
                            Recommended By
                            </Typography>
                            <Typography variant='body1' style={{color:'#024966',fontWeight:'bold'}}>
                            Your Skills
                            </Typography>
                        </div>
                        :''
                        }
                        <Wrapper>
                            <Slider {...carouselSettings}>
                                {skillsJobs.map((job,index)=>(
                                <Page>
                                    <Paper className={classes.jobsListingArea}>
                                    <Grid container justify='space-between'>
                                        <Grid item>
                                        <Avatar alt="List"
                                            src={job.company_logo ? job.company_logo:defaultJobIcon}
                                            className={classes.jobListingPhoto}
                                            imgProps={{style:{objectFit:'contain',border:0}}}
                                        />
                                        </Grid>
                                        <Grid item style={{ }}>
                                        { job.skills_match < 0.3
                                            ?
                                            <Typography className={classes.tagStyle} style={{backgroundColor:tagColor.orange,}}>
                                                Add Skills
                                            </Typography>
                                            : job.skills_match < 0.7
                                            ?
                                            <Typography className={classes.tagStyle} style={{backgroundColor:tagColor.green,}}>
                                                Recommended
                                            </Typography>
                                            : job.skills_match < 1
                                            ?
                                            <Typography className={classes.tagStyle} style={{backgroundColor:tagColor.blue,}}>
                                                Apply Now
                                            </Typography>
                                            :''
                                        }
                                        </Grid>
                                    </Grid>
                                    <Grid container  justify='space-between' style={{height:'14vh', paddingRight:10}}>
                                        <Grid item xs={12}>
                                            <Typography gutterBottom className={classes.jobTitle} style={{}}>
                                                {job.title}
                                            </Typography>
                                            <Typography gutterBottom className={classes.jobText}>
                                                {job.postedCompany?job.postedCompany.name: job.hiringCompany? job.hiringCompany.name: 'Unknown Company'}
                                            </Typography>
                                            </Grid>
                                            <Grid item xs={12} style={{textAlign:'right', alignSelf:'flex-end'}}>
                                                <Button color='primary' style={{fontSize:12,fontWeight:'bold'}} size='small'
                                                onClick={()=>handleHrefClick(job)}
                                                >
                                                    Details
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                </Page>
                                ))}
                            </Slider>
                        </Wrapper>
                    
                    </div>
                    : ''
                    }
                </div>
                <div>
                    {popularJobs && popularJobs.length !== 0
                    ?
                    <div style={{marginTop:'5%'}}>
                        <Wrapper>
                            <Slider {...carouselSettings}>
                                {popularJobs.map((job,index)=>(
                                <Page>
                                    <Paper className={classes.jobsListingArea}>
                                    <Grid container justify='space-between'>
                                        <Grid item>
                                        <Avatar alt="List"
                                            src={job.company_logo ? job.company_logo:defaultJobIcon}
                                            className={classes.jobListingPhoto}
                                            imgProps={{style:{objectFit:'contain',border:0}}}
                                        />
                                        </Grid>
                                        <Grid item style={{ }}>
                                        { job.skills_match < 0.3
                                            ?
                                            <Typography className={classes.tagStyle} style={{backgroundColor:tagColor.orange,}}>
                                                Add Skills
                                            </Typography>
                                            : job.skills_match < 0.7
                                            ?
                                            <Typography className={classes.tagStyle} style={{backgroundColor:tagColor.green,}}>
                                                Recommended
                                            </Typography>
                                            : job.skills_match < 1
                                            ?
                                            <Typography className={classes.tagStyle} style={{backgroundColor:tagColor.blue,}}>
                                                Apply Now
                                            </Typography>
                                            :''
                                        }
                                        </Grid>
                                    </Grid>
                                    <Grid container  justify='space-between' style={{height:'14vh', paddingRight:10}}>
                                        <Grid item xs={12}>
                                            <Typography gutterBottom className={classes.jobTitle} style={{}}>
                                                {job.title}
                                            </Typography>
                                            <Typography gutterBottom className={classes.jobText}>
                                                {job.postedCompany?job.postedCompany.name: job.hiringCompany? job.hiringCompany.name: 'Unknown Company'}
                                            </Typography>
                                            </Grid>
                                            <Grid item xs={12} style={{textAlign:'right', alignSelf:'flex-end'}}>
                                                <Button color='primary' style={{fontSize:12,fontWeight:'bold'}} size='small'
                                                onClick={()=>handleHrefClick(job)}
                                                >
                                                    Details
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                </Page>
                                ))}
                            </Slider>
                        </Wrapper>
                    </div>
                    :''
                    }
                </div>
                </div>
                :
                <div style={{textAlign:'left', marginTop:'2%', paddingBottom:'7%', }}>
                    <Typography className={classes.sectionHeading}>
                        Oops...
                    </Typography>
                    <Typography style={{fontWeight:'bold'}}>
                        No Job Recommendations Available.
                    </Typography>
                </div>
                }*/}
                    {/* <div style={{textAlign:'right', marginTop:10}}>
                        <Button
                        size="small"
                        style={{color:'#30A0D8', fontWeight:'bold', fontSize:18}}
                        href='/jobs'
                        >
                        Search a Job
                        </Button>
                    </div>
                </div> 
            </div> */}