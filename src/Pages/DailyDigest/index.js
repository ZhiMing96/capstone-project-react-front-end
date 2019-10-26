import React, { useState, useEffect } from 'react'
import { CssBaseline, Box, Grid, Card, CardMedia, CardContent, Button, Paper, Avatar, Typography, createMuiTheme, Slide, Divider } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import styled from 'styled-components';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import api from '../../api';
import axios from 'axios';
import CircularLoading from '../../Components/LoadingBars/CircularLoading';
const defaultJobIcon = 'https://cdn.cleverism.com/wp-content/themes/cleverism/assets/img/src/logo-placeholder.png'

const Wrapper = styled.div`
    width:100%
`;

const Page = styled.div`
    width:100%
`;

const carouselSettings = {
    accessibiliy: true,
    speed: 1700,
    slidesToShow: 4,
    slidesToScroll: 4,
    infinite: true,
    dots: false,
    autoplay: true,
    arrows: true,
    autoplaySpeed: 8000,
    draggable: true,
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
    root: {
        marginRight: '17%',
        marginLeft: '17%',
        backgroundColor: 'white',
        [theme.breakpoints.down('xs')]: {
            // paddingLeft:'5px',
            // paddingRight:'5px',
        },
        [theme.breakpoints.down('md')]: {
            marginLeft: '10%',
            marginRight: '10%',
            // paddingLeft:'5%',
            // paddingRight:'5%',
        },
        [theme.breakpoints.down('xs')]: {
            marginLeft: '2%',
            marginRight: '2%',
            // paddingLeft:'5%',
            // paddingRight:'5%',
        },
    },
    digestHeading: {
        width: '100%',
        height: '14vh',
        paddingTop: '5%',
        textAlign: 'left',
        paddingLeft: '5%',
        paddingRight: '5%',
        marginBottom: '3%'
    },
    sectionArea: {
        width: '100%',
        marginTop: '10%',
        textAlign: 'left',
        paddingTop: '3%',
        paddingBottom: '3%',
        paddingLeft: '5%',
        paddingRight: '5%',
        backgroundColor: 'white'
    },
    sectionAreaAlternate: {
        width: '100%',
        marginTop: '10%',
        textAlign: 'left',
        paddingLeft: '5%',
        paddingRight: '5%',
    },
    sectionHeading: {
        fontWeight: 'bold',
        fontSize: '35px',
        marginBottom: '2%'
    },
    eventsImg: {
        width: '20%',
        boxShadow: '0px 1px 3px 0px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 2px 1px -1px rgba(0,0,0,0.12)',
        [theme.breakpoints.down('xs')]: {
            width: '30%',
        },
    },
    jobsListingArea: {
        width: '90%',
        textAlign: 'start',
        padding: 15,
        paddingRight: 0,
        marginBottom: 5,
        maxWidth: '330px',
        [theme.breakpoints.down('xs')]: {
            margin: 20
        },
        boxShadow: '0px 1px 3px 0px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.12)',
        '&:hover': {
            boxShadow: '0px 1px 8px 0px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 3px 3px -2px rgba(0,0,0,0.12)'
        }
    },
    jobListingPhoto: {
        width: 70,
        height: 70,
        boxShadow: '0px 1px 5px 0px rgba(0,0,0,0.2)'
    },
    articleHeading: {
        lineHeight: 1.3,
        fontWeight: 'bold',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
    },
    articleDescription: {
        lineHeight: 1.3,
        color: 'grey',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        WebkitLineClamp: 3,
        WebkitBoxOrient: 'vertical',
    },
    eventListing: {
        display: 'flex',
        boxShadow: 'none', backgroundColor: 'inherit',
        border: 0,
        marginTop: '1%',
        height: '25%',
        marginBottom: '1%',
        padding: '2%',
        '&:hover': {
            boxShadow: '0px 1px 8px 0px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 3px 3px -2px rgba(0,0,0,0.12)'
        }
    },
    jobTitle: {
        marginTop: 12,
        fontWeight: 'bold',
        fontSize: 16,
        whiteSpace: 'normal',
        textAlign: 'left',
        lineHeight: '18px',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
    },
    jobText: {
        fontWeight: 'bold',
        fontSize: 11,
        whiteSpace: 'normal',
        textAlign: 'left'
    },
    tagStyle: {
        padding: 5,
        paddingLeft: 8,
        color: 'white',
        fontSize: 11,
        fontWeight: 'bold',
        zIndex: 100,
    },
}));

