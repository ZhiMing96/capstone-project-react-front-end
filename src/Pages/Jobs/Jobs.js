import React, { useState, useEffect, Fragment, useRef } from 'react'
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import { Grid, Button, CssBaseline, IconButton, Paper, Typography, Divider, Box, InputBase, Container, ButtonBase, Snackbar, SnackbarContent, Avatar, Fab, Hidden, Slide, AppBar, Toolbar } from '@material-ui/core';
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
import './index.css';
import JobFilterSideBar from './JobFilterSideBar';
import JobsCarouselSkeletonLoading from '../../Components/SkeletonLoading/JobsCarouselSkeletonLoading';
import JobListingsSkeletonLoading from '../../Components/SkeletonLoading/JobListingsSkeletonLoading';
import { useSnackbar } from 'notistack';
import ClearIcon from '@material-ui/icons/Clear'
import SortIcon from '@material-ui/icons/Sort';

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
    }]

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
    dialogTitle: {
        marginTop: '5%',
        marginLeft: '8%',
        fontWeight: 600,
    },
    textField: {
        marginLeft:'10%',
        marginRight:'10%',
        width:'100%'
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
    segmentArea : {
        marginBottom:'-5%'
    },
    margin : {
        textAlign:'center',
        marginTop: '37%',
    }
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
                style={{display: "block",zIndex:40, marginRight:'5%',backgroundColor:'black', opacity:'0.6'}}
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
        const { className, onClick, style, currentSlide} = props;
        
        if(currentSlide !==0){
        return (
          <div 
            className={className}
            style={{ ...style, display: "block",zIndex:40,content:'none'}}
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


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});



function Jobs (props) {
    console.log("ENTERED JOB SEARCH COMPONENT"); 
    // let location = useLocation();
    //     console.log("PRINTING FROM USELOCATION METHOD")
    //     console.log(location)

    console.log(props)
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
    const [openFilter, setOpenFilter] = useState(false); 
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
    const [loadingResults, setLoadingResults] = useState(false);
    const [loadingHome, setLoadingHome] = useState(false);
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
    const [jobTitles, setJobTitles] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const action = key => (
        <Fragment>
            <IconButton onClick={() => { closeSnackbar(key) }} size="small" style={{ color:'white' }}>
                <ClearIcon/>
            </IconButton>
        </Fragment>
    );

    const handlePopoverOpen = event => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };
    
    const openDetails = Boolean(anchorEl);

    useEffect(()=>{
        setLoadingHome(true);
        if(token !== null ){
            api.dailyDigest.get()
            .then(res=>{
                const results = res.data;
                if(results.response_code === 200){
                    console.log("> Displaying Daily Digest Information From Job Component")
                    console.log(results);
                    setSkillsJobs(results.recommended_jobs_skills);
                    setSearchHistoryJobs(results.recommended_jobs_search);
                } else {

                }
            }).catch( err  => {
                const status = err.response.status
                const statusText = err.response.statusText
                console.log(status);
                console.log(statusText);
                enqueueSnackbar(`Error ${status}: ${statusText}`,  { variant: "error", action } );
            });
        }
        console.log('*** Getting Public Daily Digest NOW')
        api.dailyDigest.getPublic()
        .then(res=>{
            const results = res.data
            console.log(res.data)
            console.log('>> Displaying Popular Jobs From DAILY DIGEST getPublic() Method')
            setPopularJobs(results.recommended_jobs);
            setLoadingHome(false);
        }).catch(err => {
            if(err.response) {
                const status = err.response.status
                const statusText = err.response.statusText
                console.log(status);
                console.log(statusText);
                enqueueSnackbar(`Error ${status}: ${statusText}`,  { variant: "error", action } );
              }
        });

        console.log("Printing URL PARAMS")
        console.log(urlParams);
        console.log("Printing Pathname from javascript")
        console.log( window.location.pathname);

        if(window.location.pathname !== "/jobs") {
            if(searchResults.length !== 0) {

            } else if (urlParams !== undefined && urlParams !== '') {

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
            
        }  else { //(window.location.pathname === "/jobs")
            setBypass(false)
            setSearchResults([])
        }
    },[props])

    useEffect(()=>{
        console.log("ENTERED USE EFFECT FOR SORTING")
        console.log(searchResults);
        // //get current page lisitngs
        const indexOfLastPost = currentPage * postsPerPage;
        const indexOfFirstPost = indexOfLastPost - postsPerPage;
        const currentPosts = searchResults.slice(indexOfFirstPost, indexOfLastPost);
    },[])


    function getSearchResults(queryString){
        console.log("<<<<<<<< Entered GET SEARCH RESULTS")
        console.log(queryString)
        setLoadingResults(true);
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
                    enqueueSnackbar("No Listings Available!",  { variant: "", action } );
                    // openSnackbar();
                } else if (result !==undefined && result.length!==0){ //Good to go 
                    // const sortedResults = result.sort(compareValues('skills_match', 'desc')) //DEFAULT SORTING
                    // setSearchResults(sortedResults);
                    const sortedResults = result.sort(compareValues('minimum', 'desc')) //DEFAULT SORTING
                    setSearchResults(sortedResults);
                    // setSearchHistoryJobs(result);
                    // setSkillsJobs(result);
                }
                // submitFilter('skills_match', 'desc');
                setLoadingResults(false);
                
            })
            .catch(err=>{
                const status = err.response.status
                const statusText = err.response.statusText
                console.log(status);
                console.log(statusText);
                enqueueSnackbar(`Error ${status}: ${statusText}`,  { variant: "error", action } );
                setLoadingResults(false);
            })
        } else {
            console.log("NO TOKEN");
            
            api.searchJobs.get(queryString)
            .then(res=>{  
                const result = res.data.results;
                console.log("RESULTS FROM GET  REQUEST  = ")
                // console.log(result)
                if(result!== undefined && result.length===0){ //empty  results 
                    console.log('Entered Zero Length Method');
                    setSearchResults(result);
                    enqueueSnackbar("No Listings Available!",  { variant: "", action } );
                    // openSnackbar();
                } else if (result !==undefined && result.length!==0){ //Good to go 
                    const sortedResults = result.sort(compareValues('minimum', 'desc')) //DEFAULT SORTING
                    setSearchResults(sortedResults);
                }
                setLoadingResults(false);
            }).catch(err=>{
                const status = err.response.status
                const statusText = err.response.statusText
                console.log(status);
                console.log(statusText);
                enqueueSnackbar(`Error ${status}: ${statusText}`,  { variant: "error", action } );
                setLoadingResults(false);
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
        console.log(event.target)
        // setLoadingResults(true);
        console.log("Entered Handle Submit")
        setCurrentPage(1);

        console.log(token)
        
        event.preventDefault();
        var tempString = ""
        
        tempString += state.keyword !== "" ? ('keyword=' + state.keyword) :'';
        tempString += state.employmentType !== ""  ? ('&employment_type=' + state.employmentType ) :'';
        tempString += state.minSalary  ? ('&salary=' + state.minSalary) :'';
        tempString += (`&limit=${searchLimit}`)

        console.log("Query String = " + tempString);
        setKeyword(state.keyword);
        setState({ ...state, queryString: tempString });

        getSearchResults(tempString)
        
        //const query=url+tempString
        // //console.log(query);
        // handleRedirect();
        
    }

    searchResults ? console.log('searchResults.length = ' + searchResults.length) : console.log("No Results")
   

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
                    const url = jobUrlDefault + list.job_uuid
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

    const handleOpenFullScreenFilter = () => {
        setOpenFilter(true);
    }
    
      const handleCloseFullScreenFilter = () => {
        setOpenFilter(false);
      };
    

    const handleSidebarSubmit = (queryString) => {
        
        console.log("*** ENTERED HANDLE SIDEBAR SUBMIT IN JOBS COMPONENT")
        
        console.log("!!! QueryString = " + queryString)
        //getCurrentUrl and append then call API
        console.log(props.location)
        // const currentPath = props.location && props.location.pathname ?  props.location.pathname.slice(15) : ''
        
        console.log(state.queryString)
        var currentPath = state.queryString
        var currentPathArray = currentPath.split("&")
        currentPath = currentPathArray[0] + "&" + currentPathArray[1]



        console.log("!!! Current Path = " + currentPath)
        const newQuery = currentPath + queryString
        console.log("<<< newQuery = " + newQuery)
        getSearchResults(newQuery)
        setState({ ...state, queryString: newQuery });
    }

    const handleRedirect =() =>{
        props.history.push({pathname : `/jobs/listings/${state.queryString}`})
    }

    //console.log('Keyword Before Render = ');
    console.log('State Before Render =')
    console.log(state)
    console.log(jobTitles);


  return (
    <div>
        <CssBaseline/>
        <Grid container alignContent="flex-start" style={{background: `linear-gradient(#039be5,#43BDF8 )` , height:'40vh', padding:20, paddingTop:'5%'}}>
            <Grid item xs={12} >
                <Typography variant='h4' style={{color:'#FFFFFF', fontWeight:'lighter', paddingTop:15}}>
                    Search
                </Typography>
                    
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
                    {/* <DialogTitle  disableTypography  > */}
                        <Typography variant={"h5"} className={classes.dialogTitle}>
                            Refine Your Search
                        </Typography>
                    {/* </DialogTitle> */}
                    <DialogContent >
                        <form className={classes.container} noValidate autoComplete="off">
                            <TextField
                                id="standard-number"
                                
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
            <Hidden smUp>
                <Grid item xs={12} >
                    <Fab
                    variant="extended"
                    size="small"
                    color="white"
                    aria-label="add"
                    className={classes.margin}
                    onClick={()=> handleOpenFullScreenFilter()}
                    >
                        <SortIcon className={classes.extendedIcon} />
                        More Filters
                    </Fab>
                </Grid>
            </Hidden>
        </Grid>
        
        
        <div>
        { loadingResults || searchResults  && searchResults.length !== 0
        ? 
        <div>
            <Grid container>
                <Hidden xsDown>
                    <Grid item xs={3} style={{height:'fit-content', position:'sticky', top:'10%', overflowY:'auto', maxHeight:'80vh'}}>
                        <JobFilterSideBar handleSidebarSubmit={handleSidebarSubmit}/>
                    </Grid>
                    <Grid item xs={9}>
                        <Router>
                            <Redirect push to={`/jobs/listings/${state.queryString}`}/>
                            
                            <Route 
                            path="/jobs/listings" 
                            render={()=> (
                                <div>
                                    {  loadingResults 
                                        ? 
                                        <JobListingsSkeletonLoading/>
                                        : 
                                        <div>
                                            <JobListings searchResults={currentPosts} keyword={keyword} submitFilter={submitFilter} handleSidebarSubmit={handleSidebarSubmit}/>

                                            <Pagination currentPage={currentPage} postsPerPage={postsPerPage} totalPosts={searchResults.length} paginate={paginate}/> 
                                        </div>
                                    }
                                </div> 
                            )}
                            /> 
                            
                        </Router>
                    </Grid>
                </Hidden>
                <Hidden smUp> {/* Show in xs and Hide from Sm onwards */}
                <Grid item xs={12}>
                    <Router>
                        <Redirect push to={`/jobs/listings/${state.queryString}`}/>
                        
                        <Route 
                        path="/jobs/listings" 
                        render={()=> (
                            <div>
                                {  loadingResults 
                                    ? 
                                    <JobListingsSkeletonLoading/>
                                    : 
                                    <div>
                                        <JobListings searchResults={currentPosts} keyword={keyword} submitFilter={submitFilter} handleSidebarSubmit={handleSidebarSubmit}/>

                                        <Pagination currentPage={currentPage} postsPerPage={postsPerPage} totalPosts={searchResults.length} paginate={paginate}/> 
                                    </div>
                                }
                                
                            </div> 
                        )}
                        /> 
                    </Router>
                    <Dialog fullScreen open={openFilter} onClose={handleCloseFullScreenFilter} TransitionComponent={Transition}>
                        <AppBar className={classes.appBar}>
                            <Toolbar>
                                <IconButton edge="start" color="inherit" onClick={()=> handleCloseFullScreenFilter()} aria-label="close">
                                    <CloseIcon />
                                </IconButton>
                            </Toolbar>
                        </AppBar>
                        <div style={{height:'fit-content', position:'fixed', top:'10%', overflowY:'auto', maxHeight:'90%'}}>
                            <JobFilterSideBar handleSidebarSubmit={handleSidebarSubmit}/>
                        </div>
                    </Dialog>
                </Grid>
                </Hidden>
            </Grid>
            
        </div>
        : token && byPass==false
        ? //USER WITH ACCOUNT           
        <Grid container>
            <Grid item container xs={12}> 
                <Grid item xs={12} className={classes.segmentArea} >
                
                {loadingHome
                ? 
                <div>
                    <Typography variant='h5' className={classes.sectionHeading}>
                        You Might Be Interested <span className={classes.sectionCaption}> Based on your search hisory</span>
                    </Typography>
                    <JobsCarouselSkeletonLoading/>
                </div>
                
                :
                searchHistoryJobs.length!=0
                ?
                <div>
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
                </Grid>
                <Grid item xs={12} className={classes.segmentArea}>
                    
                {loadingHome
                ?
                <div>
                    <Typography variant='h5' className={classes.sectionHeading}>
                        Suitable For You <span className={classes.sectionCaption}> Based on your skills</span>
                    </Typography>
                    <JobsCarouselSkeletonLoading/>
                </div> 
                
                :
                skillsJobs.length !== 0
                ? 
                <div>
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
                </Grid>
                
                <Grid item xs={12} className={classes.segmentArea}>
                <Typography variant='h5' className={classes.sectionHeading}>
                    Popular <span className={classes.sectionCaption}> Trending</span>
                </Typography>
                
                {loadingHome
                ? <JobsCarouselSkeletonLoading/>
                :popularJobs.length !== 0
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
                </Grid>
            {/* <div> */}
            <Grid item xs={12} className={classes.segmentArea}>
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
            </Grid>
            <Grid item xs={12} className={classes.segmentArea}>
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
            {/* </div> */}
            </Grid>
        </Grid>
        
        
        
        </Grid>
        : token==null  && byPass==false 
        ?//USER WITHOUT ACCOUNT 
        <Grid container>
            <Grid item container xs={12} className={classes.segmentArea}> 
                <Typography variant='h5' style={{textAlign:"justify", marginLeft:30, color:'#024966e', fontWeight:'bold', marginTop:20}}>
                Popular Jobs
                </Typography>
                {loadingHome
                ? <JobsCarouselSkeletonLoading/>
                :
                popularJobs.length !== 0
                ? 
                <Grid item xs={12}>
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
                </Grid>
                : 
                <Grid item xs={12} style={{textAlign:'center', marginLeft:'3%',}}>
                    <Typography style={{fontWeight:'lighter', color:''}}>
                        <span style={{fontSize:30, color:'#4B4343',fontWeight:'light',marginRight:'1%'}}>Oops...</span>Seems like you're new here, Start Searching To Activate This Section!
                    </Typography>
                    <Typography style={{fontWeight:'bold'}}>
                        
                    </Typography>
                </Grid>
                }
                <Grid item xs={12} style={{ backgroundColor:'white', marginLeft:5}}>
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
                                SIGN UP NOW.
                            </Typography>
                        </Grid>
                    </Grid>
                    
                </Grid>
                
            </Grid>
        </Grid>
        :''
        }
        </div>
    </div>
    
  )
}

export default Jobs;


 /*
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

    const closeSnackbarOld = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const handleExited = () => {
        processQueue();
    }; */

    {/* <Snackbar
            key={messageInfo ? messageInfo.key : undefined}
            anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
            }}
            style={{boxShadow: "none"}}
            open={open}
            autoHideDuration={5000}
            onClose={closeSnackbarOld}
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
                onClick={closeSnackbarOld}
            >
                <CloseIcon />
            </IconButton>
            ]}
        />  */}