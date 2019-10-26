import React, { useState, useEffect, Fragment, useRef } from 'react'
import { BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import { Grid, Button, CssBaseline, IconButton, Paper, Typography, Divider, Box, InputBase, Container, ButtonBase, Snackbar, SnackbarContent, Avatar, Fab } from '@material-ui/core';
import { Search as SearchIcon, Directions as DirectionsIcon, FilterList as FilterListIcon, Class } from '@material-ui/icons';
import Pagination from './Pagination';
import LinearLoading from  '../../Components/LoadingBars/LinearLoading';
import CircularLoading from '../../Components/LoadingBars/CircularLoading';
import jobImg from '../../images/job.svg'
import clsx from 'clsx';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios'
import JobListings from './JobListings';
import CloseIcon from '@material-ui/icons/Close';
import api from '../../api';
import FilterSelect from '../../Components/FilterSelect'
import styled from 'styled-components';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Popover from '@material-ui/core/Popover';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'
import './index.css'


const employmentTypes = [
    {
      value: 'Permanent',
      label: 'Permanent'
    },
    {
      value: 'Full Time',
      label: 'Full-Time'
    },  
    {
      value: 'Part Time',
      label: 'Part-Time'
    },
    {
      value: 'Contract',
      label: 'Contract'
    },
    {
      value: 'Flexi-work',
      label: 'Flexi-Work'
    },
    {
      value: 'Temporary',
      label: 'Temporary'
    }
    
  ]

  const carouselImgs = [
      {
        name: "Career Guidance",
        imgUrl: "https://www.wsg.gov.sg/content/dam/ssg-wsg/ssgwsg/carousel/Bear_Website.jpg",
        link: "https://www.wsg.gov.sg/adapt-and-grow/jobseekers.html?_ga=2.95037916.1789263985.1570243866-1439352794.1565188425"
      },
      {
        name: "Career Matching",
        imgUrl: "https://www.wsg.gov.sg/content/dam/ssg-wsg/ssgwsg/carousel/CareersConnectBannerBLUE2.png",
        link: "https://www.wsg.gov.sg/career-services.html?_ga=2.95037916.1789263985.1570243866-1439352794.1565188425"
      }
  ]

  

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
  }));

    const Wrapper = styled.div`
        width:97%
    `;

    const Page = styled.div`
        width:90%
    `;

    const CarouselArrowNext = (props) => {

        const { className, style, onClick } = props;
        console.log(style)
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
      }
      const CarouselArrowPrev = (props) => {
        const classes = useStyles();
        const { className, onClick, style } = props;
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
      }

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
    nextArrow: <CarouselArrowNext />,
    prevArrow: <CarouselArrowPrev />,
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

function compareValues(key, order='asc') {
    console.log('ENTERED COMPARE VALUES METHOD with key= '+ key)
    return function(c, d) {
        var a = c; 
        var b = d;

        switch(key){
            case 'minimum':
                a = c.salary
                b = d.salary
                break;
            case 'maximum':
                a = c.salary
                b = d.salary
                break;
            case 'newPostingDate' :
                a = c.metadata;
                b = d.metadata;
                break;
            case 'expiryDate' :
                a = c.schemes;
                b = d.schemes;
                break;
            case 'totalNumberOfView' :
                a = c.metadata;
                b = d.metadata;
                break;
        }
        
        
            if(a !== null && b !== null ){
            if(!a.hasOwnProperty(key) || 
            !b.hasOwnProperty(key)) {
                return 0; 
            }
            // console.log(a[key])

            const varA = (typeof a[key] === 'string') ?
            a[key].toUpperCase() : a[key];
            const varB = (typeof b[key] === 'string') ? 
            b[key].toUpperCase() : b[key];


            let comparison = 0;
            if (varA > varB) {
            comparison = 1;
            } else if (varA < varB) {
            comparison = -1;
            }
            return (
            (order === 'desc') ? 
            (comparison * -1) : comparison
            );
        }
    };
}

const jobUrlDefault ='https://www.mycareersfuture.sg/job/'
const defaultIcon ="https://cdn.cleverism.com/wp-content/themes/cleverism/assets/img/src/logo-placeholder.png";

