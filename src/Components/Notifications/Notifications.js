import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Collapse from '@material-ui/core/Collapse';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone'
import { Typography, ListItem, ListItemAvatar, List, ListItemText, Avatar, Grid, Divider, Button, IconButton, Tooltip, InputBase } from '@material-ui/core';
import api from '../../api';
import { Link, Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';
import CircularLoading from '../LoadingBars/CircularLoading';
import NotificationsIcon from '@material-ui/icons/Notifications';
import NotificationsListSkeleton from '../SkeletonLoading/NotificationsListSkeleton'
import ClearIcon from '@material-ui/icons/Clear'
import EmploymentDetails from '../EmploymentDetails';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import NotificationsListItem from './NotificationsListItem'
import NotificationCategory from './NotificationCategory';
import SearchIcon from '@material-ui/icons/Search';
import { ContactSupport } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
    root: {
        // width:'100%', 
        width:'400px', 
        [theme.breakpoints.down('sm')]: {
        width:'350px'
        },
        [theme.breakpoints.down('xs')]: {
        width:'330px'
        },
        height:"fit-content",
        backgroundColor:'white',
        maxHeight: 500, 
        overflowY: 'auto'
    },
    paper: {
      margin: theme.spacing(1),
      width: 200,
      height: 500,
    },
    headerBar: {
        
        // backgroundColor:'#024966',
        backgroundColor:'white',
        position: 'sticky',
        top: '0px',
        zIndex: 10,
    },
    headerIcon : {
        marginTop: 0,
        width: 30,
        height: 30 , 
        verticalAlign: "text-top",
        transform: "rotate(340deg)" ,
        // color:'whitesmoke',
        color:'black',
        marginRight:10
    },
    listItem: {
        backgroundColor:'whitesmoke',
        '&:hover': {
            backgroundColor: 'white'
        } 
    },
    input: {
        width: '100%',
        flex: 1,
        paddingLeft:'4%',
    },
    searchBar: {
        borderRadius: 25, 
        borderColor:'black',
        
        marginLeft:'10%',
        marginRight:'10%',
        borderStyle: "solid",
        borderWidth: 1,
        marginBottom: '3%',
        paddingLeft:'2%',
        display:'flex',
    }
  }));

  const defaultAvatar = ""

  const defaultImg = "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"

