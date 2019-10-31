import React from 'react';
import clsx from 'clsx';
import { Grid, Typography, Box, Card, CardActions, CardContent, CardHeader, Avatar, IconButton, Collapse, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import PersonIcon from '@material-ui/icons/Person';
import TelegramIcon from '@material-ui/icons/Telegram';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles(theme => ({
    card: {
      width: '32%',
      textAlign: 'center',
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
        margin: 40,
        marginBottom: 20,
        marginTop:0,
        width: 90,
        height: 90,
    },
  }));

export default function Reco() {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
      setExpanded(!expanded);
    };

    return (
        <Grid container direction="row" style={{ width: '100%', textAlign: 'left' }}>
            <Grid item xs={12} md={12}>
                <Typography component="div" variant="h6" color="textPrimary" >
                    <Box
                        m={2}
                        letterSpacing={2}
                        textAlign='left'
                        flexGrow={1}
                    >

                        Pending Recommendation Requests
                    </Box>
                </Typography>
            </Grid>
            <Grid item container xs={12} md={12}>
                
                    <Card className={classes.card}>
                        {/*
                        <CardHeader
                            avatar={
                                <Avatar aria-label="recipe" className={classes.avatar}>
                                    
                                </Avatar>
                            }
                            action={
                                <IconButton aria-label="settings">
                                    <MoreVertIcon />
                                </IconButton>
                            }
                            title="Shrimp and Chorizo Paella"
                            subheader="September 14, 2016"
                        />
                        */}
                        <CardContent>
                            <Avatar className={classes.avatar} src="/static/images/avatar/1.jpg">

                            </Avatar>
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
                        </CardContent>
                        <CardActions disableSpacing>
                            {/*
                            <IconButton aria-label="add to favorites">
                                <FavoriteIcon />
                            </IconButton>
                            <IconButton aria-label="share">
                                <ShareIcon />
                            </IconButton>
                            */}
                            <Button size="small" color="primary" autofocus>
                                Accept
                            </Button>
                            <Button size="small" color="primary">
                                Decline
                            </Button>
                            <IconButton
                                className={clsx(classes.expand, {
                                    [classes.expandOpen]: expanded,
                                })}
                                onClick={handleExpandClick}
                                aria-expanded={expanded}
                                aria-label="show more"
                            >
                                <ExpandMoreIcon />
                            </IconButton>
                        </CardActions>
                        <Collapse in={expanded} timeout="auto" unmountOnExit>
                            <CardContent>
                                <Typography >Anything additional to add</Typography>
                            </CardContent>
                        </Collapse>
                    </Card>

                    </Grid>
                
        </Grid>

    )
}
