import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Box, FormControlLabel,Checkbox } from '@material-ui/core'
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import SnackBar from '../../../Components/Snackbar'
import api from '../../../api'
import EditIcon from '@material-ui/icons/Edit';
import { connect } from "react-redux";
import { updateSocialProfile } from '../../../redux/actions/socialProfile'

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
        width: "100%",
    },
    button: {
        marginRight: theme.spacing(1),
        marginTop: theme.spacing(-0.5),
    },
    leftIcon: {
        marginRight: theme.spacing(1),
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


function SocialProfileRead(props) {
    const classes = useStyles();
    const [profileState, setProfileState] = React.useState({
        profile_image_link: '',
        description: '',
        meetup_ind:'',
        job_search_stage:'',
        preferred_locations:[]
    })
    console.log(props)

    var otherUserId = null;
    if(props.user){
        otherUserId = props.user;
    }

    //initialise
    useEffect(() => {
        console.log(profileState)
        api.profile.get().then(res => {
            console.log(res.data.social)
            const { profile_image_link, description,  meetup_ind, job_search_stage, preferred_locations} = res.data.social
            console.log(res.data.social)
            const arr = preferred_locations.map(value=>(
                value.location
            ))
            var str =""
            for(var i = 0; i< arr.length;i++){
                str += arr[i]
                if(i!== arr.length-1){
                    str+= ", "
                }
            }
            setProfileState({
                profile_image_link: profile_image_link,
                description: description,
                meetup_ind:meetup_ind,
                job_search_stage:job_search_stage,
                preferred_locations: str
            })
            props.updateSocialProfile({
                profile_image_link: profile_image_link,
                description: description,
                meetup_ind: meetup_ind,
                job_search_stage: job_search_stage,
                preferred_locations: arr
            })
            console.log(profileState)
        }).catch(err => {
            console.log(err)
        })
    }, [])

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
                                    SOCIAL PROFILE
                                </Box>
                                <Box m={2}>
                                    <Button variant="outlined" color="primary" className={classes.button} onClick={props.changeState}>
                                        <EditIcon className={classes.leftIcon} />
                                        Edit
                                    </Button>
                                </Box>
                            </Box>
                        </Typography>
                    </Grid>

                    <Grid item style={{width: "100%", paddingLeft: '2.5%', paddingRight: '2.5%' }} xs={12}>

                        <form className={classes.form} >
                            <Grid container style={{ width: '85%', textAlign: 'left' }}>

                            <Grid container item xs={12} justify="space-between">
                            <Grid item xs={12} md={5}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={profileState.meetup_ind === 1 ? true : false}
                                                color="primary"
                                                readOnly
                                            />
                                        }
                                        label="Interested in networking"
                                    />
                                </Grid>
                                <Grid item xs={12} md={5}>
                                    <TextField
                                        label="Current Career Focus"
                                        value={
                                            profileState.job_search_stage ===null? 
                                                '-'
                                            :
                                                profileState.job_search_stage ==="SEARCH_JOB"?
                                                    'Search for a Job'
                                                    : profileState.job_search_stage ==="GROW_CAREER"?
                                                        'Grow Your Career':''
                                        }
                                        className={classes.textField}
                                        margin="normal"
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                </Grid>
                                </Grid>
                                <Grid item xs={12} >
                                    <TextField
                                        label="Preferred Locations"
                                        value={
                                            profileState.preferred_locations.length===0? 
                                                '-'
                                            :
                                            profileState.preferred_locations.toString()
                                        }
                                        className={classes.textField}
                                        margin="normal"
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                <TextField
                                        label="Bio Description"
                                        value={profileState.description ==='' || profileState.description === null ? '-' : profileState.description}
                                        className={classes.description}
                                        multiline
                                        margin="normal"
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                </Grid>

                            </Grid>
                        </form>
                    </Grid>
                </Grid>

            </div>
        </div>

    )
}

export default connect(null,
    { updateSocialProfile }
)(SocialProfileRead);
