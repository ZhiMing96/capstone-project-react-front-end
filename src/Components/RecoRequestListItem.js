import React , { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import { Hidden } from '@material-ui/core';
import { Block } from '@material-ui/icons';
import api from '../api';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Badge from '@material-ui/core/Badge';

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
    },
    dialogAvatar : {
        width:95,
        height:95,
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '-webkit-fill-available',
    },
    avatarGrid: {
        marginRight:'5%', 
        textAlign:'-webkit-center', 
        paddingLeft:'4%',
        [theme.breakpoints.down('xs')]: {
            marginBottom:'7%'
        },

    }
}));

export default function AlignItemsList({ meetup, handleOpenSnackBar}) {
    const classes = useStyles();
    const [requestMessage, setRequestMessage] = useState()
    const [openDialog, setOpenDialog] = useState(false);
    // const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);
    // const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);
    const errorMsg = "An Error Has Occured! Request was Unsucessful"
    const successMsg = "Requst Sent! "

    console.log('<< Meetup Item >> ')
    console.log(meetup)

    const handleChange = event => {
        //console.log(event.target.value);
        setRequestMessage(event.target.value);
      };

    const handleOpenDialog = () => {
        setOpenDialog(true);
    }
    const handleCloseDialog = () => {
        setOpenDialog(false)
    }
    
    const handleSendRequest = () => {
        console.log('**** Entered handleSendRequest ****')
        console.log(meetup)
        console.log(requestMessage)
        const targetUser = 
        meetup.other_user && meetup.other_user.profile
        ? meetup.other_user.profile.user_id
        : null ;

        console.log(targetUser)
        setOpenDialog(false);

        api.recommendations.request({
            target_user: targetUser,
            message: requestMessage
        })
        .then(res => {
            
            console.log(res.data)
            if(res.data.response_code === 200){
                console.log('**** Successfully Send Recommendation Request ****')
                handleOpenSnackBar("Success");
            } else {
                handleOpenSnackBar("Error");
            }
            
        }).catch(err=>{
            console.log(err)
            setOpenDialog(false);
        })
    }

    

    const formatDate = (stringDate, length) => {
         const date = new Date(stringDate)
         if(length === "short") {
            var month = date.toLocaleString('en-GB', { month: 'short' });
         } else {
            var month = date.toLocaleString('en-GB', { month: 'long' });
         }
         

         return(date.getDate() + " " +  month + " " + date.getFullYear())
    }

    console.log("JUST BEFORE RENDER")
    return (
        <div>
            <ListItem alignItems="flex">
                <ListItemAvatar className={classes.root}>
                    <Avatar src="" className={classes.avatar} />
                </ListItemAvatar>
                <Grid container alignItems="center" justify="space-between">
                    <Grid item>
                        <ListItemText
                            primary={
                                <Typography
                                    component="div"
                                    variant="h6"
                                    style={{ fontWeight: 'bold', lineHeight: 'inherit' }}
                                    className={classes.inline}
                                    color="textPrimary"
                                >
                                    {meetup.other_user && meetup.other_user.profile
                                    ? meetup.other_user.profile.username
                                    : 'USER' 
                                    }
                                </Typography>
                            }
                            secondary={
                                <Grid container alignItems="center">
                                    <CalendarTodayIcon className={classes.calendar} />
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        className={classes.inline}
                                        color="textSecondary"
                                        style={{ fontSize: 'medium' }}
                                    >
                                        {formatDate(meetup.suggested_datetime,'short')}
                                    </Typography>
                                </Grid>
                            }
                        />
                    </Grid>

                    <Grid item>

                        <Button color="primary" edge="end" variant="outlined" className={classes.button}
                        onClick={() => handleOpenDialog()}>
                            Request
                        </Button>
                    </Grid>

                </Grid>
            </ListItem>
            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth
            >
                <DialogContent style={{padding:'10%', paddingBottom:'1%'}}>
                    <Grid container>
                        <Grid item container xs={12}>
                            <Grid item xs={12} sm={3} className={classes.avatarGrid}>
                                <Avatar
                                src=''
                                alt='list'
                                className={classes.dialogAvatar}/>
                            </Grid>
                            <Grid item container xs={12} sm={8} style={{}}>
                                <Grid item container xs={12}>
                                    <Grid item xs={4}>
                                        Name:
                                    </Grid>
                                    <Grid item xs={8}>
                                        <Typography gutterBottom>
                                            {meetup.other_user && meetup.other_user.profile
                                            ? meetup.other_user.profile.username.toUpperCase()
                                            : 'USER' 
                                            }
                                        </Typography>
                                    </Grid>

                                </Grid>
                                <Grid item container xs={12}>
                                    <Grid item xs={4}>
                                        JobTitle
                                    </Grid>
                                    <Grid item xs={8}>
                                        <Typography gutterBottom>
                                            NUS Lecturer
                                        </Typography>
                                    </Grid>

                                </Grid>
                                <Grid item container xs={12}>
                                    <Grid item xs={4}>
                                        Company
                                    </Grid>
                                    <Grid item xs={8}>
                                        National University of Singapore
                                    </Grid>

                                </Grid>
                                <Grid item container xs={12}>
                                    <Grid item xs={4}>
                                        Meetup Date
                                    </Grid>
                                    <Grid item xs={8}>
                                        <Typography gutterBottom>
                                            {formatDate(meetup.suggested_datetime,'long')}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container style={{marginTop:'2%',}}>
                        <Grid item xs={12} style={{textAlign:'center'}}>
                            <TextField
                                id="standard-multiline-static"
                                multiline
                                rows="5"
                                className={classes.textField}
                                margin="normal"
                                variant="outlined"
                                onChange={handleChange}
                                label="Type a Message"
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleCloseDialog} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSendRequest} color="primary" autoFocus>
                    Submit
                </Button>
                </DialogActions>
            </Dialog>

            <Divider variant="inset" component="li" />
        </div>)
}