function DailyDigest(props) {
    var urlToken = ''
    if (props.match !== undefined) {
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
    const [jobTag, setJobTag] = useState();
    const [date, setDate] = useState();
    const [openModal, setOpenModal] = useState(false);
    const tagColor = {
        green: '#4CB593',
        blue: '#42A5F5',
        orange: '#FF7043'
    }
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('');

    useEffect(() => {
        setTimeout(handleOpen, 1000)
    }, [])

    const handleOpen = () => {
        console.log('HANDLE OPEN')
    }


    useEffect(() => {
        const currentDate = new Date();
        const currentDay = currentDate.getDate()
        const currentMonth = currentDate.toLocaleString('en-GB', { month: 'long' });
        const currentYear = currentDate.getFullYear();
        const currentWeekday = currentDate.toLocaleString('en-GB', { weekday: 'long' });
        console.log(currentMonth)
        setDate(`${currentDay} ${currentMonth} ${currentYear}, ${currentWeekday}`)
    }, [token])


    useEffect(() => {
        console.log('****** Getting Name ********')
        api.profile.get().then(
            res => {
                if (res.data.profile) {
                    console.log(res.data.profile.first_name)
                    const firstName = res.data.profile.first_name
                    setName(firstName);
                }
            }
        ).catch(err => console.error(err))
    }, [])


    useEffect(() => {
        console.log(window.localStorage.getItem('authToken'));
        console.log(urlToken)
        setLoading(true);
        if (urlToken === undefined) {
            if (token) {
                api.dailyDigest.get()
                    .then(res => {
                        console.log(res.data)
                        const results = res.data
                        if (results.response_code === 200) {
                            console.log('Daily Digest Retrieved Successfully!')
                            setRecommendedArticles(results.articles);
                            setsearchHistoryJobs(results.recommended_jobs_search);
                            setskillsJobs(results.recommended_jobs_skills);
                            setLoading(false);
                        }
                    }).catch(err => { console.error(err) });

            } else {
                api.dailyDigest.getPublic()
                    .then(res => {
                        console.log(res.data)
                        const results = res.data
                        if (results.response_code === 200) {
                            console.log('Daily Digest Retrieved Successfully!')
                            setRecommendedArticles(results.articles);
                            setsearchHistoryJobs(results.recommended_jobs_search);
                            setskillsJobs(results.recommended_jobs_skills);

                        }
                        setLoading(false);
                    }).catch(err => { console.error(err) });
            }
        } else {
            api.dailyDigest.getFromUrl(urlToken)
                .then(res => {
                    console.log(res.data)
                    const results = res.data
                    window.localStorage.setItem('authToken', urlToken);
                    api.profile.get()
                        .then(response => {
                            let userId = response.data.profile.user_id
                            this.props.doLogin(userId) //link to store action to hydrate store, connect
                        })

                    if (results.response_code === 200) {
                        console.log('Daily Digest Retrieved Successfully!')
                        setRecommendedArticles(results.articles);
                        setsearchHistoryJobs(results.recommended_jobs_search);
                        setskillsJobs(results.recommended_jobs_skills);
                        setLoading(false);
                    }
                })
        }
    }, [])


    const getDate = (startDate, endDate) => {
        var newStartDate = new Date(startDate);
        var newEndDate = new Date(endDate);
        //console.log(newStartDate.getHours());
        var startTime = newStartDate.getHours()
        var endTime = newEndDate.getHours()

        if (startTime <= 12) {
            startTime = `${startTime}am`
            //console.log(startTime);
        } else {
            startTime = `${startTime - 12}pm`
            //console.log(startTime);
        }
        if (endTime <= 12) {
            endTime = `${endTime}am`
            //console.log(endTime);
        } else {
            endTime = `${endTime - 12}pm`
            //console.log(endTime);
        }

        var month = newStartDate.toLocaleString('en-GB', { month: 'short' });
        console.log(month);
        var startDay = newStartDate.getMonth();
        var endDay = newEndDate.getMonth();
        var startYear = newStartDate.getFullYear();

        var day = startDay
        if (startDay != endDay) {
            day = `${startDay}-${endDay}`
        }

        return (`${day} ${month} ${startYear}: ${startTime}-${endTime}`)
    }


    console.log('Recommended Articles:')
    console.log(recommendedArticles);
    console.log('Recommended Jobs:')
    console.log(searchHistoryJobs)
    console.log(skillsJobs)
    console.log('Recommended Events:')
    console.log(recommendedEvents)
    console.log('NAME = ' + name)




    return (
        <div style={{ backgroundColor: 'whitesmoke', width: '100%', height: '100%' }}>
            <div className={classes.root}>
                <CssBaseline />
                <div className={classes.digestHeading}>
                    <Typography variant='subtitle1' gutterBottom>
                        {date}
                    </Typography>
                    <Typography gutterBottom variant='h3'>
                        <span style={{ fontWeight: 550 }}>JOPIFY DAILY</span> <span style={{ fontWeight: 'lighter' }}>DIGEST</span>
                    </Typography>
                    {name
                        ?
                        <Typography variant='h6'>
                            For {name.toUpperCase()}
                        </Typography>
                        : ''
                    }

                </div>
                {loading
                    ? <CircularLoading />
                    :
                    <div>
                        <div className={classes.sectionArea}>
                            {recommendedArticles
                                ?
                                <div>
                                    <Typography className={classes.sectionHeading}>
                                        From The Blog
                                    </Typography>
                                    {token
                                        ?
                                        <div style={{ textAlign: 'right' }}>
                                            <Typography variant='caption' gutterBottom>
                                                Recommended Topic
                                            </Typography>
                                            <Typography variant='body1' style={{ color: '#024966', fontWeight: 'bold' }}>
                                                Grow Your Career
                                            </Typography>
                                        </div>
                                        : ''
                                    }
                                    <Grid container spacing={4} style={{ marginTop: 8 }}>
                                        {recommendedArticles.slice(0, 2).map((article, index) => (
                                            <Grid item xs={12} sm={6} key={index}>
                                                <Card style={{ boxShadow: 'none' }}>
                                                    <CardMedia
                                                        component="img"
                                                        alt="Contemplative Reptile"
                                                        height="250"
                                                        image="https://content.mycareersfuture.sg/wp-content/uploads/2019/09/resume-template-795x373.png"
                                                        title={article[0].title} />
                                                    <CardContent style={{ paddingBottom: 5 }}>
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
                                <div style={{ textAlign: 'left', marginTop: '2%', paddingBottom: '7%', }}>
                                    <Typography className={classes.sectionHeading}>
                                        Oops..
                                    </Typography>
                                    <Typography style={{ fontWeight: 'bold' }}>
                                        No Articles Available.
                        </Typography>
                                </div>
                            }
                            <div style={{ textAlign: 'right', marginTop: 10, }}>
                                <Button
                                    size="small"
                                    style={{ color: '#30A0D8', fontWeight: 'bold', fontSize: 18 }}
                                    href='/articles'
                                >
                                    View All Articles
                                </Button>
                            </div>
                        </div>



                        <div className={classes.sectionAreaAlternate}>
                            {searchHistoryJobs || skillsJobs
                                ?
                                <div>
                                    <div>
                                        {searchHistoryJobs
                                            ?
                                            <div>
                                                <Typography className={classes.sectionHeading}>
                                                    Apply Now
                                                </Typography>
                                                {token
                                                    ?
                                                    <div style={{ textAlign: 'right', marginBottom: '2%' }}>
                                                        <Typography variant='caption' gutterBottom>
                                                            Recommended By
                                                        </Typography>
                                                        <Typography variant='body1' style={{ color: '#024966', fontWeight: 'bold' }}>
                                                            Search History
                                                        </Typography>
                                                    </div>
                                                    : ''
                                                }
                                                <Wrapper>
                                                    <Slider {...carouselSettings}>
                                                        {searchHistoryJobs.map((job, index) => (
                                                            <Page>
                                                                <Paper className={classes.jobsListingArea}>
                                                                    <Grid container justify='space-between'>
                                                                        <Grid item>
                                                                            <Avatar alt="List"
                                                                                src={job.postedCompany && job.postedCompany.logoUploadPath ? job.postedCompany.logoUploadPath : defaultJobIcon}
                                                                                className={classes.jobListingPhoto}
                                                                                imgProps={{ style: { objectFit: 'contain', border: 0 } }}
                                                                            />
                                                                        </Grid>
                                                                        <Grid item style={{}}>
                                                                            {job.skills_match < 0.3
                                                                                ?
                                                                                <Typography className={classes.tagStyle} style={{ backgroundColor: tagColor.orange, }}>
                                                                                    Add Skills
                                                                                </Typography>
                                                                                : job.skills_match < 0.7
                                                                                    ?
                                                                                    <Typography className={classes.tagStyle} style={{ backgroundColor: tagColor.green, }}>
                                                                                        Recommended
                                                                                    </Typography>
                                                                                    : job.skills_match < 1
                                                                                        ?
                                                                                        <Typography className={classes.tagStyle} style={{ backgroundColor: tagColor.blue, }}>
                                                                                            Apply Now
                                                                                        </Typography>
                                                                                        : ''
                                                                            }
                                                                        </Grid>
                                                                    </Grid>
                                                                    <Grid container justify='space-between' style={{ height: '14vh', paddingRight: 10 }}>
                                                                        <Grid item xs={12}>
                                                                            <Typography gutterBottom className={classes.jobTitle}>
                                                                                {job.title}
                                                                            </Typography>
                                                                            <Typography gutterBottom className={classes.jobText}>
                                                                                {job.postedCompany ? job.postedCompany.name : job.hiringCompany ? job.hiringCompany.name : 'Unknown Company'}
                                                                            </Typography>
                                                                        </Grid>
                                                                        <Grid item xs={12} style={{ textAlign: 'right', alignSelf: 'flex-end' }}>
                                                                            <Button color='primary' style={{ fontSize: 12, fontWeight: 'bold' }} size='small'

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
                                        {skillsJobs
                                            ?
                                            <div style={{ marginTop: '5%' }}>
                                                {token
                                                    ?
                                                    <div style={{ textAlign: 'right', marginBottom: '2%' }}>
                                                        <Typography variant='caption' gutterBottom>
                                                            Recommended By
                                                        </Typography>
                                                        <Typography variant='body1' style={{ color: '#024966', fontWeight: 'bold' }}>
                                                            Your Skills
                                                        </Typography>
                                                    </div>
                                                    : ''
                                                }
                                                <Wrapper>
                                                    <Slider {...carouselSettings}>
                                                        {skillsJobs.map((job, index) => (
                                                            <Page>
                                                                <Paper className={classes.jobsListingArea}>
                                                                    <Grid container justify='space-between'>
                                                                        <Grid item>
                                                                            <Avatar alt="List"
                                                                                src={job.postedCompany && job.postedCompany.logoUploadPath ? job.postedCompany.logoUploadPath : defaultJobIcon}
                                                                                className={classes.jobListingPhoto}
                                                                                imgProps={{ style: { objectFit: 'contain', border: 0 } }}
                                                                            />
                                                                        </Grid>
                                                                        <Grid item style={{}}>
                                                                            {job.skills_match < 0.3
                                                                                ?
                                                                                <Typography className={classes.tagStyle} style={{ backgroundColor: tagColor.orange, }}>
                                                                                    Add Skills
                                                                                </Typography>
                                                                                : job.skills_match < 0.7
                                                                                    ?
                                                                                    <Typography className={classes.tagStyle} style={{ backgroundColor: tagColor.green, }}>
                                                                                        Recommended
                                                                                    </Typography>
                                                                                    : job.skills_match < 1
                                                                                        ?
                                                                                        <Typography className={classes.tagStyle} style={{ backgroundColor: tagColor.blue, }}>
                                                                                            Apply Now
                                                                                        </Typography>
                                                                                        : ''
                                                                            }
                                                                        </Grid>
                                                                    </Grid>
                                                                    <Grid container justify='space-between' style={{ height: '14vh', paddingRight: 10 }}>
                                                                        <Grid item xs={12}>
                                                                            <Typography gutterBottom className={classes.jobTitle} style={{}}>
                                                                                {job.title}
                                                                            </Typography>
                                                                            <Typography gutterBottom className={classes.jobText}>
                                                                                {job.postedCompany ? job.postedCompany.name : job.hiringCompany ? job.hiringCompany.name : 'Unknown Company'}
                                                                            </Typography>
                                                                        </Grid>
                                                                        <Grid item xs={12} style={{ textAlign: 'right', alignSelf: 'flex-end' }}>
                                                                            <Button color='primary' style={{ fontSize: 12, fontWeight: 'bold' }} size='small'

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
                                </div>
                                :
                                <div style={{ textAlign: 'left', marginTop: '2%', paddingBottom: '7%', }}>
                                    <Typography className={classes.sectionHeading}>
                                        Oops...
                                    </Typography>
                                    <Typography style={{ fontWeight: 'bold' }}>
                                        No Job Recommendations Available.
                                    </Typography>
                                </div>
                            }
                            <div style={{ textAlign: 'right', marginTop: 10 }}>
                                <Button
                                    size="small"
                                    style={{ color: '#30A0D8', fontWeight: 'bold', fontSize: 18 }}
                                    href='/jobs'
                                >
                                    Search a Job
                                </Button>
                            </div>
                        </div>
                        <div className={classes.sectionArea}>
                            {recommendedEvents
                                ?
                                <div>
                                    <Typography className={classes.sectionHeading}>
                                        From Events
                                    </Typography>
                                    {token
                                        ?
                                        <div style={{ textAlign: 'right', marginBottom: '1%' }}>
                                            <Typography variant='caption' gutterBottom>
                                                Recommended Topic
                                            </Typography>
                                            <Typography variant='body1' style={{ color: '#024966', fontWeight: 'bold' }}>
                                                Grow Your Career
                                            </Typography>
                                        </div>
                                        : ''
                                    }

                                    {/* {recommendedEvents.map((event, index) => ( */}
                                    <Card className={classes.eventListing}>
                                        <CardContent style={{ flex: '1 0 auto', height: '100%', textAlign: 'left' }}>
                                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                <Typography variant='h6' style={{ fontWeight: 'bold' }} >
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
                                    <Divider />
                                    <Card className={classes.eventListing}>
                                        <CardContent style={{ flex: '1 0 auto', height: '100%', textAlign: 'left' }}>
                                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                <Typography variant='h6' style={{ fontWeight: 'bold' }} >
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

                                    <Card className={classes.eventListing}>
                                        <CardContent style={{ flex: '1 0 auto', height: '100%', textAlign: 'left' }}>
                                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                <Typography variant='h6' style={{ fontWeight: 'bold' }} >
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


                                    {/* ))} */}

                                </div>
                                :
                                <div style={{ textAlign: 'left', marginTop: '2%', paddingBottom: '7%', }}>
                                    <Typography className={classes.sectionHeading}>
                                        Oops...
                                    </Typography>
                                    <Typography style={{ fontWeight: 'bold' }}>
                                        No Events Available.
                                    </Typography>
                                </div>
                            }
                            <div style={{ textAlign: 'right', marginTop: 15, marginbottom: '10%', }}>
                                <Button
                                    size="small"
                                    style={{ color: '#30A0D8', fontWeight: 'bold', fontSize: 18, marginTop: 10 }}
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
export default DailyDigest;

