import React from 'react';
import { Grid, Typography, Box, } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import RecoRequestCard from '../../Components/RecommendationRequestCard'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from 'styled-components';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        width: '100%'
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));
const carouselSettings = {
    accessibility: true,
    speed: 700,
    slidesToShow: 5,
    slidesToScroll: 1,
    infinite: false,
    dots: true,
    //autoplay: true,
    arrows: true,
    //autoplaySpeed:8000,
    draggable: true,
    //lazyLoad: "progressive",
    pauseOnHover: true,
    // nextArrow: <CarouselArrowNext />,
    // prevArrow: <CarouselArrowPrev />,
    responsive: [
        {
            breakpoint: 1920, //lg
            settings: {
                slidesToShow: 4,
                slidesToScroll: 1,
                infinite: false,
            }
        },
        {
            breakpoint: 1280, //md
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                infinite: false,
            }
        },
        {
            breakpoint: 1000, //md
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                //infinite: true,
            }
        },
        {
            breakpoint: 600, //sm
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                //initialSlide: 2
                infinite: false,
            }
        },
        {
            breakpoint: 480, //xs
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: false,
            }
        }]
};

const Wrapper = styled.div`
width:97%
`;

export default function Reco() {
    const classes = useStyles();
    const requests = [0, 1, 2, 3, 4, 5] //api

    return (
        <div className={classes.root}>
            <Grid container xs={12} md={12} style={{ marginTop: 20, marginBottom: 20 }}>
                <Typography component="div" variant="h6" color='textSecondary' gutterBottom>
                    <Box
                        fontSize="h6.fontSize"
                        letterSpacing={2}
                        textAlign='left'
                        flexGrow={1}
                        fontWeight="fontWeightBold"
                    >
                        PENDING RECOMMENDATION REQUESTS
                    </Box>
                </Typography>
            </Grid>


            <Grid container direction="row" justify="space-evenly" alignItems="stretch" spacing={3}>
                <Wrapper>
                    <Slider {...carouselSettings}>
                        {requests.map((value, index) => {
                            return (
                                <Grid item xs={10}>
                                    <RecoRequestCard />
                                </Grid>
                            )
                        })
                        }
                    </Slider>
                </Wrapper>
            </Grid>
        </div>
    )
}
