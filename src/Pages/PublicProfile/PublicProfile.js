import React, { useState, useEffect, useRef } from 'react';
import { Grid, Typography, Box, List, Badge, Fab, IconButton, Snackbar, Avatar,ListItemText, ListItem, Chip } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import FaceIcon from '@material-ui/icons/Face';
import api from '../../api'
import CustomisedListItem from '../../Components/CustomisedListItem';
import RecoListItem from '../../Components/RecoListItem';
import WorkExList from './WorkExList';

const useStyles = makeStyles(theme => ({
    avatar: {
        width: 120,
        height: 120,
        margin: 10
    },
    item: {
        paddingRight: theme.spacing(8),
        ['@media (min-width:920px)']:{
            paddingRight: theme.spacing(10)
        },
    },
}))

export default function PublicProfile(props) {
    const classes = useStyles();
    const [state, setState] = useState({
        name: '',
        job_title: '',
        description: '',
        work_experience: [],
        recommendations: [],
        profile_image_link: '',
        preferred_locations: []
    })
    var user_id = null
    if (props.match !== undefined) {
        user_id = props.match.params.id;
    }

    useEffect(() => {
        api.profile.getPublic({
            user_id: user_id
        }).then(res => {
            if (res.data.response_code === 200) {
                var job_title, description, preferred_locations, profile_image_link;
                ({ job_title, description, preferred_locations, profile_image_link } = res.data.social)
                setState({
                    ...state,
                    name: res.data.profile.first_name + " " + res.data.profile.last_name,
                    job_title: job_title,
                    description: description,
                    profile_image_link: profile_image_link,
                    preferred_locations: preferred_locations
                })
            }
        })
        api.work.getPublic({
            user_id: user_id
        }).then(res => {
            if (res.data.response_code === 200) {
                setState({
                    ...state,
                    work_experience: res.data.work_experience
                })
                console.log('**************************')
                console.log(res.data.work_experience)
            }
        })
        api.recommendations.getPublic({
            user_id: user_id
        }).then(res => {
            if (res.data.response_code === 200) {
                setState({
                    ...state,
                    recommendations: res.data.recommendations
                })
                console.log(res.data.recommendations)
            }
        })

    }, [])

    if (user_id === null) {
        return (
            <Typography color='textSecondary' variant="h6">
                User invalid.
        </Typography>
        )
    }

    return (
        <div>
            <Typography component="div" style={{ textAlign: '-webkit-center' }}>
                <Box
                    fontSize="h5.fontSize"
                    m={3.5}
                    letterSpacing={3}
                    fontWeight="fontWeightBold"
                    color="text.primary"
                >
                    {state.profile_image_link !== null && state.profile_image_link !== ''
                        ?
                        <Avatar src={state.profile_image_link} className={classes.avatar} />
                        :
                        <FaceIcon fontSize="large" className={classes.avatar} />
                    }
                </Box>
            </Typography>
            <Typography
                component="div"
                variant="h6"
                color="textPrimary"
                gutterBottom
                style={{ lineHeight: 'inherit', fontWeight: 'bold' }}
            >
                {state.name}
            </Typography>
            <Typography
                component="div"
                variant="subtitle1"
                color="textSecondary"
                gutterBottom
                style={{ lineHeight: 'inherit', marginBottom: 50 }}
            >
                {/*{state.job_title}*/}
                Graphic Designer
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
                        <Typography variant="subtitle1" >
                            {state.description}
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
                            {state.work_experience && state.work_experience.length !== 0 ?
                                <WorkExList list={state.work_experience}/>: null}
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
                            {state.recommendations && state.recommendations.length !== 0 ?
                                <List>
                                    {state.recommendations.map((reco, index) => {
                                        return (
                                            <RecoListItem reco={reco} />
                                        )
                                    })
                                    }
                                </List> : null}
                        </Typography>
                    </div>
                </Grid>
            </Grid>
        </div>
    )




}
