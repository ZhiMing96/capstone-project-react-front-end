import React from 'react'
import { Grid, Typography, Box, Paper } from '@material-ui/core'

function Manage() {
    return (
        <div>
            <Grid container >
                <Typography component="div">
                    <Box 
                        fontSize="h6.fontSize" 
                        m={1} 
                        letterSpacing={3}
                    >
                        EDIT PROFILE 
                    </Box>
                </Typography>
            </Grid>
        </div>
    )
}
export default Manage;