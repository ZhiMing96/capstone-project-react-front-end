import React, { useState, useEffect, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu'
import DefaultImgLink from '../../images/defaultImgLink.svg'
import Logo from '../../images/logo.png'
import { Avatar, IconButton, Grid } from '@material-ui/core';
import { Link, Route, BrowserRouter, Switch } from 'react-router-dom';
import EventsIcon from '@material-ui/icons/InsertInvitation';
import ArticlesIcon from '@material-ui/icons/MenuBook';
import JobsIcon from '@material-ui/icons/BusinessCenter';
import TelegramIcon from '@material-ui/icons/Telegram';

const useStyles = makeStyles(theme => ({
  list: {
    width: 250,
    textAlign:'-webkit-center',
  },
  fullList: {
    width: 'auto',
  },
  avatar : {
    width: 70, 
    height: 70,
    marginTop: '10%',
  },
  button: {
    margin: theme.spacing(1.5),
    width: 165,
    height: 45
  },
}));

const navArray = [
    {
      name: "JOBS",
      url: "/jobs",
      icon: <JobsIcon style={{ marginRight:'10%' }}/>,
    },
    {
      name: "EVENTS",
      url: "/events",
      icon: <EventsIcon style={{ marginRight:'10%' }}/>,
    },
    {
      name: "ARTICLES",
      url: "/articles",
      icon: <ArticlesIcon style={{ marginRight:'10%' }}/>,
    },
  ]

export default function TemporaryDrawer() {
    const classes = useStyles();
    const [ open, setOpen ] = useState(false);

//   const toggleDrawer = (side, open) => event => {
//     if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
//       return;
//     }

    const toggleDrawer = () => {
        setOpen(!open)
    }

  return (
    <div>
      <IconButton onClick={() => toggleDrawer()}>
        <MenuIcon/>
      </IconButton>
      <Drawer open={open} onClose={() => toggleDrawer()}>
        <div
        className={classes.list}
        onClick={() => toggleDrawer()}
        onKeyDown={() => toggleDrawer()}>
            <div style={{ height:'11vh', backgroundColor:'white'}}>
                <Link to="/" >
                  <img src={Logo} style={{width:130, marginBottom:-7 }}/>
                </Link>
            </div>
            <Avatar
             src={DefaultImgLink}
             className={classes.avatar}
            />

            <Grid container justify="center" style={{marginTop:20}}>
                {navArray.map((item, index) => (
                    <div key={index}>
                    <Button
                        variant="outlined"
                        className={classes.button}
                        component={Link}
                        to={item.url}
                    >
                        {item.icon}
                        {item.name}
                    </Button>
                    </div>
                ))}
            </Grid>
            <Button
                variant="outlined"
                className={classes.button}
                // component={Link}
                href={"https://telegram.me/testing20190820_bot"}
                target="_blank"
            >
                <TelegramIcon />
                Telegram
            </Button>
        </div>
      </Drawer>
    </div>
  );
}