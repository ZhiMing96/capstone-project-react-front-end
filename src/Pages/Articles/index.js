import React, { useState, useEffect, Fragment }from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, StaticRouter, Redirect } from 'react-router-dom';
import ArticlesBG from '../../images/articlesBG.jpg'
import { Grid, Paper, Typography, ButtonBase, makeStyles, CssBaseline, Box, Tabs, Tab, Card, CardHeader, Avatar, IconButton, CardMedia, CardContent, CardActions, Collapse, Divider, CardActionArea, List, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert'
import FavoriteIcon from '@material-ui/icons/Favorite'
import ShareIcon from '@material-ui/icons/Share'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import clsx from 'clsx';
import { red } from '@material-ui/core/colors';
import styled from 'styled-components';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import ArrowForwardIos from '@material-ui/icons/ArrowForwardIos'
import { typography } from '@material-ui/system';
import { setSeconds } from 'date-fns/esm';

const Wrapper = styled.div`
    width:100%
`;

const Page = styled.div`
    width:100%
`;

const articleHeadings = [
  '#CareerGrowth',
  '#JobSearching',
  '#LandJobs'
]

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    margin:'auto',
    padding:20,
  },
  background: {
    backgroundImage:`url(${ArticlesBG})`,
   
    width:'100%',
    maxWidth:'100%',
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 700,
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
  cardLarge: {
    maxWidth: '98%',
    marginBlock:10
  },
  cardSmall:{
    maxWidth: '95%',
    marginBlock:10
  },
  mediaLarge: {
    height: 0,
    paddingTop: '40.25%',
  },
  mediaSmall: {
    height: 0,
    paddingTop: '56.25%',
  },
  articleHeading: {
    textAlign:'Left', 
    fontWeight:'lighter',
    overflow:'hidden',
    textOverflow:'ellipsis', 
    display:'-webkit-box',
    WebkitLineClamp:2,
    WebkitBoxOrient:'vertical'
  },
  articleDescription:{
    textAlign:'Left', 
    overflow:'hidden',
    textOverflow:'ellipsis', 
    display:'-webkit-box',
    WebkitLineClamp:4,
    WebkitBoxOrient:'vertical'
  },
  tabArea: {
    maxWidth: '100%', 
    flex:'wrap',  
    overflow:"auto",
    position:'sticky', 
    zIndex:10,
    [theme.breakpoints.down('sm')]: {
      top:'57px',
    },
    [theme.breakpoints.up('md')]: {
      top:'64px',
    },
  },
  individualTab: {
    minHeight:0, 
    padding:'3px 12px', 
    [theme.breakpoints.down('sm')]: {
      fontSize:12,
    },
    [theme.breakpoints.up('md')]: {
      fontSize:18,
    },

    
  },
  articleList: {
    marginTop:'15px', 
    overflowY:'auto',
    [theme.breakpoints.down('sm')]: {
      height:'290px',
    },
    [theme.breakpoints.up('md')]: {
      height:'370px',
    },
    [theme.breakpoints.up('lg')]: {
      height:'450px',
    },
    [theme.breakpoints.up('xl')]: {
      height:'570px',
    },
  },
  ListTitle:{
    fontWeight:'lighter',
    [theme.breakpoints.up('lg')]: {
      fontSize:'20px' 
    },
    [theme.breakpoints.down('md')]: {
      fontSize:'16px' 
    },
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  sectionHeading: {
    fontSize:'large',
    fontWeight:'bold',
    backgroundColor:'#fafafa', 
    position:'sticky', 
    top:0, 
    textAlign:'left', 
    zIndex:10, 
    padding:10, 
    paddingTop:0,
    color:'#024966e'
  }
}));

