import React from 'react';
import { Grid, Typography, Box } from '@material-ui/core'
import CurrentSkillsView from './CurrentSkillsView'

class Skills extends React.Component {
  
  render () {

  return(
    <div>
      <Typography component="div">
          <Box 
            fontSize="h5.fontSize" 
            m={3.5} 
            letterSpacing={3}
            fontWeight="fontWeightBold" 
          >
            SKILLS
          </Box>
      </Typography>

      <CurrentSkillsView />
    </div>
    
  );
}
}
export default Skills;
