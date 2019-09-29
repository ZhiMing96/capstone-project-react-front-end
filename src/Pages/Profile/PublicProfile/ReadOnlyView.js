import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Box } from '@material-ui/core'
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import SnackBar from '../../../Components/Snackbar'
import api from '../../../api'
import EditIcon from '@material-ui/icons/Edit';

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
        width: 200,
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
        }).catch(err => {
            console.log('error initialising w user details')
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
                            <Box display="flex"  alignItems="flex-start">
                                <Box
                                    fontSize="h6.fontSize"
                                    m={2}
                                    letterSpacing={2}
                                    textAlign='left'
                                    flexGrow={1}
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

                    <Grid item style={{ marginLeft: '2.5%', marginRight: '2.5%' }}>

                        <form className={classes.form} >
                            <Grid container spacing={2} style={{ width:'100%', textAlign:'left'}}>
                                <Grid item xs={12} sm={6}>
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
                                <Grid item xs={12} sm={6}>
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

                                <Grid item xs={12} sm={6}>
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

                                <Grid item xs={12} sm={6}>
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
                        </form>
                    </Grid>
                </Grid>
            </div>
        </div>

    )
}