function Articles()
{
  console.log("Entered GetArticles Function");
  const [articles, setArticles] = useState([]);
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [fontWeight, setFontWeight] = useState({
    featured: '600',
    recommended: '300',
    latest:'300'
  })
  const [expanded, setExpanded] = useState(false);
  const [selectedIndex, setselectedIndex] = useState(null);

  const handleExpandClick = (index) => {
    console.log(index);
    setselectedIndex(index);
    setExpanded(!expanded);
  };

  const handleChange = (event,newValue) => {
    console.log(newValue) 
    switch(newValue) {
      case 0:
        setFontWeight({
          featured: '600',
          recommended: '300',
          latest:'300'
        })
        break;
      case 1:
        setFontWeight({
          featured: '300',
          recommended: '600',
          latest:'300'
        })
      break;
      case 2:
          setFontWeight({
            featured: '300',
          recommended: '300',
          latest:'600'
          })
      break;
      
    }setValue(newValue);
  };
  
  console.log(articles);
  useEffect(() => {
    axios.get('https://content.mycareersfuture.sg/wp-json/wp/v2/posts?per_page=10')
    .then(res => {
      const results = res.data;
      console.log(results);
      //console.log(results[0]._links['wp:attachment'][0].href);
      setArticles(results);
    })
  }, []);

  var carouselSettings = {
    accessibiliy: true,
    speed:1800,
    slidesToShow: 4,
    slidesToScroll: 4,
    infinite:true,
    dots:true,
    autoplay: true,
    arrows:true,
    autoplaySpeed:7500,
    draggable:true,
    lazyLoad: "progressive",
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }]
  };

  const formatDate = (dateString) => {
    var date = new Date(dateString);
    var month = date.toLocaleString('en-GB', {month: 'short'});
    //console.log(month);
    var day = date.getMonth();
    //console.log(day);
    var year = date.getFullYear();

    return(`${day} ${month} ${year}`)
  }
  console.log('Selected Index = ' + selectedIndex)

  return(
    <Fragment>
      <CssBaseline/>
        <div style={{backgroundImage:`url(${ArticlesBG})`,backgroundPosition: 'center',backgroundSize: 'cover', width:'100%', height:'350px'}}>
          <Typography>
            <Box textAlign="left" fontWeight="fontWeightBold" fontSize={40} letterSpacing={2} style={{marginInlineStart:'11%', paddingTop:'100px',color:'#024966'}}>
              ARTICLES
            </Box>
            <Box textAlign="left" fontWeight="fontWeightBold" fontSize={15} letterSpacing={1} style={{marginInlineStart:'11%', paddingTop:'1px',color:'#024966'}}>
              <Grid container style={{}}>
                <Divider orientation="vertical" style={{width:7, height:30, backgroundColor :'#1382B9', marginRight:10}} />
                <Typography style={{marginTop:5, fontWeight:600}}>
                  One Stop Career Guidance Portal
                </Typography>
              </Grid>
            </Box>
          </Typography>
        </div>

        <div className={classes.tabArea}>
         
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor=""
              textColor=""
              centered
              style={{maxWidth:'100%', marginInline:30, paddingBlock:5, backgroundColor:'#e3f2fd',alignItems:'center'}}
            >
              {/* {articleHeadings.map((heading)=> (
                <Tab disableRipple style={{minHeight:0, padding:'3px 12px', fontSize:15}}  label={<span style={{fontWeight:fontWeight.featured}}>{heading}</span>} />
              ))} */}
                <Tab disableRipple className={classes.individualTab} label={<span style={{fontWeight:fontWeight.featured}}>Career Growth</span>} />
                <Tab disableRipple className={classes.individualTab} label={<span style={{fontWeight:fontWeight.recommended}}>Job Searching</span>} />
                <Tab disableRipple className={classes.individualTab} label={<span style={{fontWeight:fontWeight.latest}}>Land a Job</span>} />
            </Tabs>
          </div>
          <Grid container style={{padding:18}}>
            {articles.slice(0,1).map((article,index) => (
                <Grid item xs={12} sm={6} style={{marginTop:'15px',}}>
                  <Typography className={classes.sectionHeading}>
                    Top Pick
                  </Typography>
                  <Card className={classes.cardLarge} style={{boxShadow:'none'}}>
                    <CardActionArea href={article.link} target='._blank'>
                      <CardMedia
                        className={classes.mediaLarge}
                        image='https://content-mycareersfuture-sg-admin.cwp.sg/wp-content/uploads/2019/03/shutterstock_683138257.jpg'
                        title={article.title.rendered}
                      />
                    </CardActionArea>
                    <CardContent style={{height:'fit-content', paddingBottom:10}}>
                      <Grid container display='flex'>
                        <Grid item xs={12} container style={{}} direction='column' justify="space-between">
                          <Grid item>
                            <Typography style={{fontWeight:'bold', fontSize:12, textAlign:'left'}}>
                                Grow Your Career
                            </Typography>
                            <Typography className={classes.articleHeading} gutterBottom variant="body1">
                              {article.title.rendered}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid item xs={12} container style={{paddingLeft:10}} justify='space-between'>
                          <Grid item xs={7} style={{alignSelf:'center'}}>
                            <Typography style={{textAlign:'left', fontSize:11,}}>
                              Posted on: {formatDate(articles[0].date)}
                            </Typography>
                          </Grid>
                          <Grid item xs={4} style={{alignSelf:'center'}}>
                            <Typography style={{fontSize:11,textAlign:'right'}}>
                              5 Min Read
                            </Typography>
                          </Grid>
                          <Grid item xs={1}>
                            <IconButton
                              className={clsx(classes.expand, {
                                [classes.expandOpen]: expanded,
                              })}
                              onClick={() => handleExpandClick(index)}
                              aria-expanded={expanded}
                              aria-label="show more"
                              size='small'
                            >
                              <ExpandMoreIcon />
                            </IconButton>
                          </Grid>
                        </Grid>
                      </Grid>
                    </CardContent>
                      
                    <Collapse in={index===selectedIndex?expanded:false} timeout="auto" unmountOnExit>
                      <CardContent style={{paddingTop:5, paddingBottom:5}}>
                        <Typography className={classes.articleDescription} variant="body2" color="textSecondary" gutterBottom>
                          Want to increase your company’s productivity without breaking the bank? Read on to find out which five free digital tools SMEs shouldn’t do without. 
                              {article.acf.seo_meta_description}
                        </Typography>
                      </CardContent>
                    </Collapse>
                  </Card>
                </Grid>
            ))}
            <Grid item xs={12} sm={6} className={classes.articleList}>
            <Typography className={classes.sectionHeading}>
              Latest
            </Typography>
              <List style={{paddingTop:0, width:'95%'}}>
                {articles.map((article,index) => {
                  if(index!==0){
                    return (
                      <Fragment>
                            <ListItem alignItems="flex-start">
                              <ListItemText>
                              <a href={article.link} target='._blank' style={{textDecoration:'none', color:'inherit'}}>
                                <Typography>
                                  <Box fontWeight='fontWeightBold' fontSize={12}>
                                    Grow Your Career
                                  </Box>
                                </Typography>
                                <Typography className={classes.ListTitle} variant='h6' style={{}} gutterBottom>
                                  <Box>
                                    {article.title.rendered}
                                  </Box>
                                </Typography>
                                </a>
                                <Grid container justify='space-between'>
                                  <Grid item xs={7} style={{alignSelf:'center'}}>
                                    <Typography style={{textAlign:'left', fontSize:11}}>
                                      Posted on: {formatDate(article.date)}
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={4} style={{textAlign:'right', alignSelf:'center'}}>
                                    <Typography style={{fontSize:11,}}>
                                        5 Min Read
                                    </Typography>
                                  </Grid>
                                
                                  <Grid item xs={1}>
                                  <IconButton
                                    className={clsx(classes.expand, {
                                      [classes.expandOpen]: index === selectedIndex? expanded : false,
                                    })}
                                    onClick={() => handleExpandClick(index)}
                                    aria-expanded={expanded}
                                    aria-label="show more"
                                    size='small'
                                  >
                                    <ExpandMoreIcon />
                                  </IconButton>
                                  </Grid>
                                </Grid>
                                <Collapse in={index===selectedIndex?expanded:false} timeout="auto" unmountOnExit>
                                    <Typography className={classes.articleDescription} variant="body2" color="textSecondary" gutterBottom>
                                          {article.acf.seo_meta_description}
                                    </Typography>
                                </Collapse>
                              </ListItemText>
                            </ListItem>
                            <Divider style={{marginLeft:15}}  component="li" />
                          </Fragment>
                          )
                        }
                      })}
                  </List> 
              </Grid>
          </Grid>
          <div style={{padding:18}}>
            <Typography className={classes.sectionHeading}>
                Recommended For You
            </Typography>                 
            <Wrapper style={{marginInlineStart:15, marginInlineEnd:15, zIndex:0}}>
              <Slider {...carouselSettings}>
                  {articles.map((article,index) => {
                    if(index > 1){
                      return (
                        <Page>
                          <Card className={classes.cardSmall}>
                            <CardActionArea href={article.link} target='._blank'>
                              <CardMedia
                                className={classes.mediaSmall}
                                image='https://content-mycareersfuture-sg-admin.cwp.sg/wp-content/uploads/2019/09/Masthead-1.jpg'
                                title={article.title.rendered}
                              />
                            </CardActionArea>
                            <CardContent style={{height:150}}>
                              <Grid container direction='column' justify="space-between" style={{height:'-webkit-fill-available'}}>
                                <Grid item xs={12}>
                                  <Typography style={{fontWeight:'bold', fontSize:12, textAlign:'left'}}>
                                    Grow Your Career
                                  </Typography>
                                  <Typography className={classes.articleHeading} gutterBottom variant="body1" >
                                    {article.title.rendered}
                                  </Typography>
                                </Grid>
                                <Grid item xs={12} container direction='row' justify="space-between">
                                  <Grid item>
                                    <Typography style={{textAlign:'left', fontSize:11}}>
                                      Posted on: {formatDate(article.date)}
                                    </Typography>
                                  </Grid>
                                  <Grid item>
                                    <Typography style={{fontSize:11}}>
                                      5 Min Read
                                    </Typography>
                                  
                                  </Grid>
                                </Grid>
                              </Grid>
                            </CardContent>
                          </Card>
                        </Page>
                      )
                    }
                  })}
                </Slider>
              </Wrapper>
            </div>
    </Fragment>
    
  )
  
} 


