import React from 'react'
import { Grid, Typography, Box } from '@material-ui/core'
import UserDetailsView from './UserDetailsView'
import ReadOnlyView from './ReadOnlyView'
import Work from './Work'
import WorkWithDatepicker from './WorkWithDatepicker'
import SnackBar from '../../../Components/Snackbar'

function Profile() {
    const [editProfileState, setEditProfileState] = React.useState(false)
    const [snackBarMessage, setSnackBarMessage] = React.useState('')
  const [snackBarVariant, setSnackBarVariant] = React.useState('')

    const changeProfileState = ()=>{
        const currentState = editProfileState
        setEditProfileState(!currentState)
    }
    const handleClose =()=> {
        setSnackBarMessage('');
      };


    const handleSnackBarMessage =(m)=> {
        setSnackBarMessage(m)
    }

    const handleSnackBarVariant= (v)=>{
        setSnackBarVariant(v)
    }

    return (
        <div>
            <Typography component="div">
                <Box
                    fontSize="h5.fontSize"
                    m={3.5}
                    letterSpacing={3}
                    fontWeight="fontWeightBold"
                >
                    PROFILE
              </Box>
            </Typography>

            { editProfileState? <UserDetailsView changeState={changeProfileState} handleSnackBarMessage={handleSnackBarMessage} handleSnackBarVariant={handleSnackBarVariant}/>: 
            <ReadOnlyView changeState={changeProfileState} />}
            <br/>
            <WorkWithDatepicker />
            
            <SnackBar
            open={snackBarMessage !== ''}
            handleClose={handleClose}
            variant={snackBarVariant}
            message={snackBarMessage}
          />
        </div>
    )
}
export default Profile;
