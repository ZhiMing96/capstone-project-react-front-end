
import React, { useEffect, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles'; import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import { Grid, Typography, Box, Chip } from '@material-ui/core'
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
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import CategoryInput from '../Pages/Profile/UserProfile/JobCategoryInput'
import { useSnackbar } from 'notistack';
import ClearIcon from '@material-ui/icons/Clear'


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
    const[openDialog, setOpenDialog] = React.useState(false);
    const[message, setMessage] = React.useState('');
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const [state, setState] = React.useState({
        record_id: '',
        job_title: '',
        company_name: '',
        start_date: '',
        end_date: '',
        description: '',
        categories:[]
    });
    const action = key => (
        <Fragment>
            <IconButton onClick={() => { closeSnackbar(key) }} size="small" style={{ color:'white' }}>
                <ClearIcon/>
            </IconButton>
        </Fragment>
    );

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
        var message = state.description
        var i = 0
        while( i < message.length) {
            if (message.charAt(i) == "'") {
              message =   message.slice(0, i) + "'" + message.slice(i)
              i++
            }
            i++
        }
        if (dateValid) {
            api.work.update({ ...state, description: message })
                .then(res => {
                    if (res.data.response_code === 200) {
                        console.log('success')
                        enqueueSnackbar('Work experience updated successfully',  { variant: "success", action } )
                        props.editWork(state) //update store
                        setEditState(false)
                        setState({
                            record_id: '',
                            job_title: '',
                            company_name: '',
                            start_date: '',
                            end_date: '',
                            description: '',
                            categories:[]
                        })
                        setDateValid(false)
                        setCheckedState(false)
                    } else {
                        console.log('error')
                        enqueueSnackbar('Error updating work experience',  { variant: "error", action } );
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
                description: props.item.description,
                categories: props.item.categories
            })
            setDateValid(true)
            if(props.item.end_date === null){
                setCheckedState(true)
            }
        } else {
            setEditState(false)
            setState({
                record_id: '',
                job_title: '',
                company_name: '',
                start_date: '',
                end_date: '',
                description: '',
                categories:[]
            })
            setDateValid(false)
            setCheckedState(false)
        }


    }
    const handleClose= () =>{
        setOpenDialog(false)
      };
    

    const handleDelete = () => {
        setOpenDialog(true)
        const message = 'Confirm removing '+ props.item.job_title + ' from work experience?'
        setMessage(message)
      }
    
    const remove = async()=>{
        handleClose()
        api.work.remove({record_id: props.item.record_id.toString()})
            .then(res => {
                if (res.data.response_code === 200) {
                    console.log('success')
                    enqueueSnackbar('Work experience deleted successfully',  { variant: "success", action } );
                    props.removeWork(props.item.record_id) //update store
                    
                    return
                } else {
                    console.log('error')
                    enqueueSnackbar('Error deleting work experience',  { variant: "error", action } );
                }
            }).catch(console.log('error'))
    }
    const matchCategory = () => {
        console.log(state.description)
        api.work.matchCategory({
            description: state.description
        }).then(res => {
            setState({ ...state, categories: res.data.categories });
            console.log(res.data.categories)
        }).catch(err => {
            console.log(err)
        })
    }

    const handleCategory=(value)=>{
        const arr = value.map(cat=> cat.label)
        console.log(arr)
        setState({ ...state, categories: arr });
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
                                onBlur={matchCategory}
                                multiline
                                rows="4"
                                margin="normal"
                                onChange={handleChange('description')}
                                value={state.description}
                            />
                        </Grid>
                                    <Grid item xs={12}>
                                        <CategoryInput categories={state.categories} key={state.catogories} handleCategory={handleCategory}/>
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
                                {props && props.items && props.items.categories && props.item.categories.map(val=>(
                                    <Chip variant="outlined" label={val} style={{ margin: 4, padding:2 }} size="small"/>
                                ))}
                                
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
                <Dialog
                    open={openDialog}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    BackdropProps={{ invisible: true }}
                //PaperProps ={{className :classes.paperbd}}

                >

                    <DialogContent >
                        <DialogContentText id="alert-dialog-description">
                            {message}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={remove} color="primary" autoFocus>
                            Confirm
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default connect(null,
    { editWork, removeWork }
)(CustomisedListItem);