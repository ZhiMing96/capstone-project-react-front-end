import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import { Hidden } from '@material-ui/core';
import { Block } from '@material-ui/icons';
import FaceIcon from '@material-ui/icons/Face';

const useStyles = makeStyles(theme => ({
    inline: {
        display: 'inline',
    },
    root: {
        minWidth: 80,
    },
    avatar: {
        width: 50,
        height: 50,
        marginTop: 10
    },
    calendar: {
        marginRight: 10,
        display: 'inline'
    },
    button: {
        margin: theme.spacing(1)
    }
}));

export default function AlignItemsList(props) {
    const classes = useStyles();
    const author = props.reco.from_user
    return (
        <div>
            <ListItem alignItems="flex">
                <ListItemAvatar className={classes.root}>
                    {author.social.profile_image_link !== null && author.social.profile_image_link !== ''
                        ?
                        <Avatar src={author.social.profile_image_link} className={classes.avatar} />
                        :
                        <FaceIcon fontSize="large" className={classes.avatar} />
                    }
                </ListItemAvatar>

                <ListItemText
                    primary={
                        <div style={{ marginBottom: 10 }}>
                            <Typography
                                component="div"
                                variant="h6"
                                style={{ fontWeight: 'bold', lineHeight: 1.1 }}
                                color="textPrimary"
                            >
                                {author.profile.first_name}
                            </Typography>
                            <Typography
                                component="span"
                                variant="subtitle1"
                                color="textSecondary"
                                style={{ fontSize: 'medium' }}
                            >
                                {author.job_title}
                            </Typography>
                        </div>
                    }
                    secondary={
                        <Typography
                            component="span"
                            variant="body2"
                            className={classes.inline}
                            color="textPrimary"
                            style={{ fontSize: 'medium' }}
                        >
                            {props.reco.message}
                        </Typography>
                    }
                />
            </ListItem>
            <Divider variant="inset" component="li" />
        </div>)
}