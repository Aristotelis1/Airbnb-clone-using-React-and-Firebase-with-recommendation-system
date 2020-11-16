import React, { useState, useEffect, useRef} from 'react';
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
// import { useLeafletMap } from "use-leaflet"; 
import MyMap from "./Map"

import fire from "../config/Fire";

function NewAirbnbScreen(props) {

    //const [airbnb, setAirbnb] = useState();

    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [price, setPrice] = useState("");
    const [type, setType] = useState("");
    const [beds, setBeds] = useState("");
    const [description, setDescription] = useState("");
    const [rules, setRules] = useState("");

    const isAvailable = new Array(365).fill(true);

    const user = fire.auth().currentUser;

    const handleSubmit = (evt) => {
        var db = fire.firestore();

        const messages = [];

        var newAirbnbRef = db.collection("airbnbs").doc();

        newAirbnbRef.set({
            name: name,
            location: location,
            price: price,
            type : type,
            numOfBeds: beds,
            description: description,
            isAvailable: isAvailable,
            rules: rules,
            user_email: user.email,
            rating: "",
            numRating: 0,
            image: "/images/d2.jpg"
        })
        .then(function() {
            console.log("Document successfully written!");
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });

        newAirbnbRef.collection("messages")
        // .add({
        //   messages: messages,
        //   user_email: user.email
        // })

        evt.preventDefault();
        alert(`Submitting Name ${name}`)
    }


    const mapRef = useRef();
    const position = [37.98,23.72];

    return (
    <form onSubmit={handleSubmit}>
      <label>
        Apartment Name:
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        Location
        <input
          type="text"
          value={location}
          onChange={e => setLocation(e.target.value)}
        />
        Price
        <input
          type="text"
          value={price}
          onChange={e => setPrice(e.target.value)}
        />
        Type of Apartment
        <input
          type="text"
          value={type}
          onChange={e => setType(e.target.value)}
        />
        Number of beds:
        <input
          type="text"
          value={beds}
          onChange={e => setBeds(e.target.value)}
        />
        Description:
        <input
          type="text"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        Rules:
        <input
          type="text"
          value={rules}
          onChange={e => setRules(e.target.value)}
        />
      </label>
      <input type="file" />
      <MyMap></MyMap>
      <input type="submit" value="Submit" />
    </form>
    )
}

export default NewAirbnbScreen;