import React from 'react';
import clsx from 'clsx';
import { Grid, Typography, Box, Card, CardActions, CardContent, CardHeader, Avatar, IconButton, Collapse, Button,Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import PersonIcon from '@material-ui/icons/Person';
import TelegramIcon from '@material-ui/icons/Telegram';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import RecoRequestCard from '../../Components/RecommendationRequestCard'

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        width:'100%'
      },
      paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      },
}));

export default function Reco() {
    const classes = useStyles();
    
    return (
        <div className ={classes.root}>
        <Grid container xs={12} md={12} style={{ marginTop: 20, marginBottom: 20 }}>
            <Typography component="div" variant="h6" color="textPrimary" >
                <Box
                    letterSpacing={1}
                    textAlign='left'
                    flexGrow={1}
                >
                    Pending Recommendation Requests
                    </Box>
            </Typography>
        </Grid>

        <Grid container direction="row" justify="space-evenly" alignItems="stretch" spacing={4}>
            <Grid item sm={3}>
                <Paper className={classes.paper}>



                </Paper>
            </Grid>
            <Grid item sm={3}>
                <Paper className={classes.paper}>xs=3</Paper>
            </Grid>
            <Grid item sm={3}>
                <RecoRequestCard />
            </Grid>
            <Grid item sm={3}>
                <Paper className={classes.paper}>xs=3</Paper>
            </Grid>
        </Grid>
        </div>
    )
}
