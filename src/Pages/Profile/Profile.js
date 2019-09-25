import React from 'react'
import { Grid, Typography, Box } from '@material-ui/core'
function Profile() {
    return (
        <div>
            <Grid container >
                <Typography component="div">
                    <Box 
                        fontSize="h6.fontSize" 
                        m={1} 
                        letterSpacing={3}
                    >
                        Profile 
                    </Box>
                </Typography>
            </Grid>
        </div>
    )
}
export default Profile;
