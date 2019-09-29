import React from 'react'
import { Grid, Typography, Box } from '@material-ui/core'
import UserDetailsView from './UserDetailsView'
import ReadOnlyView from './ReadOnlyView'

function Profile() {
    const [editState, setEditState] = React.useState(false)

    const changeState = ()=>{
        const currentState = editState
        setEditState(!currentState)
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

            { editState? <UserDetailsView changeState={changeState}/>: <ReadOnlyView changeState={changeState}/>}
        </div>
    )
}
export default Profile;
