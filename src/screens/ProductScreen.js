import React, { useState, useEffect, useReducer } from 'react';
import data from '../data';
import { Link, Route } from 'react-router-dom';
import SimpleReactCalendar from 'simple-react-calendar';
import fire from "../config/Fire";
function ProductScreen(props) {

    //const product = data.products.find(x => x._id === props.match.params.id);
    //const product = props;

    console.log(props.location.aboutProps.id);

    const [checkin, setCheckin] = useState("");
    const [checkout, setCheckout] = useState("");


    const handleSubmit = (evt) => {
        evt.preventDefault();
        if(checkin > checkout)
        {
            alert("WRONG DATES")
        }
        else{

            var user = fire.auth().currentUser;
            var db = fire.firestore();

            if(user)
            {

                console.log("Check in: " + checkin)
                console.log("Check out: " + checkout)

                var available = props.location.aboutProps.isAvailable;

                var res_in = checkin.split('-');
                var res_out = checkout.split('-');
                
                if(res_out[0] > res_in + 1)
                {
                    alert("Wrong year");
                }
                else{

                    var month_in = Number(res_in[1]);
                    var month_out = Number(res_out[1]);

                    var days_in = Number(res_in[2]);
                    var days_out = Number(res_out[2]);

                    var start = (month_in-1)*30 + days_in-1;
                    var end = (month_out-1)*30 + days_out-1;

                    var flag = 0;
                    for(var i = start; i < end; i++)
                    {
                        if(available[i] != true)
                        {
                            flag = 1;
                        }
                    }
                    if(flag == 1)
                    {
                        alert("These days the airbnb is not available");
                    }
                    else{
                        for(var i = start; i < end; i++)
                        {
                            available[i] = false;
                        }

                        db.collection('airbnbs').doc(props.location.aboutProps.id).update({
                            isAvailable: available
                        })

                        db.collection('bookings').doc().set({
                            user_email: user.email,
                            airbnb_id: props.location.aboutProps.id,
                            checkin: checkin,
                            checkout: checkout,
                            airbnb_name: props.location.aboutProps.name,
                            rated: 0
                        })

                        alert("Your booking was completed");
                    }
                }
            }
            else{
                alert("Something wrong happened");
            }
        }
    }


    return  <div>
        <div className="back-to-result">
            <Link to = "/">Back to result</Link>
        </div>

        <div className="details">
            <div className="details-image">
                <img src = {props.location.aboutProps.image} alt='product'></img>
            </div>
            <div className="details-info">
                <ul>
                    <li>
                        Name:
                        <h4>{props.location.aboutProps.name}</h4>
                    </li>
                    <li>
                        {/* {product.airbnb.rating} Stars({product.airbnb.numReviews} Reviews) */}
                    </li>
                    <li>
                        Price: <b>${props.location.aboutProps.price}</b>
                    </li>
                    <li>
                        Number of beds:
                        <div>
                            {props.location.aboutProps.numOfBeds}
                        </div>
                    </li>
                    <li>
                        Description:
                        <div>
                            {props.location.aboutProps.description}
                        </div>
                    </li>
                    <li>
                        Rating:
                        <div>
                            {props.location.aboutProps.rating}
                        </div>
                    </li>
                    <li>
                        Number of ratings:
                        <div>
                            {props.location.aboutProps.numRating}
                        </div>
                    </li>
                    <li>
                        Rules:
                        <div>
                            {props.location.aboutProps.rules}
                        </div>
                    </li>
                </ul>
                <div>
                <Link to={{
                    pathname: '/chat-airbnb',
                    aboutProps: {
                        id: props.location.aboutProps.id
                    }
                }}>
                        Chat with the owner
                </Link>
                {/* <Route path={"/product/" + props.location.aboutProps.id + "/chat"} component = {ChatScreen}/> */}
                </div>
            </div>
            <div className="details-action">
                <ul>
                    <li>
                        Price: <b>${props.location.aboutProps.price}</b>
                    </li>
                    <li>
                        {/* Status: {product.airbnb.status} */}
                    </li>
                    {/* <SimpleReactCalendar activeMonth={new Date()} /> */}
                    <form onSubmit={handleSubmit}>
                        <li>
                            Check In:
                            <input
                            type="date"
                            value={checkin}
                            onChange={e => setCheckin(e.target.value)}
                            />
                        </li>
                        <li>
                            Check Out:
                            <input
                            type="date"
                            value={checkout}
                            onChange={e => setCheckout(e.target.value)}
                            />
                        </li>
                        <li>
                            <button className="button" type="submit" value="Submit">Book Now</button>
                        </li>
                    </form>
                </ul>
            </div>
        </div>
    </div>
}

export default ProductScreen;