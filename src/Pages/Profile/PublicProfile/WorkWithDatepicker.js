import React, { useEffect, useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Box, Snackbar, IconButton } from '@material-ui/core'
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import api from '../../../api'
import AddIcon from '@material-ui/icons/Add';
import List from '@material-ui/core/List';
import CustomisedListItem from '../../../Components/CustomisedListItem';
import DateFnsUtils from '@date-io/date-fns';
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { connect } from "react-redux";
import { updateWork, addWork } from '../../../redux/actions/work'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CloseIcon from '@material-ui/icons/Close';
import { storeUndo, executeUndo } from '../../../redux/actions/undo'


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
        margin: theme.spacing(5, 2, 0, 0),
        width: '100px'
    },
    description: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 280,
        ['@media (min-width:920px)']: {
            width: 710,
        },
    },
}));


function WorkWithDatepicker(props) {
    const classes = useStyles();
    const [addState, setAddState] = React.useState(false)
    const [selectedStartDate, handleStartDateChange] = React.useState(null);
    const [selectedEndDate, handleEndDateChange] = React.useState(null);
    const [newWork, setNewWork] = React.useState({
        job_title: '',
        company_name: '',
        start_date: '',
        end_date: '',
        description: ''
    })
    const [submitState, setSubmit] = React.useState(false);
    const [dateValid, setDateValid] = React.useState(false);
    const [checkedState, setCheckedState] = React.useState(false);

    //initialise
    useEffect(() => {
        if (props.undoName === 'work' && props.undoExecute === true) {
            api.work.add(props.undoObj)
                .then(res => {
                    if (res.data.response_code === 200) {
                        console.log('success')
                        api.work.get().then(res => {
                            props.updateWork(res.data.work_experience) //array of obj
                        })
                    }
                })
            props.storeUndo({
                name: '',
                obj: {},
            })
            props.executeUndo(false)
        } else {


            console.log('useEffect')
            console.log(newWork)
            api.work.get().then(res => {
                props.updateWork(res.data.work_experience) //array of obj
            }).catch(err => {
                console.log('error initialising w user work experience')
            })
        }
    }, [props.undoExecute]);


    const setSnackbar = (message, undoButton=false) => {
        props.setSnackbar(message, undoButton)
    }


    const handleClickAdd = () => {
        const currentState = addState
        if (addState === true) {
            handleStartDateChange(null)
            handleEndDateChange(null)
            setNewWork({
                job_title: '',
                company_name: '',
                start_date: '',
                end_date: '',
                description: ''
            })
        }
        setAddState(!currentState)

    }

    const handleChange = name => (event) => {
        console.log(event)
        if (name === 'checkbox') {
            setCheckedState(event.target.checked)
            setDateValid(true)
            setNewWork({
                ...newWork,
                end_date: null //present job
            })
        } else if (name === 'start_date') {
            console.log(selectedStartDate)
            var date = new Date(event)
            setNewWork({
                ...newWork,
                start_date: date.getFullYear().toString() + '-' + (date.getMonth() + 1).toString() + '-' + '1'
            })
            checkDateValid(date, 'start')
        } else if (name === 'end_date') {
            var date = new Date(event)
            setNewWork({
                ...newWork,
                end_date: date.getFullYear().toString() + '-' + (date.getMonth() + 1).toString() + '-' + '1'
            })
            checkDateValid(date, 'end')
        } else {
            setNewWork({ ...newWork, [name]: event.target.value });
        }


        //maybe check date valid?

    }
    const checkDateValid = (date, string) => {
        if (checkedState) {
            setDateValid(true)
        } else if (string === 'start') {
            var startDate = new Date(date)
            var endDate = new Date(newWork.end_date)
            setDateValid(startDate.getTime() <= endDate.getTime())
        } else {
            var endDate = new Date(date)
            var startDate = new Date(newWork.start_date)
            setDateValid(startDate.getTime() <= endDate.getTime())
        }
        console.log(startDate, endDate, dateValid)

    }

    const handleSubmit = (event) => {
        setSubmit(true) //render email validation error if present
        event.preventDefault()
        if (dateValid) {
            api.work.add(newWork)
                .then(res => {
                    if (res.data.response_code === 200) {
                        console.log('success')
                        setSnackbar('Work experience added successfully.')
                        api.work.get().then(res => {
                            props.updateWork(res.data.work_experience) //array of obj
                        })
                        //props.addWork(newWork) //update store
                        //props.addWork({
                        //    ...newWork,
                        //      record_id: res.data.record_id
                        //})
                        setAddState(false)
                        setNewWork({
                            job_title: '',
                            company_name: '',
                            start_date: '',
                            end_date: '',
                            description: ''
                        })
                        handleStartDateChange(null)
                        handleEndDateChange(null)
                        setSubmit(false)
                    } else {
                        console.log('error')
                        setSnackbar('Error adding work experience.')
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
                            <Box display="flex" alignItems="flex-start">
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
                                {addState ? null :
                                    <Box m={2}>
                                        <Button variant="outlined" color="primary" className={classes.button} onClick={handleClickAdd}>
                                            <AddIcon className={classes.leftIcon} />
                                            Add
                                    </Button>
                                    </Box>
                                }
                            </Box>
                        </Typography>
                    </Grid>

                    <Grid item style={{ width: "100%", paddingLeft: '2.5%', paddingRight: '2.5%' }} xs={12}>
                        {addState ?
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
                                                value={selectedStartDate}
                                                disableFuture
                                                required
                                                inputVariant="outlined"
                                                label="Start Date"
                                                onChange={(date) => { handleStartDateChange(date); handleChange('start_date')(date) }}
                                                margin="normal"
                                            />
                                        </MuiPickersUtilsProvider>
                                    </Grid>

                                    {checkedState ? null :
                                        <Grid item xs={12} md={6}>
                                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                <DatePicker
                                                    views={["year", "month"]}
                                                    className={classes.textField}
                                                    value={selectedEndDate}
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
                                    {!dateValid && submitState ?
                                        <Typography variant="caption" style={{ color: "red" }} className={classes.error}>
                                            Start Date cannot be after End Date!
                                </Typography>
                                        : null}

                                    <Grid item xs={12} md={12}>
                                        <TextField
                                            variant="outlined"
                                            label="Description"
                                            className={classes.description}

                                            multiline
                                            rows="4"
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
                            </form> : null}


                        {props.works && props.works.length !== 0 ?
                            <List className={classes.root}>
                                {props.works.map((experience, index) => {
                                    return (
                                        <CustomisedListItem item={experience} isLastItem={props.works.length - 1 === index} setSnackbar={setSnackbar} />
                                    )
                                })}
                            </List> : null}
                    </Grid>
                </Grid>
            </div>
        </div>

    )
}

const mapStateToProps = state => {
    return {
        works: state.work.work,
        undoExecute: state.undo.execute,
        undoName: state.undo.name,
        undoObj: state.undo.obj
    }

};

export default connect(mapStateToProps,
    { updateWork, addWork,storeUndo,executeUndo }
)(WorkWithDatepicker);
