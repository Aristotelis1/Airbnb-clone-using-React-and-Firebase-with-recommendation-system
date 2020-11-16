import React, { useState, useEffect } from 'react';
import myAirbnbs from '../hooks/useAirbnbs';
import fire from "../config/Fire";
import { Link, Route } from 'react-router-dom';



function UserAirbnbsScreen(props) {

    const [newName, setNewName] = useState("");
    const [newType, setNewType] = useState("");
    const [newPrice, setNewPrice] = useState("");
    const [newLocation, setNewLocation] = useState("");
    const [newDescription, setNewDescription] = useState("");

    const { docs } = myAirbnbs();

    console.log("Airbnbs");
    console.log(docs);

    const HandleName = (doc_id) => (evt) => {
        evt.preventDefault();
        var db = fire.firestore();
        var user = fire.auth().currentUser;
        

        if(user){
            db.collection("airbnbs").doc(doc_id).update({
                name: newName,
            })
        }

        alert("Name was changed");
    }

    const HandleType = (doc_id) => (evt) => {
        evt.preventDefault();
        var db = fire.firestore();
        var user = fire.auth().currentUser;

        if(user){
            db.collection("airbnbs").doc(doc_id).update({
                type: newType,
            })
        }

        alert("Type was changed");
    }

    const HandlePrice = (doc_id) => (evt) => {
        evt.preventDefault();
        var db = fire.firestore();
        var user = fire.auth().currentUser;

        if(user){
            db.collection("airbnbs").doc(doc_id).update({
                price: newPrice,
            })
        }

        alert("Price was changed");
    }

    const HandleLocation = (doc_id) => (evt) => {
        evt.preventDefault();
        var db = fire.firestore();
        var user = fire.auth().currentUser;

        if(user){
            db.collection("airbnbs").doc(doc_id).update({
                location: newLocation,
            })
        }

        alert("Location was changed");
    }

    const HandleDescription = (doc_id) => (evt) => {
        evt.preventDefault();
        var db = fire.firestore();
        var user = fire.auth().currentUser;

        if(user){
            db.collection("airbnbs").doc(doc_id).update({
                description: newDescription,
            })
        }

        alert("Description was changed");
    }

    return (
        <div className="user-grid">
        
        { docs && docs.map(doc => (
            <div className="details-action" key={doc.id}>
            <dl>
                    <dt>AIRBNB ID: {doc.id}</dt>
                    <dd>Name: {doc.name}</dd>
                    <form onSubmit={HandleName(doc.id)}>
                    <input className = "change-form"
                        type="text"
                        value={newName}
                        placeholder = "type your new name"
                        onChange={e => setNewName(e.target.value)}
                    />
                    <input type="submit" value="Submit"/>
                    </form>
                    <dd>Type: {doc.type}</dd>
                    <form onSubmit={HandleType(doc.id)}>
                    <input className = "change-form"
                        type="text"
                        value={newType}
                        placeholder = "type your new Type"
                        onChange={e => setNewType(e.target.value)}
                    />
                    <input type="submit" value="Submit" />
                    </form>
                    <dd>Price: ${doc.price}</dd>
                    <form onSubmit={HandlePrice(doc.id)}>
                    <input className = "change-form"
                        type="text"
                        value={newPrice}
                        placeholder = "type your new Price"
                        onChange={e => setNewPrice(e.target.value)}
                    />
                    <input type="submit" value="Submit" />
                    </form>
                    <dd>Location: {doc.location}</dd>
                    <form onSubmit={HandleLocation(doc.id)}>
                    <input className = "change-form"
                        type="text"
                        value={newLocation}
                        placeholder = "type your new Location"
                        onChange={e => setNewLocation(e.target.value)}
                    />
                    <input type="submit" value="Submit"/>
                    </form>
                    <dd>Description: {doc.description}</dd>
                    <form onSubmit={HandleDescription(doc.id)}>
                    <input className = "change-form"
                        type="text"
                        value={newDescription}
                        placeholder = "type your new Description"
                        onChange={e => setNewDescription(e.target.value)}
                    />
                    <input type="submit" value="Submit" />
                    </form>
                    <Link to={{
                        pathname: '/my-messages/',
                        aboutProps: {
                            id: doc.id,
                        }
                        }}>
                            See messages
                    </Link>
            </dl>
            </div>
        ))}

        </div>
    )


}

export default UserAirbnbsScreen;