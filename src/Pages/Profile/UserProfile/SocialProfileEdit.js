import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Box, Checkbox, Select, FormControlLabel, InputLabel, MenuItem, FormControl } from '@material-ui/core'
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import { Link as RouterLink } from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';
import Container from '@material-ui/core/Container';
import { connect } from "react-redux";
import { updateSocialProfile } from '../../../redux/actions/socialProfile'
import SnackBar from '../../../Components/Snackbar'
import api from '../../../api'

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
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(5, 2, 0, 0),
        width: '100px'
    },
    error: {
        textAlign: 'left !important' //cannot lol
    },
    button: {
        marginRight: theme.spacing(1),
        marginTop: theme.spacing(-0.5),
    },
    leftIcon: {
        marginRight: theme.spacing(1),
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 280,
    },
    formControl: {
        margin: theme.spacing(3, 1, 1, 1),
        minWidth: 280,
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


function SocialProfileEdit(props) {
    const classes = useStyles();
    const [profileState, setProfileState] = React.useState({
        profile_image_link: '',
        description: '',
        meetup_ind: '',
        job_search_stage: ''
    })

    //initialise
    useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth);
        console.log('useEffect')
        api.profile.get().then(res => {
            const { profile_image_link, description, meetup_ind, job_search_stage } = res.data.social
            console.log(res.data.social)
            setProfileState({
                profile_image_link: profile_image_link,
                description: description,
                meetup_ind: meetup_ind,
                job_search_stage: job_search_stage
            })
            props.updateSocialProfile({
                profile_image_link: profile_image_link,
                description: description,
                meetup_ind: meetup_ind,
                job_search_stage: job_search_stage
            })
        }).catch(err => {
            console.log('error initialising w user details')
        })
    }, [])

    console.log(profileState)
    const [submitState, setSubmit] = React.useState(false)

    const handleSubmit = (event) => {
        setSubmit(true) //render email validation error if present
        event.preventDefault()


        api.profile.updateSocial(profileState)
            .then(res => {
                if (res.data.response_code === 200) {
                    console.log('success')
                    props.setSnackbar('Details saved successfully.')
                    props.updateSocialProfile(profileState) //update store
                    props.changeState()
                } else {
                    console.log('error')
                    props.setSnackbar(res.data.response_message)
                }
            }).catch(console.log('error'))


    }
    const handleChange = name => (event) => {

        if (name === 'meetup_ind') {
            setProfileState({ ...profileState, [name]: event.target.checked ? 1 : 0 });
        } else {
            setProfileState({ ...profileState, [name]: event.target.value });
        }
    }
    const inputLabel = React.useRef(null);
    const [labelWidth, setLabelWidth] = React.useState(0);



    return (
        <div>
            <CssBaseline />
            <div className={classes.paper}>

                <Grid container direction="row" style={{ width: '100%', textAlign: 'left' }}>
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

                                    SOCIAL PROFILE
                                </Box>
                            </Box>
                        </Typography>


                    </Grid>

                    <Grid item style={{ marginLeft: '2.5%', marginRight: '2.5%' }}>

                        <form className={classes.form} onSubmit={(event) => { handleSubmit(event) }}>
                            <Grid container style={{ width: '100%', justify: 'center' }}>
                                <Grid item xs={12} md={12}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={profileState.meetup_ind === 1 ? true : false}
                                                onChange={handleChange('meetup_ind')}

                                                color="primary"
                                            />
                                        }
                                        label="I'm interested to receive notifications for possible networking meet-ups with other users."
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <FormControl variant="outlined" className={classes.formControl}>
                                        <InputLabel ref={inputLabel} >
                                            Current Career Focus
                                        </InputLabel>
                                        <Select
                                            value={profileState.job_search_stage}
                                            onChange={handleChange('job_search_stage')}
                                            labelWidth={labelWidth}
                                        >

                                            <MenuItem value={"SEARCH_JOB"}>Search for a Job</MenuItem>
                                            <MenuItem value={"GROW_CAREER"}>Grow Your Career</MenuItem>
                                            
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <TextField
                                        label="Bio Description"
                                        variant='outlined'
                                        multiline
                                        value={profileState.description}
                                        className={classes.description}
                                        rows={4}
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
                                    onClick={props.changeState}
                                >
                                    Cancel
              </Button>
                            </Grid>
                        </form>
                    </Grid>
                </Grid>
            </div>

        </div>

    )
}

const mapStateToProps = (state) => {
    return {
        profile_image_link: state.socialProfile.profile_image_link,
        description: state.socialProfile.description,
        meetup_ind: state.socialProfile.meetup_ind,
        job_search_stage: state.socialProfile.job_search_stage
    }
}

export default connect(mapStateToProps,
    { updateSocialProfile }
)(SocialProfileEdit);