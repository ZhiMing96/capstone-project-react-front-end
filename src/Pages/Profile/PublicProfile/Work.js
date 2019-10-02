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
import CustomisedListItem  from '../../../Components/CustomisedListItem';

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


export default function Work(props) {
    const classes = useStyles();
    const [state, setState] = React.useState([])
    const [addState, setAddState] = React.useState(false)
    const [newWork, setNewWork] = React.useState({
        job_title:'',
        company_name:'',
        start_date: '',
        start_year:'',
        end_month:'',
        end_year:'',
        description:''
    })
    const [dateValid, setDateValid ] = React.useState(true)

    //initialise
    useEffect(() => {
        console.log('useEffect')
        api.work.get().then(res => {
            setState(res.data.work_experience) //array of obj
        }).catch(err => {
            console.log('error initialising w user work experience')
        })
    }, [])


    const handleClickAdd=()=>{
        const currentState = addState
        setAddState(!currentState)
    }

    const handleChange = name => (event) => {
        setNewWork({ ...newWork, [name]: event.target.value });
        //maybe check date valid?
        
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
                        <form className={classes.form} >
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
                                    <TextField
                                        variant="outlined"
                                        required
                                        label="Start Date"
                                        className={classes.textField}
                                        margin="normal"
                                        onChange={handleChange('start_date')}

                                    />
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        label="End Date"
                                        className={classes.textField}
                                        margin="normal"
                                        onChange={handleChange('end_date')}

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


                        {state.length !== 0? 
                        <List className={classes.root}>
                            {state.map((experience,index) => {
                                return (
                                    <CustomisedListItem item={experience} isLastItem={state.length -1 === index}/>   
                                )
                            })}        
                        </List> : null}
                    </Grid>
                </Grid>
            </div>
        </div>

    )
}


