import React, { useEffect, useState, useRef } from 'react'
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import { IconButton, Popover, Typography, Tooltip } from '@material-ui/core';
import Popper from '@material-ui/core/Popper';
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
    const inputEl = useRef(null)
    

    const showMessage = (event) => {
        console.log(event)
        console.log(event.currentTarget)
        setAnchorEl( event.currentTarget);
        setOpenMessage(true)
    }

    const closeMessage = () => {
        setOpenMessage(false)
        setAnchorEl(null)
    }

   

    return (
        <span>
            <IconButton  size="small" onClick={showMessage} >
                <HelpOutlineIcon className={classes.icon}/>
            </IconButton>
            <Popover
                classes={{
                    paper: classes.paper,
                }}
                open={openMessage}
                onClose={closeMessage}
                anchorEl={anchorEl}
                anchorReference="anchorOrigin"
                anchorReference="anchorEl"
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'start',
                    horizontal: 'left',
                }}
                
            >
            
                <Typography style={{fontSize:20, fontWeight:'bolder', paddingBottom:'2%'}}>
                    Latest Employment Details
                </Typography>
                <Typography style={{fontSize:15, fontWeight:400, paddingBottom:'0%'}} >
                    {jobDetails ? jobDetails.job_title :""} 
                </Typography>
                <Typography style={{fontSize:15, fontWeight:400, paddingBottom:'3%'}} >
                    {jobDetails ? jobDetails.company_name : "" } 
                </Typography>
                <Typography style={{fontSize:13, fontWeight:100, paddingBottom:'0%'}} >
                    {jobDetails ? jobDetails.description : ""} 
                </Typography>
                
                
                <Tooltip title="You Can Change it Later!" placement="right-start">
                    <Typography style={{width:'fit-content', fontSize:12, fontWeight:500}}>
                {/* Career Categories:  */}
                    {/* <u> */}
                        {jobDetails && jobDetails.job_category_1 ? jobDetails.job_category_1 + " " :""} 
                        {jobDetails && jobDetails.job_category_2 ? jobDetails.job_category_2 + " " :""}
                        {jobDetails && jobDetails.job_category_3 ? jobDetails.job_category_3 + " " :""}
                    {/* </u> */}
                    </Typography>
                </Tooltip>
            {/* </Popper> */}
            </Popover> 
        </span>
    )
}
