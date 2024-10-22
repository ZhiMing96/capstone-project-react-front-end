import React from 'react';
import Button from '@material-ui/core/Button';
import { Link, Route, BrowserRouter, Switch } from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { doLogout } from "../redux/actions/auth";
import { connect } from "react-redux";
import { IconButton, Hidden } from '@material-ui/core';
import LogoutIcon from '@material-ui/icons/ExitToApp'


function Logout(props) {
    const [open, setOpen] = React.useState(false);
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const logout =()=>{
        
        handleClose();
        window.localStorage.clear(); //clear auth_token
        props.doLogout()
        props.handleLogout()
        window.location.reload()
    }
  
    return (
      <span>
        <Hidden xsDown>
          <Button variant="contained" color="primary" style={{marginLeft:10}} onClick={handleClickOpen} size='medium'> 
          Logout 
          </Button>
        </Hidden>
        <Hidden smUp>
          <IconButton variant="contained" color="primary" style={{marginLeft:10}} onClick={handleClickOpen} size='medium'>
            <LogoutIcon/>
          </IconButton>
        </Hidden>
        
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          
        >
          
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to logout?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={logout} color="primary" autoFocus>
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </span>
    );
}

export default connect(null, { doLogout }) (Logout)