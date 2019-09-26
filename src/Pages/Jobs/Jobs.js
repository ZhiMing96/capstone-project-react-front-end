import React, { useState, useEffect, Fragment } from 'react'
import { BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import { Grid, Button, CssBaseline, IconButton, Paper, Typography } from '@material-ui/core';
import { Search as SearchIcon } from '@material-ui/icons';

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
        width: 400,
        flexGrow: 1,
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
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
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
    });

    const classes=useState();

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

    const resetSearch = () =>{
        setSearchResults([]);
        console.log( "Search Results should be Empty Now")
        console.log(searchResults);
    }
    

    const handleSubmit = event => {
        console.log("Entered Handle Submit")
        // IMPT DONT DELETE!! THIS  IS FOR INTEGRATION WITH EXPRESS 
        // const url = `localhost:3000/jobs/search?keyword=${state.keyword ? state.keyword : ""}${state.minSalary!=null? `&minSalary=${state.minSalary}`: ""}${state.employmentType ? `&employmentType=${state.employmentType}` : ""}`
        // console.log(url);
        event.preventDefault();
        const url = `https://api.mycareersfuture.sg/v2/jobs?search=${state.keyword}${state.employmentType ? `&employmentTypes=${state.employmentType}` : ""}${state.minSalary!=null? `&salary=${state.minSalary}`: ""}&limit=7&page=0&sortBy=new_posting_date`

        console.log(url)

        axios.get(url)
        .then(res=>{   
            const result = res.data.results;
            console.log(result);
            setSearchResults(result);
            setState({...state, proceed:true})
        })
        .catch(err=>{
            console.error(err);
        })
    }

    useEffect(()=>{
        console.log("ENTERED USE EFFECT")
        if(state.proceed === true){
            setState({
                ...state, proceed: false
            })
        }
    },[])

    console.log('searchResults =')
    console.log(searchResults)

  return (
    
    <div>
        <CssBaseline/>
        <Grid container xs={12} alignItems="flex-start" alignContent="flex-start">
            <Grid item xs={12} >
            <form onSubmit={handleSubmit}>
                <Grid container justify="center" xs={12} >
                    <Grid item sm={7} xs={12} style={{ marginLeft:10, marginRight:10 }}>
                        <TextField
                        label="Required"
                        style={{ marginTop: 40}}
                        placeholder="Enter Keyword"
                        fullWidth
                        variant="outlined"
                        InputLabelProps={{
                        shrink: true,}}
                        value={state.keyword}
                        onChange={handleChange('keyword')}
                        required
                        >
                        </TextField>
                    </Grid>
                    <Grid item sm={4} xs={12}  alignItems="baseline" alignContent="flex-start"> 
                        {/* <Grid container item xs={12} spacing={2}> */}
                            {/* <Grid item sm={7} xs={12} alignItems="flex-start" alignContent="flex-start"> */}
                                <Button variant="outlined" onClick={handleClickOpen} style={{marginRight:30, marginTop:40}} size="medium">
                                    Filters
                                </Button>
                            {/* </Grid> */}
                            
                                <IconButton style={{marginLeft:30, marginTop:40,marginRight:30 }} type="submit">
                                    <SearchIcon fontSize="large"/>
                                </IconButton>
                            {/* </Grid> */}
                        {/* </Grid> */}
                    </Grid>
                    {/* <Grid item xs={1}>
                        
                    </Grid> */}
                </Grid>
                
                
            
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
            
            {/* <Redirect to="/jobs/jobListings"/>
           
            <Route 
                exact
                path="/jobs/jobListings"  
                render={()=>( )} 
            />    */}

            <JobListings listings={searchResults} resetSearch={resetSearch} />  
            
        </div> 
        :           
        <div>
            <Grid container spacing={2} justify="center">
                <Grid item>
                    <Paper>
                        <Typography>
                            In Demand Jobs
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item>
                    <Paper>
                        <Typography>
                            Popular Jobs
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
        </div>
        }  
    </div>
    
  )
}

export default Jobs;