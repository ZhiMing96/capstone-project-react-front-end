import React, { useState, useEffect, Fragment } from 'react'
import { BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import { Grid, Button, CssBaseline, IconButton, Paper, Typography, Divider, Box, InputBase, Container, ButtonBase } from '@material-ui/core';
import { Search as SearchIcon, Directions as DirectionsIcon, FilterList as FilterListIcon } from '@material-ui/icons';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios'
import JobListings from './JobListings';

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
      value: 'Flexi Work',
      label: 'Flexi-Work'
    },
    {
      value: 'Temporary',
      label: 'Temporary'
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
  }));

function Jobs () {
    console.log("ENTERED JOB SEARCH COMPONENT");
    const [searchResults,setSearchResults] = useState([]);
    const [state, setState] = useState({
        open: false,
        minSalary: null,
        keyword: "",
        employmentType:"",
        skills:[],
        proceed: false,
        queryString: "",
    });

    const url = "http://localhost:3000/jobs/search?" 

    const token= window.localStorage.getItem('authToken');

    const classes=useStyles();

    const handleChange = name => event => {
        setState({ ...state, [name]: (event.target.value) });
        console.log('state = ')
        console.log(state)

        console.log('searchResults =')
        console.log(searchResults)
    };
    
    const handleClickOpen = () => {
        setState({ ...state, open: true });
    };
    
    const handleClose = () => {
        setState({ ...state, open: false });
    };

    const handleSubmit = event => {
        console.log("Entered Handle Submit")
        
        event.preventDefault();
        var tempString = state.queryString;
        
        tempString += state.keyword ? ('search=' + state.keyword) :'';
        tempString += state.employmentType ? ('&employmentTypes=' + state.employmentType ) :'';
        tempString += state.minSalary ? ('&salary=' + state.salary) :'';

        console.log("Query String = " + tempString);
        setState({ ...state, queryString: tempString });
        
        const query=url+tempString
        console.log(query);
        
        axios.get(query, {headers: {"Authorization" : "Token"+token}})
        .then(res=>{   
            const result = res.data.results;
            setSearchResults(result);
            console.log(result);
        })
        .catch(err=>{
            console.error(err);  
        })
    }

    useEffect(()=>{
       
    },[])

    console.log('searchResults.length = ' + searchResults.length);

    console.log("queryString= "+ state.queryString)
    

  return (
    
    <div>
        <Container>
        <CssBaseline/>
        <Grid container xs={12} alignContent="flex-start">
            <Grid item xs={12} >
            <form onSubmit={handleSubmit}>
                <Paper className={classes.root} elevation={1}>
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
                </Paper>
                
                <Dialog
                    disableBackdropClick disableEscapeKeyDown 
                    open={state.open}
                    onClose={handleClose}
                    fullWidth
                >
                    <DialogTitle>{"Refine Your Search!"}</DialogTitle>
                    <DialogContent>
                        
                            <TextField
                                id="standard-number"
                                fullWidth
                                label="Enter Min Salary"
                                value={state.minSalary}
                                onChange={handleChange('minSalary')}
                                type="number"
                                className={classes.textField}
                                margin="normal"
                                
                            /> <br/>
                            <TextField
                                select
                                label="Select Employment Type"
                                className={classes.textField}
                                value={state.employmentType}
                                onChange={handleChange('employmentType')}
                                SelectProps={{
                                MenuProps: {
                                    className: classes.menu,
                                },
                                }}
                                margin="normal"
                                fullWidth	
                            >
                                {employmentTypes.map(option => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
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

        {searchResults.length != 0 
        ? 
        <div>
            <Router>
                <Redirect to={`/jobs/listings/${state.queryString}`}/>
                
                <Route path="/jobs/listings" render={()=> <JobListings searchResults={searchResults}/>}/> 
                
            </Router>
        </div>
        :
        token 
        ? //USER WITH ACCOUNT           
        <div>
            What Others Are Searching
            Because you viewed "" 
            you might have missed
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
    </Container> 
    </div>
    
  )
}

export default Jobs;