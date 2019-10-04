import React, { Fragment, useState, useEffect, useRef } from 'react'
import { Grid, Typography, Box, Button, CssBaseline, Paper,Snackbar, ButtonBase, IconButton, createMuiTheme, Hidden} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import {Bookmark as BookmarkIcon, Schedule as ScheduleIcon, Done as DoneIcon, NearMe as NearMeIcon, Event as EventIcon, Room as LocationIcon, PriorityHigh as PriorityHighIcon} from '@material-ui/icons';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import { typography } from '@material-ui/system';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { ThemeProvider } from '@material-ui/styles';

const defaultIcon ="https://render.fineartamerica.com/images/rendered/default/print/7.875/8.000/break/images-medium-5/office-building-icon-vector-sign-and-symbol-isolated-on-white-background-office-building-logo-concept-urfan-dadashov.jpg";  

const theme = createMuiTheme({
    overrides: {
      MuiPaper: {
          elevation24:{
            // backgroundColor: 'rgba(0,0,0,0.2)',
            boxShadow: 'none'
          }
      },
      MuiBackdrop: {
          root:{
              backgroundColor: 'rgba(0, 0, 0, 0.05)'
          }
      }
    }
  });

//   const theme = createMuiTheme({
//     shadows: ["none"],
//     boxShadow: ["none"],
//     elevation: 0
//   });

