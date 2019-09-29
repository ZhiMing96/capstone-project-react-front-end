import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Typography, Box } from '@material-ui/core'
import api from '../../../api.js'
import SnackBar from '../../../Components/Snackbar'
import { makeStyles } from '@material-ui/core';
import AddSkills from './AddSkills'
import CustomisedChip from '../../../Components/CustomisedChip'
import { connect } from "react-redux";
import {addSkill, removeSkill,updateSkill} from '../../../redux/actions/skill'

class CurrentSkillsView extends React.Component {
  constructor(props) {
    super(props);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.state = {
      message: '',
      variant: '',
    }
  }

  async handleRemove(skill, event) {
    const skillName = skill.skill
    event.preventDefault()
    console.log("Skill to remove: " + skillName)
    await api.skills.remove({ "skill_remove": skillName })
      .then((response) => {
        console.log(response.data.response_code)

        if (response.data.response_code === 200) {
          this.setState({ variant: 'success' })
          this.setState({ message: skillName + ' removed from your skills.' })
          this.props.removeSkill(skill) //redux

        } else if (response.data.response_code === 400) {
          this.setState({ variant: 'error' })
          this.setState({ message: response.data.response_message })

        } else {
          this.setState({ variant: 'error' })
          this.setState({ message: 'Error in removing skill.' })

        }

      })
      .catch(error => {
        this.setState({ variant: 'error' })
        this.setState({ message: 'Error in removing skill.' })

      })

  };

  handleClose(reason) {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ message: '' })

  };

  render() {
    const { classes } = this.props;
    this.props.updateSkill()
    return (
      
      <div>
        <Grid container direction="row" style={{ width: '100%' }}> {/*for your skills and search box and delete icon*/}
          <Grid item xs={12} md={12}>
            <Typography component="div">
              <Box
                fontSize="h6.fontSize"
                m={2}
                letterSpacing={2}
                textAlign='left'
              >

                YOUR SKILLS
              </Box>
            </Typography>
          </Grid>

          <Grid item style={{ width: '100%', paddingLeft: '2.5%', paddingRight: '2.5%' }}>
            <AddSkills />
          </Grid>

        </Grid>

        <Grid container style={{ padding: '2.5%', display: 'flex', justifyContent: 'center', flexWrap: 'wrap',}}>
          { 
            this.props.currentSkills.map(skill => (<CustomisedChip skill={skill} handleRemove={this.handleRemove}/>))
          }
        </Grid>

        <SnackBar
          open={this.state.message !== ''}
          handleClose={this.handleClose}
          variant={this.state.variant}
          message={this.state.message}
        />


      </div>

    );
  }
}

const mapStateToProps = state => {
  return { 
    currentSkills: state.skill.skills,
   }
  
};
 
export default connect(
  mapStateToProps,
  { addSkill, removeSkill, updateSkill }
)(CurrentSkillsView);