function Jobs (props) {
    console.log("ENTERED JOB SEARCH COMPONENT"); 
    var urlParams=''
    if(props.match !== undefined){
        console.log(props.match.params.queryString);
        urlParams = props.match.params.queryString;
    } 
    console.log('PROPS FOR JOBS COMPONENT')
    console.log(props)
   

    const searchLimit = 100;
    const token= window.localStorage.getItem('authToken');
    console.log(token)
    const classes=useStyles();
    const queueRef = useRef([]);
    const [open, setOpen] = useState(false);   // for snackbar
    const [searchResults,setSearchResults] = useState([]);
    const [messageInfo, setMessageInfo] = useState(undefined);
    const [state, setState] = useState({
        open: false,
        minSalary: null,
        keyword: "",
        employmentType:"",
        categories: "",
        skills:[],
        proceed: false,
        queryString:"",
    });
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);
    const [sorted, setSorted] = useState(false);
    const [popularJobs, setPopularJobs] = useState([]);
    const [byPass, setBypass] = useState(false);
    const [keyword, setKeyword] = useState('');
    const tagColor = { 
        green: '#4CB593',
        blue: '#42A5F5',
        orange: '#FF7043'
    }
    const [searchHistoryJobs, setSearchHistoryJobs] = useState([]);
    const [skillsJobs, setSkillsJobs] = useState([]);
    const [viewAgain, setViewAgain] = useState([]);
    const [jobTitles, setJobTitles] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);

    const handlePopoverOpen = event => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };
    
    const openDetails = Boolean(anchorEl);

    useEffect(()=>{
        setLoading(true);
        if(token !== null ){
            api.dailyDigest.get()
            .then(res=>{
                const results = res.data;
                if(results.response_code === 200){
                    console.log(results);
                    setSkillsJobs(results.recommended_jobs_skills);
                    setSearchHistoryJobs(results.recommended_jobs_search);
                }
            }).catch(err=>console.log(err));
        }
        api.dailyDigest.getPublic()
        .then(res=>{
            const results = res.data
            console.log(res.data)
            console.log('ENTERED SAVING POPULAR JOBS METHOD')
            setPopularJobs(results.recommended_jobs);
            setLoading(false);
        }).catch(err=>console.log(err));

        if(urlParams === ''){
            setBypass(false)
            setSearchResults(props.searchResults)
        } else {
            const params = urlParams.split('&')
            const keywordString = params[0].split('=')
            const keywordUrl = keywordString[1];
            console.log('keyword = ' + keywordUrl)
            setKeyword(keywordUrl); 
            // setState({ ...state, keyword: 'Facebook'});
            setBypass(true)
            setState({ ...state, queryString: urlParams});
            getSearchResults(urlParams);
        
        }
    },[props])

    useEffect(()=>{
        console.log("ENTERED USE EFFECT FOR SORTING")
        console.log(searchResults);
        // //get current page lisitngs
        const indexOfLastPost = currentPage * postsPerPage;
        const indexOfFirstPost = indexOfLastPost - postsPerPage;
        const currentPosts = searchResults.slice(indexOfFirstPost, indexOfLastPost);
    })


    function getSearchResults(queryString){
        setLoading(true);
        if(token !== null) {
            console.log("GOT TOKEN");
            //axios.get(query, {headers: {"Authorization" : "Token "+token}})
            api.searchJobsAcct.get(queryString)
            .then(res=>{  
                const result = res.data.results;
                console.log("RESULTS FROM GET  REQUEST  = ")
                // console.log(result)
                if(result!== undefined && result.length===0){ //empty  results 
                    console.log('Entered Zero Length Method');
                    setSearchResults(result);
                    openSnackbar();
                } else if (result !==undefined && result.length!==0){ //Good to go 
                    // const sortedResults = result.sort(compareValues('skills_match', 'desc')) //DEFAULT SORTING
                    // setSearchResults(sortedResults);
                    const sortedResults = result.sort(compareValues('minimum', 'desc')) //DEFAULT SORTING
                    setSearchResults(sortedResults);
                    // setSearchHistoryJobs(result);
                    // setSkillsJobs(result);
                }
                // submitFilter('skills_match', 'desc');
                setLoading(false);
                
            })
            .catch(err=>{
                console.error(err);  
                setLoading(false);
            })
        } else {
            console.log("NO TOKEN");
            // axios.get(query)
            api.searchJobs.get(queryString)
            .then(res=>{  
                const result = res.data.results;
                console.log("RESULTS FROM GET  REQUEST  = ")
                // console.log(result)
                if(result!== undefined && result.length===0){ //empty  results 
                    console.log('Entered Zero Length Method');
                    setSearchResults(result);
                    openSnackbar();
                } else if (result !==undefined && result.length!==0){ //Good to go 
                    const sortedResults = result.sort(compareValues('minimum', 'desc')) //DEFAULT SORTING
                    setSearchResults(sortedResults);
                }
                setLoading(false);
            })
            .catch(err=>{
                console.error(err);  
                setLoading(false);
            })
        }
    }

    

    const handleChange = name => event => {
        setState({ ...state, [name]: (event.target.value) });
    };
    
    const handleClickOpen = () => {
        setState({ ...state, open: true });
    };
    
    const handleClose = () => {
        setState({ ...state, open: false });
    };

    const handleSubmit = event => {
        setLoading(true);
        console.log("Entered Handle Submit")
        setCurrentPage(1);

        console.log(token)
        
        event.preventDefault();
        var tempString = ""
        
        tempString += state.keyword !== "" ? ('keyword=' + state.keyword) :'';
        tempString += state.employmentType !== ""  ? ('&employment_type=' + state.employmentType ) :'';
        tempString += state.minSalary  ? ('&salary=' + state.minSalary) :'';
        tempString += state.categories !== "" ? ('&categories=' + state.categories) :'';
        tempString += (`&limit=${searchLimit}`)

        console.log("Query String = " + tempString);
        setKeyword(state.keyword);
        setState({ ...state, queryString: tempString });

        getSearchResults(tempString)
        
        //const query=url+tempString
        //console.log(query);
        
        
    }

    searchResults ? console.log('searchResults.length = ' + searchResults.length) : console.log("No Results")

    const processQueue = () => {
        if (queueRef.current.length > 0) {
            setMessageInfo(queueRef.current.shift());
           setOpen(true);
        }
    };

    const openSnackbar = () => {
        console.log("Entered Open SnackBar")

        const message = "No Listings Available!"
        queueRef.current.push({
            message,
            key: new Date().getTime(),  
        }); 
        if (open) {
            // immediately begin dismissing current message
            // to start showing new one
            setOpen(false);
        } else {
            processQueue();
        }
    };

    const closeSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const handleExited = () => {
        processQueue();
    };

    //get current page lisitngs
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = searchResults.slice(indexOfFirstPost, indexOfLastPost);

    //Change Page 
    const paginate = pageNumber => setCurrentPage(pageNumber);
    console.log("CURRENT PAGE NUMBER = " + currentPage)

    const submitFilter = (filter,order) => {
        //const sorted = searchResults.sort(compareValues(filter,order));
        setSearchResults(searchResults.sort(compareValues(filter,order)))
        console.log('passed setSearchResult method')
        setSorted(!sorted);
    }
        

    console.log("search results = ")
    console.log(searchResults)

    useEffect(()=>{
        console.log('SEARCH RESULTS HAS BEEN MODIFIED')
    },[searchResults])


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
                    const url = jobUrlDefault + list.job_uuidl
                    window.open(url,'_blank');
                }
            })
            .catch(error =>{
                console.log(error);
            })
        } else {
            console.log('NOT TRACKING CLICK')
            const url = jobUrlDefault + list.job_uuid
            window.open(url,'_blank');
        }
        
    }

    const handleViewSearchHistory = () => {
        setSearchResults(searchHistoryJobs);
    }
    const handleViewSkill = () => {
        setSearchResults(skillsJobs);
    }
    const handleViewViewAgain = () => {
        setSearchResults();
    }
    const handleViewPopular = () => {
        setSearchResults(popularJobs);
    }

    //console.log('Keyword Before Render = ');
    console.log('State Before Render =')
    console.log(state)
    console.log(jobTitles);


  return (
    
    <div>
        {/* <Container> */}
        <CssBaseline/>
        <Grid container alignContent="flex-start" style={{background: `linear-gradient(#039be5,#43BDF8 )` , height:'40vh', padding:20, paddingTop:'5%'}}>
            <Grid item xs={12} >
                <Typography variant='h4' style={{color:'#FFFFFF', fontWeight:'lighter', paddingTop:15}}>
                    Search
                </Typography>
                    {/*<img src={jobImg} style={{ width: '10%' }} />*/}
            </Grid>
            <Grid item xs={12} container justify="center">
                <Grid item xs={12} sm={10} md={8} style={{textAlign:'-webkit-center'}}>
                    <form onSubmit={handleSubmit}>
                <Paper elevation={1} style={{margin:50, marginTop:40,marginBottom:20,zIndex:20,maxWidth:'90vh'}}>
                    <Box className={classes.root} style={{margin:3, padding:0, paddingInlineStart:5}}>
                        <InputBase
                            className={classes.input}
                            placeholder="Type your keyword(s)..."
                            required
                            value={state.keyword}
                            onChange={handleChange('keyword')}
                        />
                        <Box display={{ xs: 'block', sm: 'none' }}>
                            <IconButton color="primary" className={classes.iconButton} onClick={handleClickOpen}>
                                <FilterListIcon />
                            </IconButton>
                        </Box>
                        <Box display={{ xs: 'none', sm: 'block' }}>
                            <Button color="primary" onClick={handleClickOpen} style={{marginRight:10}} size="medium">
                                    Filters
                            </Button>
                        </Box>
                        
                        <Divider className={classes.divider} orientation="vertical" />
                        <IconButton className={classes.iconButton} type="submit">
                            <SearchIcon />
                        </IconButton>
                    </Box>
                 </Paper>
                    
                
                <Dialog
                    // disableBackdropClick 
                    disableEscapeKeyDown 
                    open={state.open}
                    onClose={handleClose}
                    fullWidth
                    maxWidth="sm"
                >
                    <DialogTitle>{"Refine Your Search!"}</DialogTitle>
                    <DialogContent >
                        <form className={classes.container} noValidate autoComplete="off">
                            <TextField
                                id="standard-number"
                                style={{width: 'fit-content'}}
                                label="Enter Min Salary"
                                value={state.minSalary}
                                onChange={handleChange('minSalary')}
                                type="number"
                                className={classes.textField}
                                margin="dense"
                                
                            /> <br/>
                            <TextField
                                select
                                label="Employment Type"
                                className={classes.textField}
                                value={state.employmentType}
                                onChange={handleChange('employmentType')}
                                SelectProps={{
                                MenuProps: {
                                    className: classes.menu,
                                },
                                }}
                                margin="dense"
                                fullWidth
                            >
                                {employmentTypes.map(option => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Continue
                        </Button>
                    </DialogActions>
                </Dialog>    
                </form>   
                </Grid>
            </Grid>
           
        </Grid>
        
        { loading 
        ? <CircularLoading/>
        : 
        <div>
        
        { searchResults  && searchResults.length !== 0 
        ? 
        <div>
            <Router>
                <Redirect to={`/jobs/listings/${state.queryString}`}/>
                
                <Route 
                path="/jobs/listings" 
                render={()=>
                    <div>
                        {/* <FilterSelect submitFilter={submitFilter}/> */}
                        <JobListings searchResults={currentPosts} loading={loading} keyword={keyword} submitFilter={submitFilter}/>
                        <Pagination currentPage={currentPage} postsPerPage={postsPerPage} totalPosts={searchResults.length} paginate={paginate}/> 
                    </div> 
                }
                /> 
                
            </Router>
        </div>
        : 
        token && byPass==false
        ? //USER WITH ACCOUNT           
        <div>
            <div style={{}}>
            {searchHistoryJobs.length!=0
            ?

            <div style={{}}>
            <Typography variant='h5' className={classes.sectionHeading}>
                You Might Be Interested <span className={classes.sectionCaption}> Based on your search hisory</span>
            </Typography>
        
            <Grid container className={classes.sectionArea} spacing={0} justify="space-between" >
            <Wrapper>
                <Slider {...carouselSettings}>
                    { searchHistoryJobs.map((listing) => (
                        <Page>
                            <Paper className={classes.jobListingBox}>
                                <Grid container justify='space-between'>
                                    <Grid item>
                                        <Avatar alt="List"
                                            src={ 
                                                listing.company_logo 
                                                ? listing.company_logo   
                                                : defaultIcon
                                            } 
                                            style={{width:70, height:70, boxShadow:'0px 1px 5px 0px rgba(0,0,0,0.2)',margin:'2%'}} 
                                            imgProps={{style:{objectFit:'contain',border:0}}}
                                            onClick={()=> handleHrefClick(listing)}
                                        />
                                    </Grid>
                                    <Grid item style={{ }}>
                                    { listing.skills_match < 0.3
                                        ?
                                        <Typography className={classes.tagStyle} style={{backgroundColor:tagColor.orange,}}>
                                            Add Skills
                                        </Typography>
                                        : listing.skills_match < 0.7
                                        ?
                                        <Typography className={classes.tagStyle} style={{backgroundColor:tagColor.green,}}>
                                            Recommended
                                        </Typography>
                                        : listing.skills_match < 1
                                        ?
                                        <Typography className={classes.tagStyle} style={{backgroundColor:tagColor.blue,}}>
                                            Apply Now
                                        </Typography>
                                        :''
                                    }
                                    </Grid>
                                </Grid>
                            <Grid container  justify='space-between' style={{height:'15vh'}}>
                                <Grid item xs={12} style={{paddingRight:'6%'}}>
                                <Typography gutterBottom className={classes.carouselJobTitile} style={{}}>
                                    {listing.title}
                                </Typography>
                                <Typography style={{fontWeight:'light', fontSize:10}}>
                                    { listing.posted_company 
                                        ? listing.posted_company
                                        : ""
                                    }
                                </Typography>
                                </Grid>
                                <Grid item xs={12} style={{textAlign:'right', alignSelf:'flex-end',paddingRight:'5%'}}>
                                    <Button color='primary' style={{fontSize:12,fontWeight:'bold'}} size='small'
                                    onClick={()=>handleHrefClick(listing)}
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
            </Grid>
            </div>
            : 
            ''
            }
            {skillsJobs.length !== 0
            ? 
            <div style={{marginTop:'1%'}}>
            <Typography variant='h5' className={classes.sectionHeading}>
                Suitable For You <span className={classes.sectionCaption}> Based on your skills</span>
            </Typography>
            
                <Grid container className={classes.sectionArea} spacing={0} justify="space-between" >
                <Wrapper>
                    <Slider {...carouselSettings}>
                        { skillsJobs.map((listing) => (
                            <Page >
                                <Paper className={classes.jobListingBox}>
                                <Grid container justify='space-between'>
                                    <Grid item>
                                        <Avatar alt="List"
                                            src={ 
                                                listing.company_logo  
                                                ? listing.company_logo   
                                                : defaultIcon
                                            } 
                                            style={{width:70, height:70, boxShadow:'0px 1px 5px 0px rgba(0,0,0,0.2)',margin:'2%'}} 
                                            imgProps={{style:{objectFit:'contain',border:0}}}
                                            onClick={()=> handleHrefClick(listing)}
                                        />
                                    </Grid>
                                    <Grid item style={{ }}>
                                        { listing.skills_match < 0.3
                                            ?
                                            <Typography className={classes.tagStyle} style={{backgroundColor:tagColor.orange,}}>
                                                Add More Skills
                                            </Typography>
                                            : listing.skills_match < 0.7
                                            ?
                                            <Typography className={classes.tagStyle} style={{backgroundColor:tagColor.green,}}>
                                                Recommended
                                            </Typography>
                                            : listing.skills_match < 1
                                            ?
                                            <Typography className={classes.tagStyle} style={{backgroundColor:tagColor.blue,}}>
                                                Apply Now
                                            </Typography>
                                            :''
                                        }
                                    </Grid>
                                </Grid>
                                <Grid container  justify='space-between' style={{height:'15vh'}}>
                                    <Grid item xs={12} style={{paddingRight:'6%'}}>
                                    <Typography gutterBottom className={classes.carouselJobTitile} style={{}}>
                                        {listing.title}
                                    </Typography>
                                    <Typography style={{fontWeight:'light', fontSize:10}}>
                                        { listing.posted_company 
                                            ? listing.posted_company
                                            : ""
                                        }}
                                    </Typography>
                                    </Grid>
                                    <Grid item xs={12} style={{textAlign:'right', alignSelf:'flex-end',paddingRight:'5%'}}>
                                        <Button color='primary' style={{fontSize:12,fontWeight:'bold'}} size='small'
                                        onMouseEnter={handlePopoverOpen}
                                        onMouseLeave={handlePopoverClose}
                                        onClick={()=>handleHrefClick(listing)}
                                        >
                                            Details
                                        </Button>
                                    </Grid>
                                </Grid>
                                </Paper>
                                <Popover
                                    classes={{
                                    paper: classes.paper,
                                    }}
                                    open={open}
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                    }}
                                    transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                    }}
                                    onClose={handlePopoverClose}
                                    disableRestoreFocus
                                >
                                    <Typography>I use Popover.</Typography>
                                </Popover>
                            </Page>
                        ))}
                    </Slider>
                </Wrapper>
                </Grid>
                </div>
            :
            ''
            }
            <Typography variant='h5' className={classes.sectionHeading}>
                Popular <span className={classes.sectionCaption}> Trending</span>
            </Typography>
            {popularJobs.length !== 0
            ? 
            <div style={{marginTop:'1%'}}>
                <Grid container className={classes.sectionArea} spacing={0} justify="space-between" >
                <Wrapper>
                    <Slider {...carouselSettings}>
                        { popularJobs.map((listing) => (
                            <Page >
                                <Paper className={classes.jobListingBox}>
                                <Grid container justify='space-between'>
                                    <Grid item>
                                        <Avatar alt="List"
                                            src={ 
                                                listing.company_logo  
                                                ? listing.company_logo  
                                                : defaultIcon
                                            } 
                                            style={{width:70, height:70, boxShadow:'0px 1px 5px 0px rgba(0,0,0,0.2)',margin:'2%'}} 
                                            imgProps={{style:{objectFit:'contain',border:0}}}
                                            onClick={()=> handleHrefClick(listing)}
                                        />
                                    </Grid>
                                    <Grid item style={{ }}>
                                        { listing.skills_match < 0.3
                                            ?
                                            <Typography className={classes.tagStyle} style={{backgroundColor:tagColor.orange,}}>
                                                Add More Skills
                                            </Typography>
                                            : listing.skills_match < 0.7
                                            ?
                                            <Typography className={classes.tagStyle} style={{backgroundColor:tagColor.green,}}>
                                                Recommended
                                            </Typography>
                                            : listing.skills_match < 1
                                            ?
                                            <Typography className={classes.tagStyle} style={{backgroundColor:tagColor.blue,}}>
                                                Apply Now
                                            </Typography>
                                            :''
                                        }
                                    </Grid>
                                </Grid>
                                <Grid container  justify='space-between' style={{height:'15vh'}}>
                                    <Grid item xs={12} style={{paddingRight:'6%'}}>
                                    <Typography gutterBottom className={classes.carouselJobTitile} style={{}}>
                                        {listing.title}
                                    </Typography>
                                    <Typography style={{fontWeight:'light', fontSize:10}}>
                                        { listing.posted_company 
                                            ? listing.posted_company
                                            : ""
                                        }}
                                    </Typography>
                                    </Grid>
                                    <Grid item xs={12} style={{textAlign:'right', alignSelf:'flex-end', paddingRight:'5%'}}>
                                        <Button color='primary' style={{fontSize:12,fontWeight:'bold'}} size='small'
                                        onClick={()=>handleHrefClick(listing)}
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
                </Grid>
                </div>
            :
            <div style={{textAlign:'center', marginLeft:'3%',}}>
                <Typography style={{fontWeight:'lighter', color:''}}>
                    <span style={{fontSize:30, color:'#4B4343',fontWeight:'light',marginRight:'1%'}}>Oops...</span> There are no results at the moment 
                </Typography>
                <Typography style={{fontWeight:'bold'}}>
                    
                </Typography>
            </div>
            }
            </div>
            <div>
                {searchHistoryJobs.length===0
                ?
                <div>
                    <Typography variant='h5' className={classes.sectionHeading}>
                        You Might Be Interested <span className={classes.sectionCaption}> Based on your search hisory</span>
                    </Typography>
                    <div style={{textAlign:'center', marginLeft:'3%',}}>
                    
                    <Typography style={{fontWeight:'lighter', color:''}}>
                        <span style={{fontSize:30, color:'#4B4343',fontWeight:'light',marginRight:'1%'}}>Oops...</span>Seems like you're new here, Start Searching To Activate This Section!
                    </Typography>
                    </div>
                </div>
                : ''
                }
                {skillsJobs.length===0
                ?
                <div>
                    <Typography variant='h5' className={classes.sectionHeading}>
                        Suitable For You <span className={classes.sectionCaption}> Based on your skills</span>
                    </Typography>
                    <div style={{textAlign:'center', marginLeft:'3%',}}>
                    <Typography style={{fontWeight:'lighter', color:''}} href='/profile/skills'>
                        <span style={{fontSize:30, color:'#4B4343',fontWeight:'light',marginRight:'1%'}}>Oops...</span>Seems like you're new here, Start <span >Adding Skills</span> to Activate This Section! 
                    </Typography>
                    <Typography style={{fontWeight:'bold'}}>
                        
                    </Typography>
                    </div>
                </div>
                :''
                }
            </div>
            {/* <Grid container style={{}}>
                <Grid item xs={12}>
                    <Typography>
                        <Box fontSize={40} m={0}>
                        Career<strong> Guidance</strong> 
                        </Box>
                    </Typography>
                </Grid>
                <div className={classes.root}>
                    <a href={carouselImgs[0].link} target="_blank">
                        <img src={carouselImgs[0].imgUrl} className={classes.img} alt=""/>
                    </a>
                </div>
                <div className={classes.root}>
                    <a href={carouselImgs[1].link} target="_blank">
                        <img src={carouselImgs[1].imgUrl} className={classes.img} alt=""/>
                    </a>
                </div>
            </Grid> */}
            
        </div>
        : token==null  && byPass==false 
        ?//USER WITHOUT ACCOUNT 
        <div>
            <Typography variant='h5' style={{textAlign:"justify", marginLeft:30, color:'#024966e', fontWeight:'bold', marginTop:20}}>
            Popular Jobs
            </Typography>
            {popularJobs.length !== 0
            ? 
            <div style={{}}>
                <Grid container style={{height:'35vh', margin:10, marginTop:10}} spacing={1} justify="space-between" >
                <Wrapper>
                    <Slider {...carouselSettings}>
                        { popularJobs.map((listing) => (
                            <Page>
                                <Paper style={{width:'90%',textAlign: 'start', padding:15, marginBottom:5}} elevation={0}>
                                <Avatar alt="List"
                                src={ 
                                    listing.company_logo  
                                    ? listing.company_logo   
                                    : defaultIcon
                                } 
                                style={{width:70, height:70, boxShadow:'0px 1px 5px 0px rgba(0,0,0,0.2)'}} 
                                imgProps={{style:{objectFit:'contain',border:0}}}
                                onClick={()=> handleHrefClick(listing)}
                                />
                                <Grid container  justify='space-between' style={{height:'15vh'}}>
                                    <Grid item xs={12}>
                                    <Typography gutterBottom className={classes.carouselJobTitile} style={{}}>
                                        {listing.title}
                                    </Typography>
                                    <Typography style={{fontWeight:'light', fontSize:10}}>
                                        { listing.posted_company 
                                            ? listing.posted_company
                                            : ""
                                        }}
                                    </Typography>
                                    </Grid>
                                    <Grid item xs={12} style={{textAlign:'right', alignSelf:'flex-end',paddingRight:'5%'}}>
                                        <Button color='primary' style={{fontSize:12,fontWeight:'bold'}} size='small'
                                        onClick={()=>handleHrefClick(listing)}
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
                </Grid>
            </div>
            : 
            <div style={{textAlign:'center', marginLeft:'3%',}}>
                <Typography style={{fontWeight:'lighter', color:''}}>
                    <span style={{fontSize:30, color:'#4B4343',fontWeight:'light',marginRight:'1%'}}>Oops...</span>Seems like you're new here, Start Searching To Activate This Section!
                </Typography>
                <Typography style={{fontWeight:'bold'}}>
                    
                </Typography>
            </div>
            }
            <div style={{ backgroundColor:'white'}}>
                <Grid Container style={{padding:'10%', paddingLeft:'8%'}}>
                    <Grid item xs={12} sm style={{marginBottom:'1%'}} >
                        <Typography variant='subtitle1' color='primary' style={{fontSize:18, fontWeight:'Bold', textAlign:'left', marginBottom:'3%'}}>
                            Be A Member Today
                        </Typography>
                        <Typography gutterBottom style={{fontSize:38, fontWeight:'lighter', textAlign:'left'}}>
                            Bookmarks <span style={{fontSize:25,textAlign:'left'}}> Save a Job Listing and View Later </span>
                        </Typography>
                        <Typography gutterBottom style={{fontSize:38, fontWeight:'lighter', textAlign:'center'}}>
                            Browse Again <span style={{fontSize:25,}}> Never lose track of your favourite searches </span>
                        </Typography>
                        <Typography style={{fontSize:38, fontWeight:'lighter', textAlign:'left'}}>
                            Smart Search <span style={{fontSize:25,}}> we recommend Jobs that you like </span>
                        </Typography>
                        <Typography>
                        </Typography>
                       
                    </Grid>
                    <Grid item xs={12} sm style={{marginTop:'4%'}}>
                        <Typography  style={{fontSize:50, fontWeight:'bold',textAlign:'right',}}>
                            SIGN UP HERE.
                        </Typography>
                    </Grid>
                </Grid>
                
            </div>

            {/* <Grid container style={{}}>
                <Grid item xs={12}>
                    <Typography>
                        <Box fontSize={40} m={0}>
                        Career<strong> Guidance</strong> 
                        </Box>
                    </Typography>
                </Grid>
                <div className={classes.root}>
                    <a href={carouselImgs[0].link} target="_blank">
                        <img src={carouselImgs[0].imgUrl} className={classes.img} alt=""/>
                    </a>
                </div>
                <div className={classes.root}>
                    <a href={carouselImgs[1].link} target="_blank">
                        <img src={carouselImgs[1].imgUrl} className={classes.img} alt=""/>
                    </a>
                </div>
            </Grid> */}
        </div>
        :''
        }
        <Snackbar
            key={messageInfo ? messageInfo.key : undefined}
            anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
            }}
            style={{boxShadow: "none"}}
            open={open}
            autoHideDuration={5000}
            onClose={closeSnackbar}
            onExited={handleExited}
            ContentProps={{
            'aria-describedby': 'message-id',
            }}
            message={<span style={{boxShadow:"none"}} id="message-id">{messageInfo ? messageInfo.message : undefined}</span>}
            action={[
            <IconButton
                key="close"
                aria-label="close"
                color="inherit"
                className={classes.close}
                onClick={closeSnackbar}
            >
                <CloseIcon />
            </IconButton>
            ]}
        /> 
    {/* </Container>  */}
            </div>
        }
    </div>
    
  )
}

export default Jobs;