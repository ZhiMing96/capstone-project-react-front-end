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

  const defaultIcon ="https://cdn.cleverism.com/wp-content/themes/cleverism/assets/img/src/logo-placeholder.png";

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
        marginTop:10, 
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
  }));

    const Wrapper = styled.div`
        width:100%
    `;

    const Page = styled.div`
        width:90%
    `;

  const carouselSettings = {
    accessibiliy: true,
    speed:1700,
    slidesToShow: 4,
    slidesToScroll: 4,
    infinite:true,
    dots:true,
    autoplay: true,
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



function Jobs (props) {
    console.log("ENTERED JOB SEARCH COMPONENT"); 
    var urlParams=''
    if(props.match !== undefined){
        console.log(props.match.params.queryString);
        urlParams = props.match.params.queryString;
    } 
   

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
    const [byPass, setBypass] = useState(false);
    const [keyword, setKeyword] = useState('');
    

    useEffect(()=>{
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

    //For LOading Popular jOBS
    useEffect(() => {
        console.log('Entered New Use Effect Method')
        axios.get('https://api.mycareersfuture.sg/popular-job-titles')
        .then((res)=>{
            console.log(res.data)
            const popularTitles = res.data
            
            const title = popularTitles[0].icmsJobTitle
            // axios.get(`https://api.mycareersfuture.sg/v2/jobs?search=${title}&limit=10`)
            axios.get(`https://api.mycareersfuture.sg/v2/jobs?search=Banking&limit=10`)
                .then((res) => {
                    console.log(res.data)
                    const listings= res.data.results;
                    setPopularJobs({listings})
                })
        });
    },[])

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


    const handleHrefClick = listing => {
        window.open(listing.metadata.jobDetailsUrl,'_blank');
    }

    //console.log('Keyword Before Render = ');
    console.log('State Before Render =')
    console.log(state)



  return (
    
    <div>
        {/* <Container> */}
        <CssBaseline/>
        <Grid container alignContent="flex-start" style={{backgroundColor:'#039be5', height:'25vh', padding:20}}>
            <Grid item xs={12} >
                <Typography variant='h4' style={{color:'#FFFFFF', fontWeight:'lighter', paddingTop:10}}>
                    Never Miss Another Opportunity
                </Typography>
            </Grid>
            <Grid item xs={12} >
            <form onSubmit={handleSubmit}>
                <Paper elevation={1} style={{margin:50, marginTop:40,marginBottom:20,borderRadius: 25, zIndex:20,}}>
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
            ? <CircularLoading/>
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
        : token==null  && byPass==false 
        ?//USER WITHOUT ACCOUNT 
        <div>
            {popularJobs.length !== 0
            ? 
            <div>
                <Typography variant='h5' style={{textAlign:"justify", marginLeft:30, color:'#024966e', fontWeight:'bold', marginTop:20}}>
                Popular Jobs
                </Typography>
                <Grid container style={{height:'35vh', margin:10, marginTop:10}} spacing={1} justify="space-between" >
                <Wrapper style={{textAlign:'-webkit-center'}}>
                    <Slider {...carouselSettings}>
                        { popularJobs.listings.map((listing) => (
                            // listing.postedCompany.logoUploadPath!==null
                            //     ?
                                <Page>
                                    <Paper style={{width:'90%', height:'30vh', textAlign: 'start', padding:15, marginBottom:5}} elevation={0}>
                                    <Avatar alt="List"
                                    src={ 
                                        listing.postedCompany && listing.postedCompany.logoUploadPath 
                                        ? listing.postedCompany.logoUploadPath  
                                        : defaultIcon
                                    } 
                                    style={{width:90, height:90, boxShadow:'0px 1px 5px 0px rgba(0,0,0,0.2)'}} 
                                    imgProps={{style:{objectFit:'contain',border:0}}}
                                    onClick={()=> handleHrefClick(listing)}
                                    />
                                    <Grid container  justify='space-between' style={{height:'15vh'}}>
                                        <Grid item xs={12}>
                                        <Typography gutterBottom className={classes.carouselJobTitile} style={{}}>
                                            {listing.title}
                                        </Typography>
                                        <Typography style={{fontWeight:'light', fontSize:10}}>
                                            { listing.postedCompany 
                                                ? listing.postedCompany.name
                                                : ""
                                            }}
                                        </Typography>
                                        </Grid>
                                        <Grid item xs={12} style={{textAlign:'right', alignSelf:'flex-end'}}>
                                            <Button color='primary' style={{fontSize:12,fontWeight:'bold'}} size='small'
                                            onClick={()=>handleHrefClick(listing)}
                                            >
                                                Details
                                            </Button>
                                        </Grid>
                                    </Grid>
                                    
                                    </Paper>
                                </Page>
                                // : ''
                                
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
    
  )
}

export default Jobs;