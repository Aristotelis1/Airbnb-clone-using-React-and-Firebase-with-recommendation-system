import React, { useState, useEffect } from 'react';
import { Link, Route } from 'react-router-dom';
import fire from "../config/Fire";
import ProductScreen from './ProductScreen';

function SearchScreen (props) {

    //const [products, setProduct] = useState([]);
    const [airbnbs, setAirbnb] = useState([]);

    useEffect(() => {
      var db = fire.firestore();
      var users = [];
      var user = fire.auth().currentUser;

      var newSearchRef = db.collection("searches").doc();

      newSearchRef.set({
          user_email: user.email,
          location: props.location.aboutProps.location
      })
      .then(function() {
          console.log("Document successfully written!");
      })
      .catch(function(error) {
          console.error("Error writing document: ", error);
      });

      if(props.location.aboutProps.price !== ""){

        const unsubscribe = db.collection("airbnbs").where("location","==",props.location.aboutProps.location).where("price","<",props.location.aboutProps.price)
          .orderBy("price")
          .get().then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
              users.push([doc.data(),doc.id])
              console.log(doc.id, "=>", doc.data());
              console.log(doc.name);
          });
          setAirbnb(users)

      });
    }
    else{
      const unsubscribe = db.collection("airbnbs").where("location","==",props.location.aboutProps.location)
          .orderBy("price")
          .get().then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
              users.push([doc.data(),doc.id])
              console.log(doc.id, "=>", doc.data());
              console.log(doc.name);
          });
          setAirbnb(users)
      });
    }

      // dispatch(listProducts());

      return () => {
        //
      }
    }, []) 

    console.log("SearchScreen");
    

    return <ul className="products">
      {
        airbnbs.map(airbnb =>
          <li key = {airbnb[1]}>
            <div className="product">
          <Link to={{
              pathname: '/product/' + airbnb[1],
              aboutProps: {
                id: airbnb[1],
                name: airbnb[0].name,
                location: airbnb[0].location,
                price: airbnb[0].price,
                rating: airbnb[0].rating,
                numOfBeds: airbnb[0].numOfBeds,
                type: airbnb[0].type,
                description: airbnb[0].description,
                isAvailable: airbnb[0].isAvailable
              }
              }}>
              <img className="product-image" src={airbnb[0].image} alt="product" />
          </Link>
          <Route path={"/product/" + airbnb[1]} component = {ProductScreen} />
          <div className="product-name">
          <Link to={{
              pathname: '/product/' + airbnb[1],
              aboutProps: {
                name: airbnb[0].name,
                location: airbnb[0].location,
                price: airbnb[0].price,
                rating: airbnb[0].rating,
                numOfBeds: airbnb[0].numOfBeds,
                type: airbnb[0].type,
                description: airbnb[0].description,
                id: airbnb[1]
              }
              }}>
              {airbnb[0].name}
          </Link>
          </div>
          <div className="product-location">{airbnb[0].location}</div>
          <div className="product-price">${airbnb[0].price}</div>
          <div className="product-rating">{airbnb[0].rating} Stars</div>
        </div>
          </li>)
      }
    </ul>
}

export default SearchScreen;