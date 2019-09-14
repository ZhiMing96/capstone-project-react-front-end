
import React, { Component } from 'react';
import { emphasize, makeStyles, useTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import { Container } from '@material-ui/core';
import { flexbox } from '@material-ui/system';
import Box from '@material-ui/core/Box';

const employmentTypes = [
    {
      value: 'permanent',
      label: 'Permanent'
    },
    {
      value: 'fullTime',
      label: 'Full-Time'
    },
    {
      value: 'partTime',
      label: 'Part-Time'
    },
    {
      value: 'contract',
      label: 'Contract'
    },
    {
      value: 'flexiWork',
      label: 'Flexi-Work'
    },
    {
      value: 'temporary',
      label: 'Temporary'
    }
    
  ]
  const useStyles = makeStyles(theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    paper: {
      marginTop: theme.spacing(2),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    textField: {
      marginLeft: theme.spacing(1),
      // marginRight: theme.spacing(1),
    },
    dense: {
      marginTop: theme.spacing(2),
    },
    menu: {
      width: 200,
    },
    button: {
      margin: theme.spacing(1),
    },
    input: {
      display: 'none',
    },
  }));

  function JobsView (props) {

    const classes = useStyles();


    return(
      <Container component="main" maxWidth="xs">
      <CssBaseline />
        <div className={classes.paper}>
        
            <h2> Jobs </h2>
            <form onSubmit={props.handleSubmit}>
            <div>
            <Box>
                <TextField
                  maxWidth 
                  id="outlined-full-width"
                  label="Search Jobs"
                  type="search"
                  margin="normal"
                  variant="outlined"
                  name="searchValue"
                  required="true"
                  // fullWidth
                  onChange={(event) => props.handleOnChange(event)}/>
              </Box>

              
                <TextField
                  id="employmentType"
                  select
                  label="Select"
                  required= "true"
                  value={props.state.employmentType}
                  name='employmentType'
                  onChange={(event) => props.handleOnChange(event)}
                  SelectProps={{
                      MenuProps: {
                      // className: classes.menu,
                      },
                  }}
                  helperText="Please Select Your Employment Type"
                  margin="normal"
                  variant="outlined">
                  {employmentTypes.map(option => (
                      <MenuItem key={option.value} value={option.value}>
                      {option.label}
                      </MenuItem>
                  ))}
                  </TextField>
              

                <TextField
                  id="outlined-number"
                  label="Minimum Salary"
                  value={props.state.minSalary}
                  name="minSalary"
                  onChange={(event)=> props.handleOnChange(event)}
                  type="number"
                  // className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  margin="normal"
                  variant="outlined"
                  required="true"
                  />
                {/* <p>{props.state.minSalary}</p> */}
            </div>
            <Button type="submit" onSubmit={props.handleSubmit} variant="contained" color="secondary" className={classes.button}>
              Submit
            </Button>
            </form>
      
        </div>
      </Container>
    )

  }

  export default JobsView;
  




