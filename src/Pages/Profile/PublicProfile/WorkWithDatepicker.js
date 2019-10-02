import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Box } from '@material-ui/core'
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import SnackBar from '../../../Components/Snackbar'
import api from '../../../api'
import AddIcon from '@material-ui/icons/Add';
import List from '@material-ui/core/List';
import { CustomisedListItem } from '../../../Components/CustomisedListItem';
import DateFnsUtils from '@date-io/date-fns';
import {
    DatePicker,
    TimePicker,
    DateTimePicker,
    MuiPickersUtilsProvider,
  } from "@material-ui/pickers";
  import { connect } from "react-redux";
  import { updateWork, addWork } from '../../../redux/actions/work'



const useStyles = makeStyles(theme => ({
    '@global': {
        body: {
            backgroundColor: theme.palette.common.white,
        },
    },
    paper: {
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(5),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 280,
    },
    button: {
        marginRight: theme.spacing(1),
        marginTop: theme.spacing(-0.5),
},
    leftIcon: {
    marginRight: theme.spacing(1),
},
submit: {
    margin: theme.spacing(5,2,0,0),
    width:'100px'
},
}));


function WorkWithDatepicker(props) {
    const classes = useStyles();
    const [addState, setAddState] = React.useState(false)
    const [selectedStartDate, handleStartDateChange] = React.useState(new Date());
    const [selectedEndDate, handleEndDateChange] = React.useState(new Date());
    const [snackBarMessage, setSnackBarMessage] = React.useState('')
    const [snackBarVariant, setSnackBarVariant] = React.useState('')
    const [newWork, setNewWork] = React.useState({
        job_title:'',
        company_name:'',
        start_date: '',
        end_date:'',
        description:''
    })
    const [submitState, setSubmit] = React.useState(false);

    //initialise
    useEffect(() => {
        console.log('useEffect')
        console.log(newWork)
        api.work.get().then(res => {
            props.updateWork(res.data.work_experience) //array of obj
        }).catch(err => {
            console.log('error initialising w user work experience')
        })
    }, props.works)

    const handleClose = () => {
        setSnackBarMessage('');
      };
    
    const handleClickAdd=()=>{
        const currentState = addState
        setAddState(!currentState)
    }

    const handleChange = name => (event) => {
        console.log(event)
        if (name==='start_date'){
            var date = new Date(event)
            setNewWork({
                ...newWork,
                start_date: date.getMonth() +' '+ date.getFullYear()
            })
        }else if( name==='end_date'){
            var date = new Date(event)
            setNewWork({
                ...newWork,
                end_date: date.getMonth() +' '+ date.getFullYear()
            })
        }else{
            setNewWork({ ...newWork, [name]: event.target.value });
        }
        
        
        //maybe check date valid?
        
    }
    const checkDateValid = () =>{
        var startDate = new Date(selectedStartDate)
        var endDate = new Date(selectedEndDate)
        return startDate.getTime() <= endDate.getTime()

    }

    const handleSubmit = (event) => {
        setSubmit(true) //render email validation error if present
        event.preventDefault()
        if (checkDateValid()) {
          api.work.add(newWork)
            .then(res => {
              if (res.data.response_code === 200) {
                console.log('success')
                setSnackBarVariant('success')
                setSnackBarMessage('Work experience added successfully.')
                props.addWork(newWork) //update store
                setAddState(false)
                setNewWork({
                    job_title:'',
                    company_name:'',
                    start_date: '',
                    end_date:'',
                    description:''
                })
              } else {
                console.log('error')
                setSnackBarVariant('error')
                setSnackBarMessage('Error adding work experience.')
              }
            }).catch(console.log('error'))
        }
      }

    return (
        <div>
            <CssBaseline />
            <div className={classes.paper}>

                <Grid container direction="row" style={{ width: '100%' }}>
                    <Grid item xs={12} md={12}>
                        <Typography component="div">
                            <Box display="flex"  alignItems="flex-start">
                                <Box
                                    fontSize="h6.fontSize"
                                    m={2}
                                    letterSpacing={2}
                                    textAlign='left'
                                    flexGrow={1}
                                    color="primary.main"
                                    fontWeight="fontWeightBold"
                                >
                                    WORK EXPERIENCE
                                </Box>
                                <Box m={2}>
                                    <Button variant="outlined" color="primary" className={classes.button} onClick={handleClickAdd}>
                                        <AddIcon className={classes.leftIcon} />
                                        Add
                                    </Button>
                                </Box>
                            </Box>
                        </Typography>
                    </Grid>

                    <Grid item style={{ marginLeft: '2.5%', marginRight: '2.5%' }}>
                    {addState?
                        <form className={classes.form} onSubmit={handleSubmit}>
                            <Grid container style={{ width:'100%', textAlign:'left'}}>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        
                                        label="Job Title"
                                        className={classes.textField}
                                        margin="normal"
                                        autoFocus
                                        onChange={handleChange('job_title')}

                                    />

                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        label="Company Name"
                                        className={classes.textField}
                                        margin="normal"
                                        onChange={handleChange('company_name')}

                                    />
                                </Grid>

                                <Grid item xs={12} md={6}>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <DatePicker 
                                    views={["year", "month"]}
                                    className={classes.textField}
                                    value ={selectedStartDate}
                                    disableFuture
                                    required
                                    inputVariant="outlined"
                                    label="Start Date"
                                    onChange={(date) => {handleStartDateChange(date); handleChange('start_date')(date)}}
                                    margin="normal"
                                />
                                    </MuiPickersUtilsProvider>
                                </Grid>

                                <Grid item xs={12} md={6}>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <DatePicker 
                                    views={["year", "month"]}
                                    className={classes.textField}
                                    value ={selectedEndDate}
                                    disableFuture
                                    required
                                    inputVariant="outlined"
                                    label="End Date"
                                    onChange={(date) =>{ handleEndDateChange(date);handleChange('end_date')(date) }}
                                    margin="normal"
                                />
                                </MuiPickersUtilsProvider>
                                </Grid>

                                <Grid item xs={12} md={12}>
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        label="Description"
                                        className={classes.textField}
                                        style ={{minHeight: '20px'}}
                                        margin="normal"
                                        onChange={handleChange('description')}

                                    />
                                </Grid>

                            </Grid>
                            <Grid container style={{ alignContent: 'center' }}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                style={{ alignSelf: 'center' }}
                            >
                                Save
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                style={{ alignSelf: 'center' }}
                                onClick={handleClickAdd}
                            >
                                Cancel
                            </Button>
                        </Grid>
                        </form> :null}


                        {props.works && props.works.length !== 0? 
                        <List className={classes.root}>
                            {props.works.map((experience,index) => {
                                return (
                                    <CustomisedListItem item={experience} isLastItem={props.works.length -1 === index}/>   
                                )
                            })}        
                        </List> : null}
                    </Grid>
                </Grid>
            </div>
            <SnackBar
                open={snackBarMessage !== ''}
                handleClose={handleClose}
                variant={snackBarVariant}
                message={snackBarMessage}
            />
        </div>

    )
}

const mapStateToProps = state => {
    return {
      works: state.work.work,
    }
  
};

export default connect(mapStateToProps,
    { updateWork, addWork }
  )(WorkWithDatepicker);

