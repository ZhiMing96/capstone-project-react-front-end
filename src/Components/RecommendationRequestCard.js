import React from 'react';
import clsx from 'clsx';
import { Grid, Typography, Box, Card, CardActions, CardContent, CardHeader, Avatar, IconButton, Collapse, Button, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import PersonIcon from '@material-ui/icons/Person';
import TelegramIcon from '@material-ui/icons/Telegram';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(theme => ({
    card: {
        height: '100%',
        textAlign: 'center',
        alignItems:'center'
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 0,
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        marginBottom: 20,
        width: 100,
        height: 100,
    },
    close:{
        float:"right",
    },
    button:{
        margin:theme.spacing(2),
    }
}));

export default function RecoRequestCard() {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const [onHover, setOnHover] = React.useState(false)

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleClose=()=>{
        //remove the request what to do for API here ah
    }

    const handleHover=()=>{
        setOnHover(!onHover)
    }

    return (
        <Card className={classes.card} onMouseEnter={handleHover} onMouseLeave={handleHover}>
            
            <CardContent>
                
                <IconButton aria-label="settings" className={classes.close} >
                        <CloseIcon onClick={handleClose} size='small' />
                </IconButton>
                
                
                <Grid container justify="center" alignItems="center">
                    <Avatar className={classes.avatar} src="/static/images/avatar/1.jpg" />
                </Grid>
                <Grid container justify="center" alignItems="center">
                    <Box alignContent='center'>
                        <Typography
                            component="div"
                            variant="h6"
                            style={{ fontWeight: 'bold', lineHeight: 'inherit' }}
                            className={classes.inline}
                            color="textPrimary"
                        >
                            Hello world
                            </Typography>
                        <Typography variant="body2" color="textSecondary" gutterBottom>
                            graphic designer
                            </Typography>
                    </Box>
                </Grid>
            </CardContent>
            <CardActions disableSpacing >
            <Grid container justify="center" alignItems="center">
                <Button size="small" color="primary" variant="outlined" className={classes.button} fullWidth>
                    Accept           
                </Button>
                </Grid>
            </CardActions>
        </Card>
    )
}