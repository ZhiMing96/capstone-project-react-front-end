import React,{Fragment} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import FaceIcon from '@material-ui/icons/Face';
import PublicProfile from '../Pages/PublicProfile/PublicProfile';
import IconButton from '@material-ui/core/IconButton';
import { CardActions, CardActionArea } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import api from '../api'
import TextField from '@material-ui/core/TextField';
import { connect } from "react-redux";
import { useSnackbar } from 'notistack';
import ClearIcon from '@material-ui/icons/Clear'


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
    dialogAvatar: {
        width: 70,
        height: 70,
        marginTop: 10
    },
    confirmationAvatar:{
        width: 70,
        height: 70,
        marginLeft:40,
        marginRight:40
    },
    button: {
        margin: theme.spacing(1)
    },
    card: {
        margin: theme.spacing(2),
        minWidth: 300,
        marginBottom: theme.spacing(5)
    },
    content: {
        padding: theme.spacing(0.5)
    },
    actions: {
        justifyContent: "flex-end",
        paddingTop: 0
    },

}));



function MeetupCard(props) {
    const classes = useStyles();
    const user = props.item.user
    const [openDialog, setOpenDialog] = React.useState(false)//
    const [message, setMessage] = React.useState('')
    //const [messageSent, setMessageSent] = React.useState(false)//
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const action = key => (
        <Fragment>
            <IconButton onClick={() => { closeSnackbar(key) }} size="small" style={{ color:'white' }}>
                <ClearIcon/>
            </IconButton>
        </Fragment>
    );

    const redirectProfile = () => {
        props.redirectProfile(user.profile.user_id)
    }
    const handleOpenDialog = () => {
        setOpenDialog(true);
    }
    const handleCloseDialog = () => {
        //setMessageSent(false)
        setMessage('')
        setOpenDialog(false)
    }
    const handleChange = (e) => {
        setMessage(e.target.value)
    }
    const handleSendInvite = () => {
        var newMessage = message
        var i = 0
        while( i < newMessage.length) {
            if (newMessage.charAt(i) == "'") {
                newMessage =   newMessage.slice(0, i) + "'" + newMessage.slice(i)
              i++
            }
            i++
        }
        api.meetups.invite({
            target_user: user.profile.user_id,
            message: newMessage
        }).then(res => {
            if (res.data.response_code === 200) {
                //setMessageSent(true)               
                enqueueSnackbar('Invitation sent!',  { variant: "success", action } )
                setMessage('')
            }else{
                enqueueSnackbar('Error sending invitation',  { variant: "error", action } )
            }
        }).catch(err => {
            console.log(err)
            enqueueSnackbar('Error sending invitation',  { variant: "error", action } )
        })
        handleCloseDialog()
    }
    return (
        <div>
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
                                        style={{ fontSize: 'small' }}
                                    >
                                        {user.social.description}
                                    </Typography>
                                }
                            />
                        </ListItem>
                    </CardContent>
                </CardActionArea>
                <CardActions className={classes.actions}>

                    <Button size="small" color="primary" className={classes.button} onClick={handleOpenDialog}>
                        Send Meetup Invitation
                </Button>

                </CardActions>

            </Card>
            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                //BackdropProps={{ invisible: true }}
                overlayStyle={{ backgroundColor: 'transparent' }}
                //PaperProps ={{className :classes.paperbd}}
                maxWidth='sm'
                fullWidth
            >
                {/*
                {messageSent ?
                    <DialogContent style={{ overflowY: 'hidden', margin:40}}>
                        <Grid container justify="center" xs={12}>
                                {user.social.profile_image_link !== null && user.social.profile_image_link !== ''
                                    ?
                                    <Avatar src={user.social.profile_image_link} className={classes.confirmationAvatar} />
                                    :
                                    <FaceIcon fontSize="large" className={classes.confirmationAvatar} />
                                }
                                {props.profileImage !== null && props.profileImage !== ''
                                    ?
                                    <Avatar src={props.profileImage} className={classes.confirmationAvatar} />
                                    :
                                    <FaceIcon fontSize="large" className={classes.confirmationAvatar} />
                                }
                        </Grid>
                        <DialogContentText>
                            <Box m={3} textAlign="center">Invitation Sent!</Box>
                        </DialogContentText> 
                    </DialogContent>
                    :
                    */}

                    <div>
                        <DialogContent style={{ overflowY: 'hidden' }}>

                            <Grid container justify="center" spacing={3}>

                                <Grid item xs={2} style={{ textAlign: '-webkit-center' }}>
                                    {user.social.profile_image_link !== null && user.social.profile_image_link !== ''
                                        ?
                                        <Avatar src={user.social.profile_image_link} className={classes.dialogAvatar} />
                                        :
                                        <FaceIcon fontSize="large" className={classes.dialogAvatar} />
                                    }
                                </Grid>
                                <Grid item xs={9}>
                                    <DialogContentText style={{ marginTop: 10, fontWeight:'bold' }}>
                                        {`Write a message to ${user.profile.first_name}!`}
                                    </DialogContentText>
                                    <TextField
                                        autoFocus
                                        margin="normal"
                                        label="Message"
                                        multiline
                                        rows="4"
                                        fullWidth
                                        onChange={handleChange}
                                        variant="outlined"
                                        placeholder= "Hello! I came across your profile and am interested to meet you! Would you be available for lunch on this Wednesday?"
                                        maxLength={200}
                                    />
                                </Grid>
                            </Grid>
                        </DialogContent>
                        <DialogActions style={{ marginRight: 10 }}>
                            <Button onClick={handleCloseDialog} color="primary">
                                Cancel
                </Button>
                            <Button onClick={handleSendInvite} color="primary" autoFocus>
                                Confirm
                </Button>
                        </DialogActions>
                    </div>
                
            </Dialog>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        profileImage: state.socialProfile.profile_image_link
    }
}

export default connect(mapStateToProps)(MeetupCard)