const useStyles = makeStyles(theme => ({
    '@global': {
        body: {
          backgroundColor: theme.palette.common.white,
        },
      },
    root: {
      flexGrow: 1,
      width: '100%',
      maxWidth: 360,
      backgroundColor: 'rgba(0,0,0,0.2)'
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      margin: 20,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    image: {
        width: 'auto',
        height: 'auto',
        
      },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
    close: {
        padding: theme.spacing(0.5),
    },
    smallIcons: {
        width: 15,
        height: 12,
        margin: 2,
    },
    paperbd:{
        boxShadow: 'none'
      }
  }));



function Bookmarks() {
    const classes = useStyles();
    const [bookmarks, setBookmarks] = useState([]);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const queueRef = useRef([]);
    const [messageInfo, setMessageInfo] = useState(undefined);
    const [state, setState] = useState({
        id:"",
        index:null,
        job_data:{},
    })

    function getBookmarks() {
        const token = window.localStorage.getItem('authToken');
        console.log(token);
        const options ={
            headers: {"Authorization" : "Token " + token}
        }
        //axios.get('https://api.mycareersfuture.sg/v2/jobs?search=Business%20Analyst&limit=5&page=0&sortBy=new_posting_date')
        axios.get('http://localhost:3000/jobs/bookmarks/all',{headers: {"Authorization":"Token " + token}})
        .then(response=>{
            console.log(response);
            const data = response.data
            console.log(data.bookmark_list)
            const list = data.bookmark_list
            setBookmarks(list);
        })
        .catch(err=>{
            console.error(err)
        })
    }

    
    useEffect(() => {
        getBookmarks();
    },[])

    const getDate =(date) => {
        const list = date.split('-')
        const month= list[1];
        switch(month) {
            case "1":
                return (`${list[2]} Jan ${list[0]}`)
            case "2":
                return (`${list[2]} Feb ${list[0]}`)
            case "3":
                return (`${list[2]} Mar ${list[0]}`)
            case "4":
                return (`${list[2]} Apr ${list[0]}`)
            case "5":
                return (`${list[2]} May ${list[0]}`)
            case "6":
                return (`${list[2]} Jun ${list[0]}`)
            case "7":
                return (`${list[2]} Jul ${list[0]}`)
            case "8":
                return (`${list[2]} Aug ${list[0]}`)
            case "9":
                return (`${list[2]} Sep ${list[0]}`)
            case "10":
                return (`${list[2]} Oct ${list[0]}`)
            case "11":
                return (`${list[2]} Nov ${list[0]}`)
            case "12":
                return (`${list[2]} Dec ${list[0]}`)
        }
    }

    const lackingSkills = [
        'Account Management', 
        'Business Development', 
        'Customer Service'
    ]


    const processQueue = () => {
        if (queueRef.current.length > 0) {
            setMessageInfo(queueRef.current.shift());
            setOpenSnackbar(true);
        }
    };

    const handleClick = () => {
        console.log("Entered SnackBar open")
        setOpenDialog(false);
        console.log("id= "+state.id +" and index= "+ state.index);
        deleteBookmark();

        const message = `${state.job_data.title} Deleted from bookmarks!`
        queueRef.current.push({
            message,
            key: new Date().getTime(),  
        });
        if (openSnackbar) {
            // immediately begin dismissing current message
            // to start showing new one
            setOpenSnackbar(false);
        } else {
            processQueue();
        }
    };

    function deleteBookmark(){
        console.log("ENTERED DELETE BOOKMARKS METHOD");
        console.log("index = "+ state.index) ;
        var updatedList = [];

        if(state.index===(bookmarks.length-1)){
             updatedList = [...bookmarks.slice(0,state.index)]

        } else {
             updatedList = [...bookmarks.slice(0,state.index),...bookmarks.slice(state.index+1,bookmarks.length)]
        }
       

        
        console.log("after remove = ");
        console.log(updatedList);
        const token = window.localStorage.getItem('authToken');

        const options ={
            headers: {"Authorization" : "Token " + token}
        }
        axios.post('http://localhost:3000/jobs/bookmarks/remove',{
                "bookmark_id": state.id //to be implemented
        }, options)
        .then(response => {
            console.log(response)
            if(response.data.response_code == '200'){
                setBookmarks(updatedList);
                console.log('bookmark deleted successfully')
            }
        })
        .catch(err => {
            console.error(err)
        })
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    const handleExited = () => {
        processQueue();
    };
    
    const handleClickOpen = (bookmark,bookmark_id, position) =>{
        setState({...state,
            id: bookmark_id,
            index: position,
            job_data: bookmark,
        })
        setOpenDialog(true);
        console.log(state);

    }
    const handleClickClose = () =>{
        setOpenDialog(false);
    }

    return (
        <ThemeProvider theme={theme}> 
        <span>
            <CssBaseline />
            <Typography>
                <Box letterSpacing={3} fontWeight="fontWeightBold" style={{marginTop:30, fontSize:24}}>
                    BOOKMARKS
                </Box>
            </Typography>
            
            <Grid container style={{marginTop:20}}>
                <Grid item xs={12}> 
                    {bookmarks
                    ? bookmarks.map((list,index) => (
                        <div key={index}>
                            <Paper className={classes.paper} elevation={2}>
                                <Box display="flex" flexWrap="wrap">
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={2}>
                                            <Box display={{ xs: 'none', sm: 'block' }} >
                                                <ButtonBase className={classes.image} href={list.job_data.metadata.jobDetailsUrl} target="_blank" style={{padding:15}}>
                                                    {list.job_data.postedCompany && list.job_data.postedCompany.logoUploadPath
                                                    ? <img className={classes.img} src={list.job_data.postedCompany.logoUploadPath} />
                                                    : <img className={classes.img} src={defaultIcon} />
                                                    }
                                                </ButtonBase>
                                            </Box>
                                        </Grid>
                                        <Grid item container xs={12} sm={9} md={10}>
                                            <Grid item xs={10} md={9}>
                                                <Grid item xs>
                                                    <Typography> 
                                                        <Box fontSize={12}  fontWeight="fontWeightBold" align="left"  style={{marginLeft:10}} >
                                                            { list.job_data.postedCompany 
                                                                ? 
                                                                <a href={list.job_data.metadata.jobDetailsUrl} target="_blank" style={{textDecoration:"none", color:"inherit"}}>
                                                                    {list.job_data.postedCompany.name}
                                                                </a>
                                                                : ""
                                                            }
                                                        </Box>
                                                    </Typography>
                                                    <Typography>
                                                        <Box fontWeight="fontWeightBold" align="left"  style={{marginLeft:10, color:'#5E2CA5'}}>
                                                            {list.job_data.title}
                                                        </Box>
                                                    </Typography>
                                                    <Typography style={{fontSize:12}}>
                                                        <Box align="left" style={{marginLeft:10, color:'#9F0D6E'}} display={{ 'xs':'none', 'sm':'block'}} >
                                                            {
                                                            list.job_data.address.postalCode != ""
                                                            ? 
                                                            <Grid container alignItems="flex-start">
                                                                <Grid item>
                                                                    <LocationIcon style={{width:15, height:15}} /> 
                                                                </Grid>
                                                                <Grid item>
                                                                    {list.job_data.address.block} {list.job_data.address.street} S{list.job_data.address.postalCode}
                                                                </Grid>
                                                            </Grid>
                                                            : ""
                                                            }
                                                        </Box>
                                                    </Typography>
                                                    <Typography variant="caption" display="inline" >
                                                        <Box align="left" style={{marginLeft:10}}>
                                                            <Grid container md={6} sm={7} xs={12} alignItem="flex-start" justify="flex-start" > 
                                                                <Grid item sm={4} xs={5} container> <NearMeIcon className={classes.smallIcons} /> {list.job_data.address.districts[0].region} 
                                                                </Grid>
                                                                <Grid item sm={4} xs={6} container justify="flex-start"> <ScheduleIcon className={classes.smallIcons}/> {list.job_data.employmentTypes[0].employmentType}
                                                                </Grid>
                                                                <Grid item sm={4} xs={6} container justify="flex-start"> 
                                                                <EventIcon className={classes.smallIcons} /> {list.job_data.minimumYearsExperience} years exp
                                                                </Grid>
                                                            </Grid>
                                                            
                                                        </Box>
                                                    </Typography>
                                                    <Typography variant="caption" >
                                                        <Box align="left" style={{marginLeft:10}}>
                                                            Competition Level: 
                                                        </Box>
                                                    </Typography>

                                                    <Typography variant="body2">
                                                        <Box align="left" style={{marginLeft:10, fontSize:12}}>
                                                            Expiry Date: {getDate(list.job_data.metadata.expiryDate)}
                                                        </Box>
                                                    </Typography>
                                                    <Typography variant="body2" >
                                                        <Box align="left" style={{fontSize:12, marginTop:5}} alignItems="flex-start" display={{'xs':'none', 'sm':'block'}}>
                                                            <Grid container alignItems="flex-start" style={{marginLeft:9}}>
                                                                <Grid item>
                                                                    <PriorityHighIcon className={classes.smallIcons} style={{margin:0, width:15, height:14}}/>
                                                                </Grid>
                                                                <Grid item>
                                                                    Lacking Skills:&nbsp;
                                                                </Grid>
                                                                {lackingSkills.map((skill)=>(
                                                                    <div key={skill}>
                                                                        <Grid item>
                                                                            {skill} &nbsp;
                                                                        </Grid>
                                                                    </div>
                                                                ))}
                                                            </Grid>
                                                        </Box>
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                            <Hidden smUp>
                                                <Grid item xs={2}>
                                                    <Box display="flex" justifyContent="flex-end" display={{ xs: 'block', md: 'none' }}>
                                                            <Button
                                                                className={classes.button} 
                                                                size="small"
                                                                onClick={() => handleClickOpen(list.job_data,list.bookmark_id, index)}
                                                                style={{color:'#6738AA'}}
                                                                >
                                                                <DeleteIcon className={classes.rightIcon} />
                                                            </Button>
                                                        </Box>
                                                </Grid>
                                            </Hidden>
                                            <Grid item xs={12} md={3} container>
                                                <Grid item md={12} sm={6} xs>
                                                    <Box display={{ xs: 'none', md: 'block' }}>
                                                        <Typography variant="subtitle1" align="left" style={{marginLeft:10}}>
                                                            {list.job_data.salary 
                                                                ? 
                                                                <div>
                                                                    <strong>${list.job_data.salary.minimum}</strong> to <strong> ${list.job_data.salary.maximum}
                                                                    </strong> <span style={{fontSize:10}}>{list.job_data.salary.type.salaryType}</span>  
                                                                </div>
                                                                : "Salary Undisclosed"}
                                                        </Typography>
                                                    </Box>
                                                    <Typography variant="caption">
                                                        <Box align="left" style={{marginLeft:10}}>
                                                            {list.job_data.schemes.length!=0
                                                            ? //{list.schemes[0].scheme.scheme} 
                                                                <div  tyle={{}}>
                                                                    <a href="https://www.wsg.gov.sg/programmes-and-initiatives/wsg-career-support-programme-individuals.html" style={{textDecoration:"none", color:"green", fontWeight:"bold"}} target="_blank">
                                                                        <Grid container xs={12}>
                                                                            <Box display="inline" alignContent="flex-start">
                                                                                <DoneIcon className={classes.smallIcons} style={{height:18, margin:0}}/> Government Scheme Support
                                                                            </Box>
                                                                        </Grid>
                                                                    </a>
                                                                </div> 
                                                            : ""
                                                            }
                                                        </Box>
                                                    </Typography>
                                                    <Typography variant="body2">
                                                        <Box align="left" style={{marginLeft:10, fontSize:12, color:'#A71616', fontWeight:'bold'}}>
                                                            Recommended
                                                        </Box>
                                                    </Typography>
                                                </Grid>
                                            <Grid item md={12} sm={6} xs container alignItems="flex-end" justify="flex-end" direction="column">
                                                <Grid item>
                                                    <Box display={{ xs: 'block', md: 'none' }} justifyContent="flex-end">
                                                        <Typography variant="subtitle1" align="left" style={{marginLeft:10}}>
                                                        {list.job_data.salary 
                                                            ? 
                                                            <div>
                                                                <p>
                                                                <strong>${list.job_data.salary.minimum}</strong> to <strong> ${list.job_data.salary.maximum}
                                                                </strong> <span style={{fontSize:10, margin:0}}>{list.job_data.salary.type.salaryType}</span>
                                                                </p>
                                                                
                                                            </div>
                                                            : "Salary Undisclosed"}
                                                        </Typography>
                                                    </Box>
                                                </Grid>
                                                <Grid item>
                                                    <Box display="flex" justifyContent="flex-end" display={{ xs: 'none', sm: 'block' }}>
                                                        <Button
                                                            className={classes.button} 
                                                            size="small"
                                                            onClick={() => handleClickOpen(list.job_data,list.bookmark_id, index)}
                                                            style={{color:'#6738AA'}}
                                                            variant="outlined"
                                                            >
                                                            Remove
                                                            <CloseIcon className={classes.rightIcon} />
                                                        </Button>
                                                    </Box>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Box>
                            
                    </Paper>
                    <Dialog
                        open={openDialog}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                        className={classes.dialog}
                        // BackdropProps={{ invisible:true }}
                    //     components={{
                    //         Container: props => <Paper {...props} elevation={0}/>
                    //    }}
                        >
                        
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                            Are you sure you want to delete Bookmark?
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClickClose} color="primary">
                            Cancel
                            </Button>
                            <Button onClick={() => handleClick()} color="primary" autoFocus>
                            Confirm
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            ))
            : <div></div>
            }
                
            </Grid>
        </Grid>
        
        <Snackbar
            key={messageInfo ? messageInfo.key : undefined}
            anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
            }}
            open={openSnackbar}
            autoHideDuration={5000}
            onClose={handleClose}
            onExited={handleExited}
            ContentProps={{
            'aria-describedby': 'message-id',
            }}
            message={<span id="message-id">{messageInfo ? messageInfo.message : undefined}</span>}
            action={[
                <Button color="secondary" size="small" href="/profile/bookmarks">
                    View
                </Button>,
                <IconButton
                    key="close"
                    aria-label="close"
                    color="inherit"
                    className={classes.close}
                    onClick={handleClose}
                >
                    <CloseIcon />
                </IconButton>
            ]}
        />
            
        </span>
        </ThemeProvider>
    )
}
export default Bookmarks;


