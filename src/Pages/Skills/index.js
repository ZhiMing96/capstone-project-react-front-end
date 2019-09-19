import React from 'react';
import { Grid, Typography, Box } from '@material-ui/core'

function Skills() {
  return(
    <Grid container >
      <Typography component="div">
          <Box 
              fontSize="h6.fontSize" 
              m={1} 
              letterSpacing={3}
          >
              SKILLS 
          </Box>
      </Typography>
    </Grid>
  );
}

export default Skills;