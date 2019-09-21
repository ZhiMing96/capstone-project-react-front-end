import React, { useState, useEffect } from 'react'
import axios from 'axios'

function EventsView() {

    const [events, setEvents] = useState([]);

    useEffect(() =>{
        getEvents(events, setEvents);
    },[])

    console.log("Events in events view = " );
    console.log(events);




    return (
        <div>
        {events.map((event, index) => (
            <div>
                <div key={index}>
                    <p>{event.eventName}</p>
                    <p>{event.eventDescription}</p>
                    <p>{event.eventUrl}</p>
                    <p>{event.eventVenue}</p>
                    <br/>
                </div>
            </div>
            
        ))}
        </div>
    )
}

function getEvents(events, setEvents){
    var tempArray = []; 
    //Call API from backend to get list if Events 
    axios.get('https://portal.ssg-wsg.gov.sg/content/web/eventsfeed/eventlisting.xml')
        .then(res => {
            const results= res.data;
            const parser = new DOMParser()
            const xmlDoc = parser.parseFromString(results, 'text/xml')
            console.log(xmlDoc)
            var listLength = 3;
            if(xmlDoc.getElementsByTagName("event").length < 3) {
                listLength = xmlDoc.getElementsByTagName("event").length;
            }
            for (let i=0; i<listLength ;i++){
                const eventName = xmlDoc.getElementsByTagName("eventName")[i].innerHTML
                const eventUrl = xmlDoc.getElementsByTagName("eventURL")[i].innerHTML
                const eventDescription = xmlDoc.getElementsByTagName("summary")[i].innerHTML
                const eventImgUrl = xmlDoc.getElementsByTagName("eventImageURL")[i].innerHTML
                const eventStartDate = xmlDoc.getElementsByTagName("eventStartDate")[i].innerHTML
                const eventEndDate = xmlDoc.getElementsByTagName("eventEndDate")[i].innerHTML
                const eventSegment = xmlDoc.getElementsByTagName("eventSegment")[i].innerHTML
                const eventPrice = xmlDoc.getElementsByTagName("price")[i].innerHTML
                const eventVenue = xmlDoc.getElementsByTagName("venueName")[i].innerHTML
                const location = xmlDoc.getElementsByTagName("locationType")[i].innerHTML
                const postalCode = xmlDoc.getElementsByTagName("postalcode")[i].innerHTML
                const targetAudience = xmlDoc.getElementsByTagName("targetAudience")[i].innerHTML

                const eventGathered = {
                eventName: eventName,
                eventUrl: eventUrl,
                eventDescription: eventDescription,
                eventImgUrl: eventImgUrl,
                eventStartDate: eventStartDate,
                eventEndDate: eventEndDate,
                eventSegment: eventSegment,
                eventPrice: eventPrice,
                eventVenue: eventVenue,
                location: location,
                postalCode: postalCode,
                targetAudience: targetAudience,
                }

                setEvents(events => [...events, eventGathered]);
            }

        });
}

export default EventsView;
