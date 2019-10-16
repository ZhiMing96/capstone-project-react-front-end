import React, { useState, useEffect, Fragment, useRef } from 'react'
import { BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import { Grid, Button, CssBaseline, IconButton, Paper, Typography, Divider, Box, InputBase, Container, ButtonBase, Snackbar, SnackbarContent, Avatar } from '@material-ui/core';
import { Search as SearchIcon, Directions as DirectionsIcon, FilterList as FilterListIcon, Class } from '@material-ui/icons';
import Pagination from './Pagination';
import LinearLoading from  '../../Components/LoadingBars/LinearLoading';
import CircularLoading from '../../Components/LoadingBars/CircularLoading';

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
  }));

    const Wrapper = styled.div`
        width:100%
    `;

    const Page = styled.div`
        width:90%
    `;

  const carouselSettings = {
    accessibiliy: true,
    speed:1500,
    slidesToShow: 3,
    slidesToScroll: 3,
    infinite:true,
    dots:true,
    //autoplay: true,
    //arrows:true,
    autoplaySpeed:8000,
    draggable:true,
    // lazyLoad: "progressive",
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

function getPopularJobs(){
    
}

function Jobs (props) {
    console.log("ENTERED JOB SEARCH COMPONENT"); 
    const searchLimit = 100;
    const token= window.localStorage.getItem('authToken');
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
    const [popularJobs, setPopularJobs] = useState('');
    

    useEffect(()=>{
        // console.log('Entered Use Effect for Search Results')
        setSearchResults(props.searchResults)
    },[props])

    useEffect(()=>{
        console.log("ENTERED USE EFFECT FOR SORTING")
        console.log(searchResults);
        // //get current page lisitngs
        const indexOfLastPost = currentPage * postsPerPage;
        const indexOfFirstPost = indexOfLastPost - postsPerPage;
        const currentPosts = searchResults.slice(indexOfFirstPost, indexOfLastPost);
    })

    //For LOading Popular jOBS
    useEffect(() => {
        console.log('Entered New Use Effect Method')
        axios.get('https://api.mycareersfuture.sg/popular-job-titles')
        .then((res)=>{
            console.log(res.data)
            const popularTitles = res.data
            
            const title = popularTitles[0].icmsJobTitle
            axios.get(`https://api.mycareersfuture.sg/v2/jobs?search=${title}&limit=10`)
                .then((res) => {
                    console.log(res.data)
                    const listings= res.data.results;
                    setPopularJobs({listings})
                })
        });
    },[])

    

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
        setState({ ...state, queryString: tempString });
        
        //const query=url+tempString
        //console.log(query);
        setLoading(true);
        if(token !== null) {
            console.log("GOT TOKEN");
            //axios.get(query, {headers: {"Authorization" : "Token "+token}})
            api.searchJobsAcct.get(tempString)
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
            api.searchJobs.get(tempString)
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


    console.log('PopularJobs = ');
    console.log(popularJobs);

  return (
    
    <div>
        <Container>
        <CssBaseline/>
        <Grid container alignContent="flex-start">
            <Grid item xs={12} >
            <form onSubmit={handleSubmit}>
                <Paper className={classes.root} elevation={1} style={{margin:50, marginTop:40,marginBottom:20,borderRadius: 25}}>
                    {/* <Box border={2} borderColor="#9F0D6E" className={classes.root} style={{margin:0, padding:0, paddingInlineStart:5}}> */}
                    <Box className={classes.root} style={{margin:3, padding:0, paddingInlineStart:5}}>
                        <InputBase
                            className={classes.input}
                            placeholder="Search For a Job"
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
        <Grid style={{marginLeft:50, marginRight:55}}>
            { loading 
            ? <LinearLoading/>
            : <span></span>
            }
        </Grid>
        
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
                        <JobListings searchResults={currentPosts} loading={loading} keyword={state.keyword} submitFilter={submitFilter}/>
                        <Pagination currentPage={currentPage} postsPerPage={postsPerPage} totalPosts={searchResults.length} paginate={paginate}/> 
                    </div> 
                }
                /> 
                
            </Router>
        </div>
        : 
        token
        ? //USER WITH ACCOUNT           
        <div>
            <Grid container style={{height:'50vh', margin:30}} spacing={1} justify="space-between" >
                <Grid item xs={12} sm={4} style={{}}>
                    <Paper style={{width:'80%', height:'100%', textAlign: '-webkit-center', padding:15, borderRadius:15}}>
                    <Avatar alt="Remy Sharp" src="" style={{width:110, height:110}}/>
                    <Typography style={{marginTop:30, fontWeight:'lighter', fontSize:23}}>
                        Optimised Search
                    </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={4} style={{}}>
                    <Paper style={{width:'80%', height:'100%', textAlign: '-webkit-center', padding:15, borderRadius:15}}>
                    <Avatar alt="Remy Sharp" src="" style={{width:110, height:110}}/>
                    <Typography style={{marginTop:30, fontWeight:'lighter', fontSize:23}}>
                        Career Guidance
                    </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={4} style={{}}>
                    <Paper style={{width:'80%', height:'100%', textAlign: '-webkit-center', padding:15, borderRadius:15}}>
                    <Avatar alt="Remy Sharp" src="" style={{width:110, height:110}}/>
                    <Typography style={{marginTop:30, fontWeight:'lighter', fontSize:23}}>
                        Expand Network
                    </Typography>
                    </Paper>
                </Grid>
            </Grid>
            <Grid container style={{}}>
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
            </Grid>
            
            <Container>
            <Grid container style={{}}>
                <Grid item xs={12}>
                    <Typography>
                        <Box fontSize={40} m={1}>
                        Career<strong> Daily Digest</strong> 
                        </Box>
                    </Typography>
                </Grid>
            </Grid>
            </Container>
            
        </div>
        : //USER WITHOUT ACCOUNT 
        <div>
            {popularJobs.length !== 0
            ? 
            <div>
                <Typography variant='h6' style={{textAlign:"justify", marginLeft:30}}>
                Popular Jobs
                </Typography>
                <Grid container style={{height:'50vh', margin:30, marginTop:10}} spacing={1} justify="space-between" >
                <Wrapper style={{textAlign:'-webkit-center'}}>
                    <Slider {...carouselSettings}>
                        { popularJobs.listings.map((listing) => (
                            listing.postedCompany.logoUploadPath!==null
                                ?
                                <Page>
                                    <Paper style={{width:'80%', height:'30vh', textAlign: '-webkit-center', padding:15, borderRadius:10}}>
                                    <Avatar alt="Remy Sharp" src={listing.postedCompany.logoUploadPath} style={{width:110, height:110,}} imgProps={{style:{objectFit:'contain'}}}/>
                                    <Typography style={{marginTop:30, fontWeight:'lighter', fontSize:23}}>
                                        {listing.title}
                                    </Typography>
                                    </Paper>
                                </Page>
                                : ''
                                
                        ))

                        }
                    
                    </Slider>
                </Wrapper>
                </Grid>
            </div>
            : ""
            }

            <Grid container style={{}}>
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
            </Grid>
            
            <Container>
            <Grid container style={{}}>
            <Grid item xs={12}>
                <Typography>
                    <Box fontSize={40} m={1}>
                    Career<strong> Daily Digest</strong> 
                    </Box>
                </Typography>
                </Grid>

                </Grid>
            </Container>
        </div>
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
    </Container> 
    </div>
    
  )
}

export default Jobs;