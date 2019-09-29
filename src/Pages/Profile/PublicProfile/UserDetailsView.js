import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Box } from '@material-ui/core'
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import { Link as RouterLink } from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';
import Container from '@material-ui/core/Container';
import { connect } from "react-redux";
import { updateProfile } from '../../../redux/actions/profile'
import SnackBar from '../../../Components/Snackbar'
import api from '../../../api'

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
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(5, 0, 2),
  },
  error: {
    textAlign: 'left !important' //cannot lol
  },
  button: {
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(-0.5),
  },
  leftIcon: {
    marginRight: theme.spacing(1),
  },

}));


function UserDetailsView(props) {
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
  const [submitState, setSubmit] = React.useState(false)
  const [emailValid, setEmailValid] = React.useState(true)
  const [snackBarMessage, setSnackBarMessage] = React.useState('')
  const [snackBarVariant, setSnackBarVariant] = React.useState('')

  const handleSubmit = (event) => {
    setSubmit(true) //render email validation error if present
    event.preventDefault()
    if (emailValid) {
      api.profile.update(profileState)
        .then(res => {
          if (res.data.response_code === 200) {
            console.log('success')
            setSnackBarVariant('success')
            setSnackBarMessage('Details saved successfully.')
            props.updateProfile(profileState) //update store
          } else {
            console.log('error')
            setSnackBarVariant('error')
            setSnackBarMessage('Error saving details.')
          }
        }).catch(console.log('error'))
    }
  }
  const handleChange = name => (event) => {
    setProfileState({ ...profileState, [name]: event.target.value });
    if (name === 'email') {
      setEmailValid(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(event.target.value));
    }
  }

  const handleClose = () => {
    setSnackBarMessage('');
  };

  return (
    <div>
      <CssBaseline />
      <div className={classes.paper}>

        <Grid container direction="row" style={{ width: '100%' , textAlign:'left'}}>
          <Grid item xs={12} md={12}>
            <Typography component="div">
              <Box display="flex" alignItems="flex-start">
                <Box
                  fontSize="h6.fontSize"
                  m={2}
                  letterSpacing={2}
                  textAlign='left'
                  flexGrow={1}
                >

                  EDIT PROFILE
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

            <form className={classes.form} onSubmit={(event) => { handleSubmit(event) }}>
              <Grid container spacing={2} style={{ width:'100%', justify:'center'}}>
                <Grid item xs={12} sm={6}>
                  <TextField

                    variant="outlined"
                    required
                    id="firstName"
                    label="First Name"
                    value={profileState.first_name}
                    autoFocus
                    onChange={handleChange('first_name')}

                  />
                </Grid>
                <Grid item xs={12} sm={6} >
                  <TextField
                    variant="outlined"
                    required
                    id="lastName"
                    label="Last Name"
                    value={profileState.last_name}
                    name="lastName"
                    onChange={handleChange('last_name')}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    error={submitState && !emailValid}
                    variant="outlined"
                    required
                    id="email"
                    label="Email Address"
                    name="email"
                    value={profileState.email}
                    onChange={handleChange('email')}
                  />
                  {submitState && !emailValid &&
                    <Typography variant="caption" style={{ color: "red" }} className={classes.error}>
                      Email address is invalid
              </Typography>
                  }

                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    required
                    id="username"
                    label="Username"
                    name="username"
                    value={profileState.username}
                    onChange={handleChange('username')}
                  />
                </Grid>

              </Grid>
              <Grid container style={{alignContent:'center'}}>
              <Button 
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submit}
                style={{alignSelf:'center'}}
                size='large'
              >
                Save
              </Button>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </div>
      <SnackBar
        open={snackBarMessage !== ''}
        handleClose={handleClose}
        variant={snackBarVariant}
        message={snackBarMessage}
      />
    </div>

  )
}


export default connect(null,
  { updateProfile }
)(UserDetailsView);