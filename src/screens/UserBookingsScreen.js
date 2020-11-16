import React, { useState, useEffect } from 'react';
import myBookings from '..//hooks/useBookings';
import fire from "../config/Fire";


function UserBookingsScreen(props) {

    console.log("lala");

    const { docs } = myBookings();

    const [rating,setRating] = useState("");

    
    const UpdateRating = (doc_id,airbnb,book_id) => {

        var db = fire.firestore();

        if(rating >0 && rating <= 5)
        {

            console.log("rating: " + airbnb.rating);
            console.log("numRating: " + airbnb.numRating);
            console.log("rating: " + rating);

            var sum = airbnb.rating*airbnb.numRating;

            console.log("sum: " + sum);

            var newRating = (sum + Number(rating))/(airbnb.numRating + 1);

            console.log("new rating: " + newRating);



            db.collection('airbnbs').doc(doc_id).update({
                rating: newRating.toFixed(2),
                numRating: airbnb.numRating+1
            })

            var user = fire.auth().currentUser;

            db.collection('ratings').add({
                airbnb_id: doc_id,
                user_email: user.email,
                rating: rating
            })

            db.collection('bookings').doc(book_id).update({
                rated: 1
            })
            alert("Your rating was submitted");
        }else{
            alert("Rating must be between 1-5");
        }
    }

    const FindRating = async (doc_id,book_id) => {
        var db = fire.firestore();

        const sub = await db.collection('airbnbs').doc(doc_id).get().then(function(doc) {
            if (doc.exists){
                console.log(doc.data());
                UpdateRating(doc_id,doc.data(),book_id);
            }
        })
    }

    const HandleRating = (bnb_id,book_id) => (evt) => {
        evt.preventDefault();

        var db = fire.firestore();
        FindRating(bnb_id,book_id);
        
    }

    return (
        <div className="user-grid">
            {docs && docs.map(doc => (
                <div className="details-action" key={doc.id}>
                    <dl>
                        <dt>AIRBNB Name: {doc.airbnb_name}</dt>
                        <dd>Check-In: {doc.checkin}</dd>
                        <dd>Check-Out: {doc.checkout}</dd>
                        <form onSubmit={HandleRating(doc.airbnb_id,doc.id)}>
                        <input className = "change-form"
                        type="text"
                        value={rating}
                        placeholder = "type your rating"
                        onChange={e => setRating(e.target.value)}
                        />
                        <input type="submit" value="Submit"/>
                        </form>
                    </dl>
                </div>
            ))}
        </div>
    )
        
}

export default UserBookingsScreen;