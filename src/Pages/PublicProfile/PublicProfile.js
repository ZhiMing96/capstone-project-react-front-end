import React, { useState, useEffect, useRef } from 'react';
import { Grid, Typography, Box, List, Badge, Fab, IconButton, Snackbar, Avatar } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import FaceIcon from '@material-ui/icons/Face';
import api from '../../api'

const useStyles = makeStyles(theme => ({
    avatar: {
        width: 70,
        height: 70,
        marginTop: 10
    },
}))

export default function PublicProfile(props) {
    const classes = useStyles();
    
    var user_id = null
    var name, job_title, description, work_experience, recommendations, preferred_locations, profile_image_link
    console.log(props)
    if (props.match !== undefined) {
        user_id = props.match.params.id;
        api.profile.getPublic({
            user_id: user_id
        }).then(res => {
            if (res.data.response_code === 200) {
                name = res.data.profile.first_name + res.data.profile.last_name
                    ({ job_title, description, preferred_locations, profile_image_link } = res.data.social)
                //we
                //locations
            }
        })
    }

    if (user_id === null) {
        return (
            <Typography color='textSecondary' variant="h6">
                User invalid.
        </Typography>
        )
    }

    return (
        <div>

            <Typography component="div">
                <Box
                    fontSize="h5.fontSize"
                    m={3.5}
                    letterSpacing={3}
                    fontWeight="fontWeightBold"
                    color="text.primary"
                >
                    {profile_image_link !== null && profile_image_link !== ''
                        ?
                        <Avatar src={profile_image_link} className={classes.avatar} />
                        :
                        <FaceIcon fontSize="large" className={classes.avatar} />
                    }
                    {name}
                </Box>
            </Typography>
            <Typography
                component="div"
                variant="subtitle1"
                color="textSecondary"
                gutterBottom
                style={{ lineHeight: 'inherit' }}
            >
                {job_title}
            </Typography>
            <Grid container style={{ width: "100%" }} >
                <Typography component="div" >
                    <Box
                        fontSize="h6.fontSize"
                        style={{ fontSize: 'medium' }}
                        letterSpacing={1}
                        textAlign='left'
                        color="text.secondary"
                        fontWeight="fontWeightBold"
                    >
                        DESCRIPTION
                            </Box>
                </Typography>
                <Grid item xs={1}>
                        <Divider display='inline' orientation='vertical' style={{ width: 5, height: '100%', backgroundColor: '#1382B9' }} />
                    </Grid>
                    <Grid item xs={11}>
                        <div style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
                            <Typography variant="subtitle1" noWrap={true} >
                                {description}
                            </Typography>
                        </div>
                    </Grid>

            </Grid>

            <Typography component="div" >
                <Box
                    fontSize="h6.fontSize"
                    style={{ fontSize: 'medium' }}
                    letterSpacing={1}
                    textAlign='left'
                    color="text.secondary"
                    fontWeight="fontWeightBold"
                >
                    WORK EXPERIENCE
                            </Box>
            </Typography>
            <Typography component="div" >
                <Box
                    fontSize="h6.fontSize"
                    style={{ fontSize: 'medium' }}
                    letterSpacing={1}
                    textAlign='left'
                    color="text.secondary"
                    fontWeight="fontWeightBold"
                >
                    RECOMMENDATIONS
                            </Box>
            </Typography>



            <div style={{ width: '95%', margin: 9, marginTop: 15, backgroundColor: '#EDF7FA', height: 'fit-content', padding: 10, maxHeight: '100%' }}>
                <Grid container style={{ maxHeight: '100%' }}>
                    <Grid item xs={1}>
                        <Divider display='inline' orientation='vertical' style={{ width: 5, height: '100%', backgroundColor: '#1382B9' }} />
                    </Grid>
                    <Grid item xs={11}>
                        <div style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
                            <Typography variant="subtitle1" noWrap={true} >
                                {user_id}
                            </Typography>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div>
    )




}
