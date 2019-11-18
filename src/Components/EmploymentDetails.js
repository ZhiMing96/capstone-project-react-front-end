import React, { useEffect, useState } from 'react'
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import { IconButton, Popover, Typography, Tooltip } from '@material-ui/core';
import Popper from 'popper.js';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(1.5),
        width: '30%',
        maxWidth: 350,
        minWidth: '226px',
        overflowWrap: 'break-word',
    },
    icon : {
        width: 20,
        height: 20,
    },
}));

export default function EmploymentDetails(props) {
    const classes=useStyles();
    const { jobDetails } = props;
    const [openMessage, setOpenMessage ] = useState();
    const [ anchorEl, setAnchorEl ] = useState(null);

    const showMessage = (event) => {
        setAnchorEl(event.currentTarget);
        setOpenMessage(true)
    }

    const closeMessage = () => {
        setOpenMessage(false)
    }

    return (
        <span>
            <IconButton onClick={showMessage} size="small">
                <HelpOutlineIcon className={classes.icon} />
            </IconButton>
            <Popover
                classes={{
                    paper: classes.paper,
                }}
                open={openMessage}
                onClose={closeMessage}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
            >
                <Typography style={{fontSize:20, fontWeight:'bolder', paddingBottom:'2%'}}>
                    Latest Employment Details
                </Typography>
                <Typography style={{fontSize:15, fontWeight:400, paddingBottom:'0%'}} >
                    {jobDetails.job_title} 
                </Typography>
                <Typography style={{fontSize:15, fontWeight:400, paddingBottom:'3%'}} >
                    {jobDetails.company_name} 
                </Typography>
                <Typography style={{fontSize:13, fontWeight:100, paddingBottom:'0%'}} >
                    {jobDetails.description} 
                </Typography>
                
                
                <Tooltip title="You Can Change it Later!" placement="right-start">
                    <Typography style={{width:'fit-content', fontSize:12, fontWeight:500}}>
                {/* Career Categories:  */}
                    {/* <u> */}
                        {jobDetails.job_category_1 ? jobDetails.job_category_1 + " " :""} 
                        {jobDetails.job_category_2 ? jobDetails.job_category_2 + " " :""}
                        {jobDetails.job_category_3 ? jobDetails.job_category_3 + " " :""}
                    {/* </u> */}
                    </Typography>
                </Tooltip>

            </Popover> 
        </span>
    )
}