{/* <Grid container spacing={1} >
<Typography component="div">
<Box 
    fontSize="h6.fontSize" 
    m={1} 
    letterSpacing={3}
>
    BOOKMARKS 
</Box>
</Typography>
</Grid>

<Grid item xs={12}> 
{bookmarks
? bookmarks.map((list,index) => (
<div key={index}>
<Paper className={classes.paper} elevation={2}>
    <Grid container spacing={2}>
        <Grid item>                                   
            <ButtonBase className={classes.image}>
                {list.postedCompany.logoUploadPath
                ? <img className={classes.img} src={list.postedCompany.logoUploadPath} />
                : <img className={classes.img} src={defaultIcon} />
                }
                
            </ButtonBase>
        </Grid>
        <Grid item container xs={12} sm >
            <Grid item xs={9}>
                <Grid item xs>
                    <Typography variant="body1">
                        <Box fontWeight="fontWeightBold" align="left"  style={{marginLeft:10}}>
                            { list.postedCompany 
                                ? list.postedCompany.name
                                : ""
                            }
                        </Box>
                    </Typography>
                    <Typography>
                        <Box letterSpacing={2} align="left" style={{marginLeft:10}} >
                            {list.title}
                        </Box>
                    </Typography>
                </Grid>
            </Grid>
            <Grid item xs>
                <Button size="small" colour="inherit" onClick={()=>{
                    deleteBookmark(index,list)
                }}>
                    Remove
                </Button>
            </Grid>
        </Grid>
    </Grid>
</Paper>
<br/>
</div>
))
: <div></div>
}


</Grid> */}