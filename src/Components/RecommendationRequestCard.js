import React, { useState, Fragment} from 'react';
import { Grid, Typography, Box, Card, CardActions, CardContent, CardHeader, Avatar, IconButton, Collapse, Button, Paper,TextField, Divider, Tooltip } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import api from '../api';
import MessageIcon from '@material-ui/icons/Message';
import Popover from '@material-ui/core/Popover';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { useSnackbar } from 'notistack';
import ClearIcon from '@material-ui/icons/Clear'
import defaultImg from '../images/defaultImg.jpg'
import viewProfileBG from '../images/viewProfileBG.jpg'

const useStyles = makeStyles(theme => ({
    card: {
        height: '100%',
        textAlign: 'center',
        alignItems: 'center',
        maxWidth:300
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 0,
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        marginBottom: 20,
        marginTop: -10,
        width: 100,
        height: 100,
        backgroundImage: `url(${viewProfileBG})` ,
        backgroundSize: 'cover'
    },
    close: {
        float: "right",
        margin: theme.spacing(1),
    },
    button: {
        margin: theme.spacing(1),
        marginRight:theme.spacing(0.5),
    },
    paper: {
        padding: theme.spacing(1.5),
        width: '30%',
        maxWidth: 350,
        minWidth: '226px',
        overflowWrap: 'break-word',
    },
    carouselAvatarImg : {
        width: 'inherit',
        border: 0,
        height: 'fit-content',
        objectFit : 'contain' ,
        '&:hover': {
            opacity: 0.55,
        }
    },
}));

export default function RecoRequestCard(props) {
    const { getRecoRequests } = props 
    const classes = useStyles()
    const [recoMessage, setRecoMessage] = useState('')
    const [openDialog, setOpenDialog] = useState(false);
    const [openMessage, setOpenMessage] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    console.log(props.request)
    const action = key => (
        <Fragment>
            <IconButton onClick={() => { closeSnackbar(key) }} size="small" style={{ color:'white' }}>
                <ClearIcon/>
            </IconButton>
        </Fragment>
    );

    const showMessage = (event) => {
        setAnchorEl(event.currentTarget);
        setOpenMessage(true)
    }
    const closeMessage = () => {
        setOpenMessage(false)
    }

    const handleOpenDialog = () => {
        setOpenDialog(true);
    }
    const handleCloseDialog = () => {
        setOpenDialog(false)
    }
    const handleClose = () => {
        console.log("removing request_id" + props.request.request_id)
        props.removeCard(props.request.request_id)
    }
    const handleChange=(event)=>{
        setRecoMessage(event.target.value)
    }

    const handleRecommend = () => {
        api.recommendations.submitRecommendation({
            target_user: props.request.from_user.profile.user_id,
            message: recoMessage
        })
            .then(res => {
                if (res.data.response_code === 200) {
                    setRecoMessage('')
                    enqueueSnackbar('Recommendation sucessfully submitted!',  { variant: "success", action } );
                    getRecoRequests();
                } else {
                    console.log("error submitting reco")
                    enqueueSnackbar('Error submitting recommendation',  { variant: "error", action } );

                }
            })
            .catch(err=>{
                console.log(err)
            })
        handleCloseDialog()
    }
    return (
        <div>
            <Card className={classes.card}>
            <Tooltip title="Delete Request" placement="bottom-start">
                <IconButton aria-label="settings" className={classes.close} size='small'>
                    <CloseIcon onClick={handleClose} fontSize="inherit" className={classes.close} />
                </IconButton>
                </Tooltip>
                <CardContent>
                    <Grid container justify="center" alignItems="center">
                        <Avatar className={classes.avatar} 
                        src={props.request && props.request.from_user && props.request.from_user.social && props.request.from_user.social.profile_image_link? props.request.from_user.social.profile_image_link : defaultImg} 
                        imgProps={{className: classes.carouselAvatarImg }}
                        onClick={()=> props.redirectProfile(props.request.from_user.profile
                            ? props.request.from_user.profile.user_id : null)}
                        />
                    </Grid>
                    <Grid container justify="center" alignItems="center">
                        <Box alignContent='center'>
                            <Typography
                                component="div"
                                variant="h6"
                                style={{ fontWeight: 'bold', lineHeight: 'inherit' }}
                                className={classes.inline}
                                color="textPrimary"
                            >
                                {props.request.from_user && props.request.from_user.social? props.request.from_user.profile.username: null}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" gutterBottom style={{ fontSize: 'medium' }}>
                                {props.request.from_user? props.request.from_user.job_title: null}
                                &nbsp;
                            </Typography>
                        </Box>
                    </Grid>
                </CardContent>
                <Divider style={{width: '100%', height: '2px', marginTop:'5px',marginBottom:'5px',}}/>
                <CardActions disableSpacing >
                    <Grid container justify="center" alignItems="center">
                        <Grid item xs={9}>
                        <Tooltip title="Write Recommendation" placement="bottom">
                            <Button color="primary" variant="outlined" className={classes.button} onClick={handleOpenDialog} size="small">
                                Recommend
                            </Button>
                            </Tooltip>
                        </Grid>
                        <Grid item xs={3}>
                        <Tooltip title="Open Message" placement="bottom-end">
                            <IconButton onClick={showMessage} disabled={props.request.message !== null && props.request.message.length > 0 ? false : true}>
                                <MessageIcon />
                            </IconButton>
                            </Tooltip>
                        </Grid>

                    </Grid>
                </CardActions>
            </Card>
            <Popover
                classes={{
                    paper: classes.paper,
                }}
                open={openMessage}
                onClose={closeMessage}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
            >
                <Typography style={{fontSize:20, fontWeight:'bold', paddingBottom:'2%'}}>
                    Message
                </Typography>
                <Typography variant="body2" style={{paddingBottom:'4%'}} >{props.request.message}</Typography>
            </Popover>
            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                //BackdropProps={{ invisible: true }}
                overlayStyle={{backgroundColor: 'transparent'}}
            //PaperProps ={{className :classes.paperbd}}

            >
                <DialogContent >
                <DialogContentText style={{ marginTop: 10, fontWeight:'bold' }}>
                        {`Endorse ${props.request.from_user.profile.first_name} for his/her interests and skills or simply share how the conversation went!`}
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="normal"
                        label="Recommendation"
                        multiline
                        rows="4"
                        fullWidth
                        onChange={handleChange}
                        variant="outlined"
                        maxLength = {2000}
                        required
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleRecommend} color="primary" autoFocus>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
            
        </div>
    )
}