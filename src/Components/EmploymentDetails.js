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
        padding:'1%'
    },
    icon : {
        width: 20,
        height: 20,
    },
}));

export default function EmploymentDetails(props) {
    const classes=useStyles();
    const { jobDetails, username } = props;
    const [openMessage, setOpenMessage ] = useState(false);
    const [ anchorEl, setAnchorEl ] = useState(null);
    const inputEl = useRef(null)
    

    const showMessage = (event) => {
        console.log("ENTERED show Message in employmentDetails.js")
        event.preventDefault();
        console.log(event)
        console.log(event.currentTarget)
        console.log(event.relatedTarget)
        const anchor = event.currentTarget
        setAnchorEl(anchor );
        setOpenMessage(true)
    }

    const closeMessage = () => {
        console.log("ENTERED closeMessage in employmentDetails.js")
        setOpenMessage(false)
        // setAnchorEl(null)
    }

    useEffect(()=>{
        if(props.openMessage) {
            setOpenMessage(true)
        }

    },[props])

    console.log("PRINTING FKIN ANCHOR EL")
    console.log(anchorEl)
    console.log(props.anchorEl)
    console.log(jobDetails)
    return (
        <span>
            {!props.buttonExist
            ?
            <IconButton  size="small" onClick={showMessage} >
                <HelpOutlineIcon className={classes.icon}/>
            </IconButton>
            : <span></span>
            }
            
            <Popover
                classes={{
                    paper: classes.paper,
                }}
                open={openMessage}
                onClose={props.handleCloseEmploymentDetails ? props.handleCloseEmploymentDetails : closeMessage}
                anchorEl={props.anchorEl ? props.anchorEl : anchorEl }
                anchorReference= {"anchorOrigin"}
                anchorReference= { "anchorOrigin"}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'start',
                    horizontal: 'left',
                }}
                // anchorPosition = { props.useAnchorPosition ? { top: 150 , left: 500 }  : '' }
                
            >
            
                <Typography style={{fontSize:20, fontWeight:'bolder', paddingBottom:'2%'}}>
                    Latest Employment Details For {username}
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
                
                
                {/* <Tooltip title="You Can Change it Later!" placement="right-start">
                    <Typography style={{width:'fit-content', fontSize:12, fontWeight:500}}>
                
                        {jobDetails && jobDetails.job_category_1 ? jobDetails.job_category_1 + " " :""} 
                        {jobDetails && jobDetails.job_category_2 ? jobDetails.job_category_2 + " " :""}
                        {jobDetails && jobDetails.job_category_3 ? jobDetails.job_category_3 + " " :""}
                  
                    </Typography>
                </Tooltip> */}
            </Popover> 
        </span>
    )
}
