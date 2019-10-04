import React, { useState, useEffect, Fragment, useRef } from 'react'
import { BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import { Grid, Button, CssBaseline, IconButton, Paper, Typography, Divider, Box, InputBase, Container, ButtonBase, Snackbar, SnackbarContent } from '@material-ui/core';
import { Search as SearchIcon, Directions as DirectionsIcon, FilterList as FilterListIcon, Class } from '@material-ui/icons';
import Pagination from './Pagination';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios'
import JobListings from './JobListings';
import CloseIcon from '@material-ui/icons/Close';

const employmentTypes = [
    {
      value: 'Permanent',
      label: 'Permanent'
    },
    {
      value: 'Full%20Time',
      label: 'Full-Time'
    },  
    {
      value: 'Part%20Time',
      label: 'Part-Time'
    },
    {
      value: 'Contract',
      label: 'Contract'
    },
    {
      value: 'Flexi%20Work',
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
        link: ""
      },
      {
        name: "Career Matching",
        imgUrl: "https://www.wsg.gov.sg/content/dam/ssg-wsg/ssgwsg/carousel/CareersConnectBannerBLUE2.png",
        link: ""
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

function compareValues(key, order='asc') {
    return function(a, b) {
        if(!a.hasOwnProperty(key) || 
            !b.hasOwnProperty(key)) {
            return 0; 
        }
        
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
        (order == 'desc') ? 
        (comparison * -1) : comparison
        );
    };
}

function Jobs (props) {
    console.log("ENTERED JOB SEARCH COMPONENT");
    const url = "http://localhost:3000/jobs/search?" 
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
    // const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);

       
    useEffect(()=>{
        console.log('Entered Use Effect for Current Page')
        console.log(currentPage)
    },[currentPage])

    // useEffect(()=>{
    //     console.log('Entered Use Effect for Search Results')
    //     setSearchResults(props.searchResults)
    // },[props])

    

    const handleChange = name => event => {
        setState({ ...state, [name]: (event.target.value) });
        console.log('state = ')
        console.log(state)

        // console.log('searchResults =')
        // console.log(searchResults)
    };
    
    const handleClickOpen = () => {
        setState({ ...state, open: true });
    };
    
    const handleClose = () => {
        setState({ ...state, open: false });
    };


    const handleSubmit = event => {
        console.log("Entered Handle Submit")
        console.log(token)
        
        event.preventDefault();
        var tempString = ""
        // && state.keyword != undefined
        tempString += state.keyword != "" ? ('keyword=' + state.keyword) :'';
        tempString += state.employmentType != ""  ? ('&employment_type=' + state.employmentType ) :'';
        tempString += state.minSalary  ? ('&salary=' + state.minSalary) :'';
        tempString += state.categories != "" ? ('&categories=' + state.categories) :'';
        tempString += (`&limit=${searchLimit}`)

        console.log("Query String = " + tempString);
        setState({ ...state, queryString: tempString });
        
        const query=url+tempString
        console.log(query);
        setLoading(true);
        axios.get(query, {headers: {"Authorization" : "Token "+token}})
        .then(res=>{  
            const result = res.data.results;
            console.log("RESULTS FROM GET  REQUEST  = ")
            console.log(result)
            if(result!= undefined && result.length==0){
                console.log('Entered Zero Length Method');
                setSearchResults(result);
                openSnackbar();
            } else if (result !=undefined && result.length!=0){
                setSearchResults(result);
            }

           
            //setSearchResults(sortedResults);
            // console.log("RESULTS FROM API CALL IN JOBS.JS: ")
            // console.log(result)
            // console.log("SORTTED ARRAY: ")
            // console.log(sortedResults);
            setLoading(false);
            
        })
        .catch(err=>{
            console.error(err);  
            setLoading(false);
        })
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
    console.log("page number = " + currentPage)

  return (
    
    <div>
        <Container>
        <CssBaseline/>
        <Grid container xs={12} alignContent="flex-start">
            <Grid item xs={12} >
            <form onSubmit={handleSubmit}>
                <Paper className={classes.root} elevation={0} style={{marginTop:20}}>
                    <Box border={2} borderColor="#9F0D6E" className={classes.root} style={{margin:0, padding:0, paddingInlineStart:5}}>
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

        { searchResults  && searchResults.length != 0 
        ? 
        <div>
            <Router>
                <Redirect to={`/jobs/listings/${state.queryString}`}/>
                
                <Route 
                path="/jobs/listings" 
                render={()=>
                    <div>
                        <JobListings searchResults={currentPosts} loading={loading}/>
                        <Pagination postsPerPage={postsPerPage} totalPosts={searchResults.length} paginate={paginate}/> 
                    </div> 
                }
                /> 
                
            </Router>
        </div>
        : 
        token
        ? //USER WITH ACCOUNT           
        <div>
            <div className={classes.root}>
                <img src={carouselImgs[0].imgUrl} className={classes.img} />
            </div>
            <Grid container spacing={3} style={{marginTop:20}}>
                <Grid item xs={12} sm={6}>
                    <Paper className={classes.root}>
                        <Typography variant="h4">
                            Based on your Seach History
                        </Typography>
                    </Paper>   
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Paper className={classes.root}>
                    </Paper>
                </Grid>
            </Grid>
        </div>
        : //USER WITHOUT ACCOUNT 
        <div> 
            <CssBaseline/>
            <br/>
            <Divider variant="middle" style={{marginBottom:10}}/>
            <Paper style={{marginBottom:10}}>
                <Typography>
                    Dont have an account yet? Sign Up Now!
                </Typography>
            </Paper>
            <Paper>
                <Typography>
                    Quick Search!
                </Typography>
                <ButtonBase>
                    
                </ButtonBase>
            </Paper>

            <Grid container spacing={2} justify="flex-start" style={{marginTop:10}}>
                <Grid item xs={6}>
                    <Paper>
                        <Typography>
                            In Demand Jobs
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper>
                        <Typography>
                            Popular Jobs
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
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
            <Button color="secondary" size="small" href="/profile/bookmarks">
                View
            </Button>,
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