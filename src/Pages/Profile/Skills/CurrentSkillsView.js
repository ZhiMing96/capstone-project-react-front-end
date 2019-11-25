import React,{Fragment} from 'react';
import { Grid, Typography, Box, Button,IconButton } from '@material-ui/core'
import api from '../../../api.js'
import { withStyles,makeStyles } from '@material-ui/core/styles';
import AddSkills from './AddSkills'
import CustomisedCurrentSkillsChip from '../../../Components/CustomisedCurrentSkillsChip'
import { connect } from "react-redux";
import {addSkill, removeSkill,updateSkill , updateSuggestedSkills} from '../../../redux/actions/skill'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { withSnackbar } from 'notistack';
import ClearIcon from '@material-ui/icons/Clear'

const styles = theme => ({
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
})


class CurrentSkillsView extends React.Component {
  constructor(props) {
    super(props);
    this.handleRemove = this.handleRemove.bind(this);
    this.remove = this.remove.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.state = { 
      openDialog: false,
      message: '',
      skill:{}

    };
  }
  
  componentDidMount(){
    api.skills.get().then(res=>{
      if (res.data.response_code===200){
        console.log(res.data.skill_list)
        res.data.skill_list.forEach(skill=>{
          skill.id=parseInt(skill.id)
        })
        this.props.updateSkill(res.data.skill_list) //return array
      }
    }).catch()
  }

  handleClose () {
    this.setState({openDialog:false})
  };

  setOpen(skillName){
    const message = 'Confirm removing '+ skillName + ' from skills?'
    this.setState({openDialog:true, message: message})
  }

  handleRemove(skill, event) {
    const skillName = skill.skill
    event.preventDefault()
    console.log("Skill to remove: " + skillName)
    this.setOpen(skillName)
    this.setState({
      skill: skill
    })
  }

  async remove(){ 
    this.handleClose()
    const action = key => (
      <Fragment>
          <IconButton onClick={() => { this.props.closeSnackbar(key) }} size="small" style={{ color:'white' }}>
              <ClearIcon/>
          </IconButton>
      </Fragment>
    );
    const skill = this.state.skill
    const skillName = skill.skill
    api.skills.remove({ "skill_remove": skillName })
      .then((response) => {
        console.log(response.data.response_code)

        if (response.data.response_code === 200) {
          this.props.enqueueSnackbar(skillName + ' removed from your skills', { variant: "success", action })
          this.props.removeSkill(skill) //redux
          api.skills.get().then(res=>{
            if (res.data.response_code===200){
              res.data.skill_list.forEach(skill=>{
                skill.id=parseInt(skill.id)
              })
              this.props.updateSkill(res.data.skill_list) //return array
              api.skills.suggested().then(res=>{
                if (res.data.response_code===200){
                  console.log('200')
                  res.data.suggested_skills.forEach(skill=>{
                    skill.skill.id=parseInt(skill.id)
                    
                  })
                  this.props.updateSuggestedSkills(res.data.suggested_skills) //return array
                  
                }
              }).catch()
            }
          })
          

        } else if (response.data.response_code === 400) {
          this.props.enqueueSnackbar(response.data.response_message, { variant: "error", action })

        } else {
          this.props.enqueueSnackbar('Error in removing skill', { variant: "error", action })

        }

      })
      .catch(error => {
        console.log(error)
        this.props.enqueueSnackbar('System error', { variant: "error", action })
      })

  };
  

  render() {
    const { classes } = this.props;
    
    return (
      <div>
        <div className={classes.paper}>
          <Grid container direction="row" style={{ width: '100%' }}> {/*for your skills and search box and delete icon*/}
            <Grid item xs={12} md={12}>
              <Typography component="div">
                <Box
                  fontSize="h6.fontSize"
                  m={2}
                  letterSpacing={2}
                  textAlign='left'
                  color="primary.main"
                  fontWeight="fontWeightBold"
                >

                  YOUR SKILLS
              </Box>
              </Typography>
            </Grid>

            <Grid item style={{ width: '100%', paddingLeft: '2.5%', paddingRight: '2.5%', marginTop: '24px' }}>
              <AddSkills />
            </Grid>

          </Grid>

          <Grid container style={{ padding: '2.5%', display: 'flex', justifyContent: 'center', flexWrap: 'wrap', }}>
            {
              this.props.currentSkills.map(skill => (<CustomisedCurrentSkillsChip skill={skill} handleRemove={this.handleRemove} />))
            }
          </Grid>

        </div>
        <Dialog
          open={this.state.openDialog}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          BackdropProps={{ invisible:true }}
          //PaperProps ={{className :classes.paperbd}}
          
        >
          
          <DialogContent >
            <DialogContentText id="alert-dialog-description">
              {this.state.message}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.remove} color="primary" autoFocus>
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
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
  { addSkill, removeSkill, updateSkill, updateSuggestedSkills }
)(withSnackbar (withStyles(styles, { withTheme: true}) (CurrentSkillsView)));