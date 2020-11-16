import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Link , useHistory} from 'react-router-dom';
import SearchScreen from './SearchScreen';


function SearchForm(props){

  const [searchTerm, setSearchTerm] = useState("");
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [numOfPeople, setNumOfPeople] = useState();
  const [Price, setPrice] = useState("");


  const handleSearch = (evt) => {
    evt.preventdefault();

  };

  return (
    <div className="container">
      <form className="search-form" onSubmit={handleSearch}>
      <input className="search-bar"
        type="text"
        placeholder="Location"
        value={searchTerm}
        onChange = {e => setSearchTerm(e.target.value)}
      />
      <input
        type="date"
        value={checkin}
        onChange={e => setCheckin(e.target.value)}
      />
      <input
        type="date"
        value={checkout}
        onChange={e => setCheckout(e.target.value)}
      />
      <input className="search-bar-days"
        type="text"
        placeholder="Guests"
        value={numOfPeople}
        onChange = {e => setNumOfPeople(e.target.value)}
      />
      <input className="search-bar-days"
        type="text"
        placeholder="Maximum Price"
        value={Price}
        onChange = {e => setPrice(e.target.value)}
      />
      <Link to= {{
        pathname: '/search-by-location',
        aboutProps: {
          location: searchTerm,
          checkin: checkin,
          checkout: checkout,
          people: numOfPeople,
          price: Price
        }
      }}>
      <input type="submit" value="Submit" />
      </Link>
      </form>
    </div>
  );
}

export default SearchForm;