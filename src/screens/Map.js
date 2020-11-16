import React, { useState, useEffect, Component} from 'react';
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import { Icon } from 'leaflet';

const pin = new Icon({
    iconUrl: '/images/markr.jpg',
    iconSize: [25,25]
});

function MyMap() {

    const position = [37.98,23.72];

    return (
        <Map className="map"
        center={position}
        zoom={7}
          style={{height:300, width:"100%"}}
        >
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}
                draggable={true}
                icon={pin}
            >
                <Popup >
                        Place your Airbnb
                </Popup>
            </Marker>
        </Map>
    )
}

export default MyMap;