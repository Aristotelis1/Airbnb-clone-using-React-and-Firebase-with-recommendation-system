import React, { useState, useEffect } from 'react';
import { Link, Route } from 'react-router-dom';
import axios from 'axios';
import fire from "../config/Fire";
import { useSelector, useDispatch } from 'react-redux';
import { listProducts } from '../actions/productActions';
import ProductScreen from './ProductScreen';

function HomeScreen (props) {

    const [products, setProduct] = useState([]);
    const [airbnbs, setAirbnb] = useState([]);
    // const productList = useSelector(state => state.productList);
    // const { products, loading, error } = productList;
    // const dispatch = useDispatch();

    // const photo_num = Math.floor(Math.random() * Math.floor(1));

    useEffect(() => {
      var db = fire.firestore();
      var users = [];

      // const fetchData = async () => {
      //   const {data} = await axios.get(`http://localhost:5000/api/products`);
      //   setProduct(data);
      // }
      // fetchData();

      const unsubscribe = db.collection("airbnbs").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            users.push([doc.data(),doc.id])
            console.log(doc.id, "=>", doc.data());
            //console.log(doc.name);
        });
        setAirbnb(users)

    });

      // dispatch(listProducts());

      return () => {
        //
      }
    }, [])  

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
                numRating: airbnb[0].numRating,
                numOfBeds: airbnb[0].numOfBeds,
                type: airbnb[0].type,
                description: airbnb[0].description,
                isAvailable: airbnb[0].isAvailable,
                rules: airbnb[0].rules,
                image: airbnb[0].image
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
                numRating: airbnb[0].numRating,
                id: airbnb[1],
                isAvailable: airbnb[0].isAvailable,
                rules: airbnb[0].rules,
                image: airbnb[0].image
              }
              }}>
              {airbnb[0].name}
          </Link>
          </div>
          <div className="product-location">{airbnb[0].location}</div>
          <div className="product-price">${airbnb[0].price}</div>
          <div className="product-rating">{airbnb[0].rating} Stars ({airbnb[0].numRating} reviews)</div>
        </div>
          </li>)
      }
    </ul>
}

export default HomeScreen;