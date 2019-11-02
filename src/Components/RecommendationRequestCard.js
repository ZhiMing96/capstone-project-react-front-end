import React from 'react';
import { Grid, Typography, Box, Card, CardActions, CardContent, CardHeader, Avatar, IconButton, Collapse, Button, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(theme => ({
    card: {
        height: '100%',
        textAlign: 'center',
        alignItems:'center',
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
        margin:theme.spacing(1),
    },
    button:{
        margin:theme.spacing(2),
        marginTop:0
    }
}));

export default function RecoRequestCard(props) {
    const classes = useStyles();

    const handleClose=()=>{
        //remove the request what to do for API here ah
    }

    const handleRecommend=()=>{
        //
    }
    return (
        <Card className={classes.card}>
            <IconButton aria-label="settings" className={classes.close} size='small'>
                <CloseIcon onClick={handleClose} size='small' className={classes.close} />
            </IconButton>
            <CardContent>
                <Grid container justify="center" alignItems="center">
                    <Avatar className={classes.avatar} src={null} />
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
                        <Typography variant="body2" color="textSecondary" gutterBottom style={{fontSize:'medium'}}>
                            graphic designer
                            </Typography>
                    </Box>
                </Grid>
            </CardContent>
            <CardActions disableSpacing >
            <Grid container justify="center" alignItems="center">
                <Button color="primary" variant="outlined" className={classes.button} fullWidth onClick={handleRecommend}>
                    Recommend           
                </Button>
                </Grid>
            </CardActions>
        </Card>
    )
}