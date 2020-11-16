import React, { useState, useEffect } from 'react';
import fire from "../config/Fire";
import useFirestore from '../hooks/useFirestore'
import { Link, Route } from 'react-router-dom';
import UserInfoScreen from './UserInfoScreen';

function saveJSON(data, filename){

    if(!data) {
        console.error('No data')
        return;
    }

    if(!filename) filename = 'console.json'

    if(typeof data === "object"){
        data = JSON.stringify(data, undefined, 4)
    }

    var blob = new Blob([data], {type: 'text/json'}),
        e    = document.createEvent('MouseEvents'),
        a    = document.createElement('a')

    a.download = filename
    a.href = window.URL.createObjectURL(blob)
    a.dataset.downloadurl =  ['text/json', a.download, a.href].join(':')
    e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
    a.dispatchEvent(e)
}

function ControlPanelScreen(props) {


    const { docs } = useFirestore('userDetails');
    var usersJSON = JSON.stringify(docs);
    console.log(docs);
    console.log(usersJSON);

    // const { air } = useFirestore('airbnbs');
    // var airJSON = JSON.stringify(air);
    // console.log(air);

    // const { bookings } = useFirestore('bookings');
    // var bookJSON = JSON.stringify(bookings);

    // const { ratings } = useFirestore('ratings');
    // var ratingJSON = JSON.stringify(ratings);
    

    return (
        <div className="user-grid">
            <h2>ControlPanel</h2>
            <h3>Users:</h3>
            { docs && docs.map(doc => (
                <div className="details-action" key={doc.id}>
                <ul>
                    <li>
                    <Link to={{
                        pathname: '/user-info',
                        aboutProps: {
                            name: doc.name,
                            email: doc.email,
                            phoneNumber: doc.phoneNumber,
                            role: doc.role
                        }
                        }}>
                        { doc.email }
                    </Link>
                    </li>
                </ul>
                </div>
            ))}
            <button onClick={() => saveJSON(usersJSON,'Users_data.json')}>Export JSON</button>
            {/* <button onClick={() => saveJSON(airJSON,'Airbnbs_data.json')}>Export airbnbs JSON</button>
            <button onClick={() => saveJSON(bookJSON,'Bookings_data.json')}>Export bookings JSON</button>
            <button onClick={() => saveJSON(ratingJSON,'Ratings_data.json')}>Export ratings JSON</button> */}
        </div>
    )
}


export default ControlPanelScreen;