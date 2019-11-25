import React, { useEffect, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Box, Checkbox, Select, FormControlLabel, InputLabel, MenuItem, FormControl,Input, ListSubheader, IconButton } from '@material-ui/core'
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
import locationData from '../../../data/locations'
import { useSnackbar } from 'notistack';
import ClearIcon from '@material-ui/icons/Clear'
import './SocialProfileEdit.css'

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
        width: "100%",
    },
    formControl: {
        margin: theme.spacing(3, 1, 1, 1),
        width: "100%",
    },
    description: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: "100%",
        //['@media (min-width:920px)']: {
        //width: 790,
        //},
    },

}));


function SocialProfileEdit(props) {
    const classes = useStyles();
    const [profileState, setProfileState] = React.useState({
        profile_image_link: '',
        description: '',
        meetup_ind: '',
        job_search_stage: '',
        preferred_locations: []
    })
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    //initialise
    useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth);
        console.log('useEffect')
        api.profile.get().then(res => {
            const { profile_image_link, description, meetup_ind, job_search_stage, preferred_locations } = res.data.social
            console.log(res.data.social)
            const arr = preferred_locations.map(value=>(
                value.location
            ))
            setProfileState({
                profile_image_link: profile_image_link,
                description: description,
                meetup_ind: meetup_ind,
                job_search_stage: job_search_stage,
                preferred_locations: arr
            })
            props.updateSocialProfile({
                profile_image_link: profile_image_link,
                description: description,
                meetup_ind: meetup_ind,
                job_search_stage: job_search_stage,
                preferred_locations: arr
            })
        }).catch(err => {
            console.log('error initialising w user details')
        })
    }, [])

    console.log(profileState)

    const handleSubmit = (event) => {
        event.preventDefault()
        var message = profileState.description
        var i = 0
        while( i < message.length) {
            if (message.charAt(i) == "'") {
              message =   message.slice(0, i) + "'" + message.slice(i)
              i++
            }
            i++
        }
        api.profile.updateSocial({ ...profileState, description: message })
            .then(res => {
                if (res.data.response_code === 200) {
                    console.log('success')
                    api.profile.updateLocations({
                        preferred_locations: profileState.preferred_locations
                    }).then(res=>{
                        if (res.data.response_code === 200) {
                            enqueueSnackbar('Details saved successfully',  { variant: "success", action } );
                            props.updateSocialProfile(profileState) //update store
                            props.changeState()
                        }
                    }).catch(console.log('error'))
                } else {
                    console.log('error')
                    enqueueSnackbar(res.data.response_message,  { variant: "error", action } );
                }
            }).catch(console.log('error'))
    }

    const action = key => (
        <Fragment>
            <IconButton onClick={() => { closeSnackbar(key) }} size="small" style={{ color:'white' }}>
                <ClearIcon/>
            </IconButton>
        </Fragment>
    );

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

                    <Grid item style={{ width: "100%", paddingLeft: '2.5%', paddingRight: '2.5%' }} xs={12}>

                        <form className={classes.form} onSubmit={(event) => { handleSubmit(event) }}>
                            <Grid container style={{ width: '85%', justify: 'center' }}>
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
                                <Grid container item xs={12} justify="space-between">
                                    <Grid item xs={12} md={5}>
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
                                    <Grid item xs={12} md={5}>
                                        <FormControl variant="outlined" className={classes.formControl}>
                                            <InputLabel ref={inputLabel} >
                                                Preferred Locations
                                        </InputLabel>
                                            <Select
                                                value={profileState.preferred_locations}
                                                onChange={handleChange('preferred_locations')}
                                                labelWidth={labelWidth}
                                                multiple
                                            >
                                                <ListSubheader>North</ListSubheader>
                                                {
                                                    locationData.North.map(value => (
                                                        <MenuItem value={value}>{value}</MenuItem>
                                                    ))
                                                }
                                                <ListSubheader>East</ListSubheader>
                                                {
                                                    locationData.East.map(value => (
                                                        <MenuItem value={value}>{value}</MenuItem>
                                                    ))
                                                }<ListSubheader>South</ListSubheader>
                                                {
                                                    locationData.South.map(value => (
                                                        <MenuItem value={value}>{value}</MenuItem>
                                                    ))
                                                }<ListSubheader>West</ListSubheader>
                                                {
                                                    locationData.West.map(value => (
                                                        <MenuItem value={value}>{value}</MenuItem>
                                                    ))
                                                }<ListSubheader>Central</ListSubheader>
                                                {
                                                    locationData.Central.map(value => (
                                                        <MenuItem value={value}>{value}</MenuItem>
                                                    ))
                                                }
                                            </Select>
                                        </FormControl>
                                    </Grid>


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
        job_search_stage: state.socialProfile.job_search_stage,
        preferred_locations: state.socialProfile.preferred_locations
    }
}

export default connect(mapStateToProps,
    { updateSocialProfile }
)(SocialProfileEdit);