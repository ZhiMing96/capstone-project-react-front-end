import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import FaceIcon from '@material-ui/icons/Face';
import PublicProfile from '../Pages/PublicProfile/PublicProfile';
import IconButton from '@material-ui/core/IconButton';
import { CardActions, CardActionArea } from '@material-ui/core';

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
    button: {
        margin: theme.spacing(1)
    },
    card:{
        margin:theme.spacing(2), 
        minWidth:300,
        marginBottom: theme.spacing(5)
    },
    content:{
        padding:theme.spacing(0.5)
    },
    actions:{
        justifyContent:"flex-end",
        paddingTop:0
    }
    
}));



export default function AlignItemsList(props) {
    const classes = useStyles();
    const user = props.item.user
    console.log(props)

    const redirectProfile=()=>{
        props.redirectProfile(user.profile.user_id)
    }
    
    return (
        <Card className={classes.card}> 
        <CardActionArea onClick={redirectProfile}>
            <CardContent className={classes.content}>
            <ListItem alignItems="flex" key={user}> 
                <ListItemAvatar className={classes.root}>
                    {user.social.profile_image_link !== null && user.social.profile_image_link !== ''
                        ?
                        <Avatar src={user.social.profile_image_link} className={classes.avatar} />
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
                                {user.profile.first_name}
                            </Typography>
                            <Typography
                                component="span"
                                variant="subtitle1"
                                color="textSecondary"
                                style={{ fontSize: 'medium' }}
                            >
                                {props.item.job_title}
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
                            {user.social.description}
                        </Typography>
                    }
                />
            </ListItem>
            </CardContent>
            </CardActionArea>
            <CardActions className={classes.actions}>

                <Button size="small" color="primary" className={classes.button}>
                    Send Meetup Invitation
                </Button>

            </CardActions>
            
            </Card>
)
}