export default Articles


{/* <div className={classes.background}>
     
     <h1> TEST </h1>
     {articles.map((article,index) => (
         <div key={index}>
           <Paper className={classes.paper}>
             <Grid container spacing={2}>
               <Grid item>
                 <ButtonBase className={classes.image} href={article.link} style={{textDecoration: 'none', color: 'black'}}>
                   <GetImage url={article._links['wp:featuredmedia'][0].href} classes={classes}/>
                 </ButtonBase>
               </Grid>
               <Grid item xs={12} sm container>
                 <Grid item xs container direction="column" spacing={2}>
                   <Grid item xs>
                     <Typography gutterBottom variant="subtitle1">
                       {article.title.rendered}
                     </Typography>
                     <Typography variant="body2" color="textSecondary">
                       {article.acf.seo_meta_description}
                       Keywords: {article.acf.seo_keywords}
                     </Typography>
                   </Grid>
                   <Grid item>
                     <Typography variant="body2" style={{ cursor: 'pointer' }} >
                       <a href={article.acf['cta-url']} style={{textDecoration: 'none', color: 'black'}}>
                         {article.acf['text_-_hyperlinked']}
                       </a>
                       
                     </Typography>
                   </Grid>
                 </Grid>
                 <Grid item>
                   <Typography variant="subtitle1">Status: {article.type}</Typography>
                 </Grid>
               </Grid>
             </Grid>    
           </Paper>
           </div> 
         ))}
   </div> */}


  //  <div style={{margin:'',display:'flex'}}> 
  //                 <div style={{textAlign:'-webkit-center'}}>
  //                   <Card className={classes.cardLarge}>
  //                     <CardMedia
  //                       className={classes.media}
  //                       image='https://content-mycareersfuture-sg-admin.cwp.sg/wp-content/uploads/2019/03/shutterstock_683138257.jpg'
  //                       title="Paella dish"
  //                     />
  //                     <CardContent>
  //                       <Typography variant="body2" color="textSecondary" style={{textAlign:'left'}}>
  //                         {article.acf.seo_meta_description}
  //                       </Typography>
  //                     </CardContent>
  //                     <CardActions disableSpacing>
  //                       <IconButton aria-label="add to favorites">
  //                         <FavoriteIcon />
  //                       </IconButton>
  //                       <IconButton aria-label="share">
  //                         <ShareIcon />
  //                       </IconButton>
  //                       <IconButton
  //                         className={clsx(classes.expand, {
  //                           [classes.expandOpen]: expanded,
  //                         })}
  //                         onClick={handleExpandClick}
  //                         aria-expanded={expanded}
  //                         aria-label="show more"
  //                       >
  //                         <ExpandMoreIcon />
  //                       </IconButton>
  //                     </CardActions>
  //                   </Card>
  //                 </div>
  //               </div>