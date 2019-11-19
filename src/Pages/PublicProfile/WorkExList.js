import React, { useState, useEffect, useRef } from 'react';
import { Grid, Typography, Box, List, Badge, Fab, IconButton, Snackbar, Avatar, ListItemText, ListItem, Chip,Divider } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    avatar: {
        width: 120,
        height: 120,
        margin: 10
    },
    item: {
        paddingRight: theme.spacing(8),
        ['@media (min-width:920px)']: {
            paddingRight: theme.spacing(10)
        },
    },
}))

export default function WorkExList(props) {
    const classes = useStyles()
    console.log(props.list)

    return (
        <List >
            {props.list.map((experience, index) => {
                return (
                    <div>
                        <ListItem alignItems="flex-start" key={experience.record_id} className={classes.item} >
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
                                        {experience.job_title}
                                    </Typography>
                                }

                                secondary={
                                    <React.Fragment>
                                        <Typography
                                            component="div"
                                            variant="subtitle1"

                                            color="textPrimary"
                                            gutterBottom
                                            style={{ lineHeight: 'inherit' }}
                                        >
                                            {experience.company_name} | {experience.startDate} to {experience.endDate}
                                        </Typography>
                                        <Grid container wrap="nowrap">
                                            <Typography
                                                component="div"
                                                variant="body2"
                                                color="textSecondary"
                                                style={{ display: 'flex', flexWrap: 'wrap' }}
                                            >
                                                {experience.description}
                                            </Typography>
                                        </Grid>
                                        {experience.categories.map(val => (
                                            <Chip variant="outlined" label={val} style={{ margin: 4, padding: 2 }} size="small" />
                                        ))}

                                    </React.Fragment>
                                }
                            />
                        </ListItem>
                        < Divider component="li" />
                    </div>
                )
            })}
        </List>)
}