export default function Notifications(props) {
    console.log("Entered Notifications Component ")
    console.log(props)
    const classes = useStyles();
    const [ alerts, setAlerts ] = useState();
    const [ loadingNotifications, setLoadingNotifications ] = useState(false);
    const [ keyword, setKeyword ] = useState(null);

    const [ sorttedAlerts, setSorttedAlerts ] = useState([
        {
            type: "MEETUP_INVITE", title: "New Meetup Invitations",
            alerts: [], 
        },
        {
            type: "ACCEPT_INVITE", title: "Invitations Accepted",
            alerts: [], 
        },
        {
            type: "CANCEL_MEETUP", title: "Cancelled Meetups",
            alerts: [], 
        },
        {
            type: "CHANGE_MEETUP_DATE", title: "Meetup Date Modified",
            alerts: [], 
        },
        {
            type: "COMPLETE_MEETUP", title: "Meetup Completed",
            alerts: [], 
        },
        {
            type: "RECOMMENDATION_REQUEST", title: "Recommendation Requests",
            alerts: [], 
        },
        {
            type: "WRITE_RECOMMENDATION", title: "New Recommendations",
            alerts: [], 
        },
    ])


    console.log(props);

    const resetAlerts = () =>{
        for(let b=0 ; b < sorttedAlerts.length  ; b++) {
            var arr = [...sorttedAlerts];
            arr[b].alerts = [];
            setSorttedAlerts(arr)
        }
    }

    const sortArray = (array) => {
        console.log("$$$$ Entered Sort Array Method")
        console.log(array)
        resetAlerts();

        if(array && array.length!==0) {
            for(let i=0; i < array.length ; i++ ) {
                // console.log("Start of I FOR Loop Number " + i)
                for(let a=0; a<sorttedAlerts.length ; a++){
                    // console.log("Start of A FOR Loop Number " + a)
                    if(array[i].alert_type === sorttedAlerts[a].type){
                        var temp = [...sorttedAlerts]
                        if(!temp[a].alerts.includes(array[i])){
                            temp[a].alerts.push(array[i]);
                        }
                        setSorttedAlerts(temp);
                        break;
                    }
                }
                
            }   
        }
    }

    useEffect(()=>{
        console.log("ENTERED Use Effect for Notifications")
        const tempAlerts = props.alerts
        setAlerts(tempAlerts);
        console.log(tempAlerts)
        resetAlerts();
        // console.log("**** Sorrting Array ****")
        console.log("KEYWORD = " + keyword)
        if(keyword) {
            // console.log("ENTERED SEARCH")
            handleSearch(keyword);
        } else {
            // console.log("ENTERED SORT")
            sortArray(tempAlerts);
        }


        setLoadingNotifications(false);
    }, [props.alerts])

    const handleChange = event => {
        console.log("Entered Handle Change")
        event.preventDefault();
        const valueInSearchBar = event.target.value !== '' ? event.target.value.toLowerCase()  : event.target.value
        console.log(valueInSearchBar);
        handleSearch(valueInSearchBar)
        setKeyword(valueInSearchBar);
    }

    const handleSearch = (valueInSearchBar)  => {

        console.log("Entered Handle Search")

        // Variable to hold the original version of the list
        let currentList = [];
        // Variable to hold the filtered list before putting into state
        let newList = [];
        // If the search bar isn't empty
        if (valueInSearchBar !== "" && alerts ) {
            const filter = valueInSearchBar.toLowerCase();
            
            // Assign the original list to currentList
            currentList = alerts;
            console.log('Printing CURRENT LIST: ')
            console.log(currentList)
            // Use .filter() to determine which items should be displayed
            // based on the search terms
            
            newList = currentList.filter(item => {
                
                const usernameKeywords = item.from_user && item.from_user.profile ? item.from_user.profile.username.toLowerCase(): '';
                const firstNameKeywords = item.from_user && item.from_user.profile ? item.from_user.profile.first_name.toLowerCase(): '';
                const lastNamekeywords = item.from_user && item.from_user.profile ? item.from_user.profile.last_name.toLowerCase() : '';
                const jobTitleKeywords = item.work_experience ? item.work_experience.job_title.toLowerCase() : '' ;
                const companyKeywords = item.work_experience ? item.work_experience.company_name.toLowerCase(): '';
                const monthKeyword = item.meetup_invite ? getDate(item.meetup_invite.suggested_datetime) : item.recommendation_request ? getDate(item.recommendation_request.create_datetime) : ""
                console.log("+++++ LOGGING DATE")
                console.log(monthKeyword)
                
                console.log("Search Term = " + filter )

                const userNameMatch = usernameKeywords.includes(filter);
                const firstNameMatch = firstNameKeywords.includes(filter);
                const lastNameMatch = lastNamekeywords.includes(filter);
                const jobTitleMatch = jobTitleKeywords.includes(filter);
                const companyMatch = companyKeywords.includes(filter);
                const monthMatch = monthKeyword.includes(filter);

                console.log("Value of userNameMatch = " + userNameMatch)
                console.log("Value of firstNameMatch = " + firstNameMatch)
                console.log("Value of lastNameMatch = " + lastNameMatch)
                console.log("Value of jobTitleMatch = " + jobTitleMatch)
                console.log("Value of companyMatch = " + companyMatch)
                console.log("Value of monthMatch = " + monthMatch)

                
                return (userNameMatch || firstNameMatch || lastNameMatch || jobTitleMatch || companyMatch || monthMatch);
            });

            // console.log('Printing NEW LIST: ')
            // console.log(newList)
        } else {
            newList = alerts; // If the search bar is empty, set newList to original task list
        }
        sortArray(newList); // Set the filtered state based on what our rules added to newList
    }


    const getDate = (stringDate) => {
        const date = new Date(stringDate)
        
        var month = date.toLocaleString('en-GB', { month: 'short' });

        // return(date.getDate() + " " +  month + " " + date.getFullYear())
        return( month.toLowerCase() );
   }

    return (
        <div style={{ width:'100%', height:'100%' }}>
        <Paper className={classes.root} elevation={5}>
            <Grid container >
                <Grid item xs={12} className={classes.headerBar}>
                    <Typography style={{ fontWeight:'bold', fontSize:30, marginBottom:'5%', color:'black', paddingLeft:'13%', paddingTop:'5%',  }}>
                        < NotificationsIcon  className={classes.headerIcon}/> Notifications
                    </Typography>
                    <Paper className={classes.searchBar} elevation={0}>
                        <SearchIcon style={{alignSelf:'center'}}/>
                        <InputBase
                        className={classes.input}
                        placeholder="Type your keyword(s)..."
                        required
                        // value={keyword}
                        onChange={handleChange}
                        />
                    </Paper>
                </Grid>
                <Grid item xs={12} style={{}}>
                    <List style={{ padding:0, marginBottom:'5%', marginTop:'5%' }} >
                        { loadingNotifications 
                        ? <NotificationsListSkeleton/>
                        : sorttedAlerts
                        ?
                        sorttedAlerts.map((category, index) => (
                            <NotificationCategory alerts={category.alerts} alertType={category.title}
                            retrieveAlerts={props.retrieveAlerts} handleClosePopover={props.handleClosePopover} />
                        ))
                        :
                        <div style={{padding:'5%'}}>
                            <Typography>
                            There are no Notifications at the Moment
                            </Typography>
                        </div>
                        }
                        
                    </List>
                
                </Grid>
            </Grid>
        </Paper>
       
        </div>
        
    )
}
