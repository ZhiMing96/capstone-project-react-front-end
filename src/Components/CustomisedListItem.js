
import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles'; import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import { Grid, Typography, Box } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DateFnsUtils from '@date-io/date-fns';
import { connect } from "react-redux";
import { editWork, removeWork } from '../redux/actions/work'
import api from '../api'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import {
    DatePicker,
    TimePicker,
    DateTimePicker,
    MuiPickersUtilsProvider,
} from "@material-ui/pickers";



const useStyles = makeStyles(theme => ({
    item: {
        paddingRight: theme.spacing(8),
        ['@media (min-width:920px)']:{
            paddingRight: theme.spacing(10)
        },
    },
    submit: {
        margin: theme.spacing(5, 2, 2, 0),
        width: '100px'
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 280,
    },
    description:{
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 280,
        ['@media (min-width:920px)']:{
            width: 710,
        },
    },
}));

function CustomisedListItem(props) {
    const classes = useStyles();
    const [editState, setEditState] = React.useState(false)
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const startArr = props.item.start_date.split("-")
    const startDate = months[startArr[1] - 1] + " " + startArr[0]
    var endArr
    var endDate
    if(props.item.end_date){ //not null, not current job
        endArr = props.item.end_date.split("-")
        endDate = months[endArr[1] - 1] + " " + endArr[0]
    } else{
        endDate = 'Present'
    }

    const [selectedStartDate, handleStartDateChange] = React.useState(null);
    const [selectedEndDate, handleEndDateChange] = React.useState(null);
    const [submitState, setSubmit] = React.useState(false);
    const[dateValid, setDateValid] = React.useState(false);
    
    const[checkedState, setCheckedState] = React.useState(false);

  


    const [state, setState] = React.useState({
        record_id: '',
        job_title: '',
        company_name: '',
        start_date: '',
        end_date: '',
        description: ''

    });

    console.log(props.item)
    const handleChange = name => (event) => {
        console.log(event)

        if(name==='checkbox'){
            setCheckedState(event.target.checked)
            setDateValid(true)
            setState({
                ...state,
                end_date: null //present job
            })
        }else if (name==='start_date'){

            var date = new Date(event)
            setState({
                ...state,
                start_date: date.getFullYear().toString() + '-' + (date.getMonth()+1).toString()+ '-' + '1'
            })
            checkDateValid(date,'start')

        } else if (name === 'end_date') {
            var date = new Date(event)
            setState({
                ...state,
                end_date: date.getFullYear().toString() + '-' + (date.getMonth()+1).toString()+ '-' + '1'
            })
            checkDateValid(date,'end')

        } else {
            setState({ ...state, [name]: event.target.value });
        }


        //maybe check date valid?

    }
    const checkDateValid = (date, string) =>{
        if(checkedState){
            setDateValid(true)
        } else if(string === 'start'){

            var startDate = new Date(date)
            var endDate = new Date(state.end_date)
            setDateValid(startDate.getTime() <= endDate.getTime())
        }else{
            var endDate = new Date(date)
            var startDate = new Date(state.start_date)
            setDateValid(startDate.getTime() <= endDate.getTime())
        }
        console.log(startDate, endDate, dateValid)

    }

    const handleSubmit = (event) => {
        setSubmit(true) //render email validation error if present
        event.preventDefault()
        if (dateValid) {
            api.work.update(state)
                .then(res => {
                    if (res.data.response_code === 200) {
                        console.log('success')
                        props.handleSnackBarVariant('success')
                        props.handleSnackBarMessage('Work experience updated successfully.')
                        props.editWork(state) //update store
                        setEditState(false)
                        setState({
                            record_id: '',
                            job_title: '',
                            company_name: '',
                            start_date: '',
                            end_date: '',
                            description: ''
                        })
                    } else {
                        console.log('error')
                        props.handleSnackBarVariant('error')
                        props.handleSnackBarMessage('Error updating work experience.')
                    }
                }).catch(console.log('error'))
        }
    }


    const handleEdit = () => {
        if (editState === false) {
            setEditState(true)
            setState({
                record_id: props.item.record_id,
                job_title: props.item.job_title,
                company_name: props.item.company_name,
                start_date: props.item.start_date,
                end_date: props.item.end_date,
                description: props.item.description
            })
            setDateValid(true)
        } else {
            setEditState(false)
            setState({
                record_id: '',
                job_title: '',
                company_name: '',
                start_date: '',
                end_date: '',
                description: ''
            })
            setDateValid(false)
        }


    }

    const handleDelete = () => {
        api.work.remove({record_id: props.item.record_id.toString()})
            .then(res => {
                if (res.data.response_code === 200) {
                    console.log('success')
                    props.handleSnackBarVariant('success')
                    props.handleSnackBarMessage('Work experience deleted successfully.')
                    props.removeWork(props.item.record_id) //update store
                    return
                } else {
                    console.log('error')
                    props.handleSnackBarVariant('error')
                    props.handleSnackBarMessage('Error deleting work experience.')
                }
            }).catch(console.log('error'))
    }


    if (editState) {
        return (
            <div>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container style={{ width: '100%', textAlign: 'left' }}>
                    <Grid item xs={12} md={12}>
                            <FormControlLabel
                                control={
                                <Checkbox
                                    checked={checkedState}
                                    onChange={handleChange('checkbox')}
                                    color="primary"
                                />
                                }
                                label="Current Job"
                            />
                            </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                variant="outlined"
                                required
                                value={state.job_title}
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
                                value={state.company_name}

                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <DatePicker
                                    views={["year", "month"]}
                                    className={classes.textField}
                                    value={new Date(state.start_date)}
                                    disableFuture
                                    required
                                    inputVariant="outlined"
                                    label="Start Date"
                                    onChange={(date) => { handleStartDateChange(date); handleChange('start_date')(date) }}
                                    margin="normal"
                                />
                            </MuiPickersUtilsProvider>
                        </Grid>
                        {checkedState? null:

                        <Grid item xs={12} md={6}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <DatePicker
                                    views={["year", "month"]}
                                    className={classes.textField}
                                    value={new Date(state.end_date)}
                                    disableFuture
                                    required
                                    inputVariant="outlined"
                                    label="End Date"
                                    onChange={(date) => { handleEndDateChange(date); handleChange('end_date')(date) }}
                                    margin="normal"
                                />
                            </MuiPickersUtilsProvider>
                        </Grid>
                                }

                        {!dateValid && submitState? 
                                <Typography variant="caption" style={{color: "red"}} className = {classes.error}>
                                    Start Date cannot be after End Date!
                                </Typography> 
                        :null}


                        <Grid item xs={12} md={12}>
                            <TextField
                                variant="outlined"
                                label="Description"
                                className={classes.description}
                
                                multiline
                                rows="4"
                                margin="normal"
                                onChange={handleChange('description')}
                                value={state.description}
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
                            onClick={handleEdit}
                        >
                            Cancel
                            </Button>
                    </Grid>
                </form>
                {props.isLastItem ? null :
                    < Divider component="li" />}
            </div>
        )
    } else {
        return (
            <div>
                <ListItem alignItems="flex-start" key={props.item.record_id} className={classes.item} >
                    <ListItemText
                        primary={
                            <Typography
                                component="div"
                                variant="h6"
                                style={{ fontWeight: 'bold', lineHeight: 'inherit' }}
                                className={classes.inline}
                                color="textPrimary"
                                gutterBottom

                            >
                                {props.item.job_title}
                            </Typography>
                        }

                        secondary={
                            <React.Fragment>
                                <Typography
                                    component="div"
                                    variant="subtitle1"
                                    
                                    color="textPrimary"
                                    gutterBottom
                                    style={{ lineHeight: 'inherit' }}
                                >
                                    {props.item.company_name} | {startDate} to {endDate}
                                </Typography>
                                <Grid container wrap="nowrap">
                                <Typography
                                    component="div"
                                    variant="body2"
                                    
                                    color="textSecondary"
                                    style={{display:'flex', flexWrap:'wrap'}}
                                >
                                    {props.item.description}
                                </Typography>
                                </Grid>
                            </React.Fragment>
                        }
                    />

                    <ListItemSecondaryAction >
                        <Grid container direction='column' justify='flex-start' alignItems='flex-end'>
                            <IconButton edge="end" aria-label="edit" onClick={handleEdit}>
                                <EditIcon />
                            </IconButton>
                            <IconButton edge="end" aria-label="delete" onClick={handleDelete}>
                                <DeleteIcon />
                            </IconButton>

                        </Grid>
                    </ListItemSecondaryAction>
                </ListItem>
                {props.isLastItem ? null :
                    < Divider component="li" />}

        </div>
        )
    }
}

export default connect(null,
    { editWork, removeWork }
)(CustomisedListItem);