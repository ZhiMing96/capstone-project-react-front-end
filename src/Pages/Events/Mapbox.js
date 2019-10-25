import React, { useState, useEffect } from 'react'
import MapGL, { GeolocateControl, Marker} from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css';
import axios from 'axios';
import RoomIcon from '@material-ui/icons/Room';

const TOKEN = process.env.REACT_APP_MAPBOX_TOKEN

const geolocateStyle = {
    float: 'left',
    margin: '10px',
    padding: '5px'
};

function Map (props) {

    const [viewport, setViewPort] = useState({
        width: "100%",
        height: '45vh',
        latitude: 1.290270,
        longitude: 103.851959, //Sg coordinates
        zoom: 11
    })
    
    const [markerAddress, setMarkerAddress] = useState({
        latitude: '',
        longitude:''
    })

    useEffect(() =>{
        console.log(props.markerAddress)
        if(props.markerAddress !== null){
            var long = markerAddress[0]
            var lat = markerAddress[1]
            //var str = encodeURIComponent(props.markerAddress)
            //var url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + str + '.json?access_token=' + process.env.REACT_APP_MAPBOX_TOKEN
            
            //axios.get(url).then(res => {
                //console.log(res)
                //console.log(res.data.features[0].geometry.coordinates)
                //var long  = res.data.features[0].geometry.coordinates[0] 
                //var lat = res.data.features[0].geometry.coordinates[1] 
                setMarkerAddress({
                    latitude: lat,
                    longitude:long
                })
                setViewPort({
                    ...viewport,
                    latitude: lat,
                    longitude: long
                })

            //}).catch({
            //})
            
        }
        
    },[props.markerAddress])

    const _onViewportChange = viewport => setViewPort({ ...viewport, transitionDuration: 0 })

    return (
        <div style={{ margin: '0 auto' }}>
            <MapGL
                {...viewport}
                mapboxApiAccessToken={TOKEN}
                mapStyle='mapbox://styles/mapbox/streets-v11'
                onViewportChange={_onViewportChange}
                children={props.children}
            >
                <GeolocateControl
                    style={geolocateStyle}
                    positionOptions={{ enableHighAccuracy: true }}
                    trackUserLocation={true}
                />
                {markerAddress !== undefined && markerAddress.latitude !== '' &&
                <Marker latitude={markerAddress.latitude} longitude={markerAddress.longitude}>
                    <RoomIcon fontSize='large' />
                </Marker>}
            </MapGL>
        </div>
    )
}

export default Map