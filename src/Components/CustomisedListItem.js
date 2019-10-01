
import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import { Grid, Typography, Box } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    
}));

export function CustomisedListItem(props) {
    const classes = useStyles();
    const [editState, setEditState] = React.useState(false)

    return(
        <div>
    <ListItem alignItems="flex-start" key={props.item.record_id}>
        <ListItemText
            primary={
                <Typography
                    component="div"
                    variant="h6"
                    style={{ fontWeight: 'bold', lineHeight: 'inherit' }}
                    className={classes.inline}
                    color="textPrimary"
                    gutterBottom

                >
                    {props.item.job_title}
                </Typography>
            }

            secondary={
                <React.Fragment>
                    <Typography
                        component="div"
                        variant="subtitle1"
                        className={classes.inline}
                        color="textPrimary"
                        gutterBottom
                        style={{ lineHeight: 'inherit' }}
                    >
                        {props.item.company_name} | {props.item.start_date} to {props.item.end_date}
                    </Typography>
                    <Typography
                        component="div"
                        variant="body2"
                        className={classes.inline}
                        color="textSecondary"
                    >
                        {props.item.description}
                    </Typography>
                </React.Fragment>
            }
        />
    </ListItem>
    {props.isLastItem? null:
    < Divider component="li" />}
    </div>
    )
}