import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Box } from '@material-ui/core'
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import SnackBar from '../../../Components/Snackbar'
import api from '../../../api'
import EditIcon from '@material-ui/icons/Edit';
import CircularLoading from '../../../Components/LoadingBars/CircularLoading'

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

}));


export default function ReadOnlyView(props) {
    const classes = useStyles();
    const [profileState, setProfileState] = React.useState({
        first_name: '',
        last_name: '',
        username: '',
        email: ''
    })
    const [isLoaded, setIsLoaded] = React.useState(false)

    //initialise
    useEffect(() => {
        console.log('useEffect')
        api.profile.get().then(res => {
            const { first_name, last_name, username, email } = res.data.profile
            setProfileState({
                first_name: first_name,
                last_name: last_name,
                username: username,
                email: email
            })
            setIsLoaded(true)
        }).catch(err => {
            console.log('error initialising w user details')
            setIsLoaded(true)
        })
    }, [])

    console.log(profileState)

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
                                    BASIC PROFILE
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
                    {isLoaded?
                    <Grid item style={{width: "100%", paddingLeft: '2.5%', paddingRight: '2.5%' }} xs={12}>

                        <form className={classes.form} >
                            <Grid container style={{ width: '85%', textAlign: 'left' }}>
                                <Grid container item xs={12} justify="space-between">
                                <Grid item xs={12} md={5}>
                                    <TextField
                                        label="First Name"
                                        value={profileState.first_name}
                                        className={classes.textField}
                                        margin="normal"
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                    />

                                </Grid>
                                <Grid item xs={12} md={5}>
                                    <TextField
                                        label="Last Name"
                                        value={profileState.last_name}
                                        className={classes.textField}
                                        margin="normal"
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                </Grid>
                                </Grid>
                                <Grid container item xs={12} justify="space-between">
                                <Grid item xs={12} md={5}>
                                    <TextField
                                        label="Email Address"
                                        value={profileState.email}
                                        className={classes.textField}
                                        margin="normal"
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                </Grid>

                                <Grid item xs={12} md={5}>
                                    <TextField
                                        label="Username"
                                        value={profileState.username}
                                        className={classes.textField}
                                        margin="normal"
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                </Grid>
                                </Grid>

                            </Grid>
                        </form>
                    </Grid>
                    :
                    <Grid container justify='center'>
                    <CircularLoading />     
                    </Grid>        
                    }
                </Grid>

            </div>
        </div>

    )
}


