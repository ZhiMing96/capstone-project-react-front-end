import React, { useState, useEffect, useRef } from 'react';
import { Grid, Typography, Box, List, Badge, Fab, IconButton, Snackbar, Avatar, ListItemText, ListItem, Chip, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import FaceIcon from '@material-ui/icons/Face';
import api from '../../api'
import CustomisedListItem from '../../Components/CustomisedListItem';
import RecoListItem from '../../Components/RecoListItem';
import WorkExList from './WorkExList';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CircularLoading from '../../Components/LoadingBars/CircularLoading'

const useStyles = makeStyles(theme => ({
    avatar: {
        width: 120,
        height: 120,
        margin: 10
    },
    item: {
        paddingRight: theme.spacing(8),
        ['@media (min-width:920px)']: {
            paddingRight: theme.spacing(10)
        },
    },
    button: {
        margin: theme.spacing(1),
        marginTop:  theme.spacing(2.5)
    },
}))

export default function PublicProfile(props) {
    const classes = useStyles();
    const [profile, setProfile] = useState({
        name: '',
        job_title: '',
        description: '',
        profile_image_link: '',
        preferred_locations: []
    })
    const [work, setWork] = useState(null)
    const [reco, setReco] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    console.log(props)

    var user_id = null
    if (props.location.state && props.location.state.user_id) {
        user_id = props.location.state.user_id;
    }


    useEffect(() => {
        const fetchData = () => {
            //profile
            api.profile.getPublic({
                user_id: user_id
            }).then(res => {
                if (res.data.response_code === 200) {
                    console.log('**************************')
                    console.log(res.data.profile)
                    setProfile({
                        name: res.data.profile.first_name + " " + res.data.profile.last_name,
                        job_title: res.data.job_title,
                        description: res.data.social.description,
                        profile_image_link: res.data.social.profile_image_link,
                        preferred_locations: res.data.social.preferred_locations
                    })
                }
            })
            //work
            api.work.getPublic({
                user_id: user_id
            }).then(res => {
                if (res.data.response_code === 200) {
                    setWork(res.data.work_experience)
                    console.log('**************************')
                    console.log(res.data.work_experience)
                }
            })
            //reco
            api.recommendations.getPublic({
                user_id: user_id
            }).then(res => {
                if (res.data.response_code === 200) {
                    setReco(res.data.recommendations)
                    console.log("reco setting")
                }
            })
        };
        fetchData();

    }, [])

    useEffect(() => {
        if (reco !== null && work !== null && profile.first_name !== '') {
            setIsLoaded(true)
        }
    }, [reco, work, profile])


    const handleClick=()=>{
        props.history.goBack()
    }

    if (user_id === null) {
        return (
            <Typography color='textSecondary' variant="h6" style={{ marginTop: 20 }}>
                User invalid.
            </Typography>
        )
    }
    if (isLoaded) {
        return (
            <div>
                <div style={{textAlign:"initial"}}>
                    <Button
                        color="primary"
                        className={classes.button}
                        startIcon={<ArrowBackIcon />}
                        onClick={handleClick}
                    >
                        Back
                    </Button>
                </div>
                <Typography component="div" style={{ textAlign: '-webkit-center' }}>
                    <Box
                        fontSize="h5.fontSize"
                        letterSpacing={3}
                        m={3.5}
                        fontWeight="fontWeightBold"
                        color="text.primary"
                        style={{marginTop:0}}
                    >
                        {profile.profile_image_link !== null && profile.profile_image_link !== ''
                            ?
                            <Avatar src={profile.profile_image_link} className={classes.avatar} />
                            :
                            <FaceIcon fontSize="large" className={classes.avatar} />
                        }
                    </Box>
                </Typography>
                <Typography
                    component="div"
                    variant="h6"
                    color="primary"
                    gutterBottom
                    style={{ lineHeight: 'inherit', fontWeight: 'bold' }}
                >
                    {profile.name}
                </Typography>
                <Typography
                    component="div"
                    variant="subtitle1"
                    color="textPrimary"
                    gutterBottom
                    style={{ lineHeight: 'inherit', marginBottom: 60 }}
                >
                    {profile.job_title}

                </Typography>

                <Grid container style={{ width: "100%", marginTop: 20, marginBottom: 20 }} >
                    <Grid item xs={12}>
                        <Typography component="div" style={{ marginBottom: 10 }}>
                            <Box
                                fontSize="h6.fontSize"
                                style={{ fontSize: 'large' }}
                                letterSpacing={1}
                                textAlign='left'
                                color="text.secondary"
                                fontWeight="fontWeightBold"
                                gutterBottom
                            >
                                DESCRIPTION
                    </Box>
                        </Typography>
                    </Grid>
                    <Grid item xs={1}>
                        <Divider display='inline' orientation='vertical' style={{ width: 5, height: '100%', backgroundColor: '#1382B9' }} />
                    </Grid>
                    <Grid item xs={11}>
                        <div style={{ textAlign: "justify" }} >
                        {profile.description !== null && profile.description !== ''?
                            <Typography variant="subtitle1" >
                                {profile.description}
                            </Typography>
                            :
                            <Typography color='textSecondary' variant="subtitle1">
                                User has not written a bio description.
                            </Typography>
                        }
                        </div>
                    </Grid>
                </Grid>

                <Grid container style={{ width: "100%", marginTop: 20, marginBottom: 20 }} >
                    <Grid item xs={12}>
                        <Typography component="div" style={{ marginBottom: 10 }}>
                            <Box
                                fontSize="h6.fontSize"
                                style={{ fontSize: 'large' }}
                                letterSpacing={1}
                                textAlign='left'
                                color="text.secondary"
                                fontWeight="fontWeightBold"
                                gutterBottom
                            >
                                WORK EXPERIENCE
                    </Box>
                        </Typography>
                    </Grid>
                    <Grid item xs={1}>
                        <Divider display='inline' orientation='vertical' style={{ width: 5, height: '100%', backgroundColor: '#1382B9' }} />
                    </Grid>
                    <Grid item xs={11}>
                        <div style={{ textAlign: "justify" }} >
                            <Typography variant="subtitle1" >
                                {work && work.length > 0 ?
                                    <WorkExList list={work} /> :
                                    <Typography color='textSecondary' variant="subtitle1">
                                        User has no work experience listed yet.
                                </Typography>
                                }
                            </Typography>
                        </div>
                    </Grid>
                </Grid>

                <Grid container style={{ width: "100%", marginTop: 20, marginBottom: 20 }} >
                    <Grid item xs={12}>
                        <Typography component="div" style={{ marginBottom: 10 }}>
                            <Box
                                fontSize="h6.fontSize"
                                style={{ fontSize: 'large' }}
                                letterSpacing={1}
                                textAlign='left'
                                color="text.secondary"
                                fontWeight="fontWeightBold"
                                gutterBottom
                            >
                                RECOMMENDATIONS
                    </Box>
                        </Typography>
                    </Grid>
                    <Grid item xs={1}>
                        <Divider display='inline' orientation='vertical' style={{ width: 5, height: '100%', backgroundColor: '#1382B9' }} />
                    </Grid>
                    <Grid item xs={11}>
                        <div style={{ textAlign: "justify" }} >
                            <Typography variant="subtitle1" >
                                {reco && reco.length !== 0 ?
                                    <List>
                                        {reco.map((reco, index) => {
                                            return (
                                                <RecoListItem reco={reco} />
                                            )
                                        })
                                        }
                                    </List> :
                                    <Typography color='textSecondary' variant="subtitle1">
                                        User has no recommendations yet.
                                </Typography>}
                            </Typography>
                        </div>
                    </Grid>
                </Grid>
            </div>
        )
    } else {
        return (
            <Grid container justify='center' style={{marginTop: 40}}>
            <CircularLoading />
          </Grid>
        )
    }
}
