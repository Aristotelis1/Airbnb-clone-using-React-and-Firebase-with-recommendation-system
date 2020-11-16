import React , { Component } from "react";
import fire from "./config/Fire";
import { BrowserRouter, Route, Link , useHistory} from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import SearchForm from "./screens/SearchForm";
import ControlPanelScreen from "./screens/ControlPanelScreen";
import AccountScreen from "./screens/AccountScreen";
import NewAirbnbScreen from "./screens/NewAirbnbScreen";
import myAirbnbsScreen from "./screens/UserAirbnbsScreen";
import UserBookingsScreen from "./screens/UserBookingsScreen";
import ChatScreen from "./screens/ChatScreen";
import UserInfoScreen from "./screens/UserInfoScreen";
import SearchScreen from "./screens/SearchScreen"
import RecommendScreen from "./screens/RecommendScreen";
import RecommendationSystemScreen from "./screens/RecommendationSystemScreen";
import SeachesViewsScreen from "./screens/SearchesViewsScreen";
import MessagesScreen from "./screens/MessagesScreen";
import Signup from "./Signup";

class Home extends Component{


constructor(props)
{
    super(props)
    this.state={
        admin : false
    }
}

checkAdmin(){
  var user = fire.auth().currentUser;

  if(user)
  {
      console.log(user.email);
      if (user.email === "admin@gmail.com")
      {
        //this.state.admin = true;
        return true;
      }
  }
}

logout(){
    fire.auth().signOut();
}
render()
{

    const openMenu = () =>{
    document.querySelector(".sidebar").classList.add('open');
    }

  const closeMenu = () =>{
    document.querySelector(".sidebar").classList.remove('open');
  }


  const admin = () =>{
    if(this.checkAdmin() === true)
    {

    }else
    {
      window.location.href="/"
      document.getElementById("Control").style.visibility = "hidden";
    }

  }

    return(
        <BrowserRouter>
      <div className="grid-container">
      <header className="header">
        <div className="brand">
          <button onClick={openMenu}>
            &#9776;
          </button>
          <Link to="/"> Airbnb Clone </Link>
        </div>
        <div>
            <button onClick={this.logout}>Logout</button>
            <Link to="/controlpanel"> 
              <button id = "Control" className = "ControlPanel" onClick={admin}>ControlPanel</button>
            </Link>
        </div>
        <div>
            <Link to="/add-new-airbnb"> 
              <button id = "Control" className = "ControlPanel">Add new Airbnb</button>
            </Link>
        </div>
        <div>
            <Link to="/explore"> 
              <button id = "Control" className = "ControlPanel">Recommend</button>
            </Link>
        </div>
        <div className="header-links">
          
        </div>
      </header>
      <aside className="sidebar">
        <button className="sidebar-close-button" onClick={closeMenu}>x</button>
        <ul>
          <li>
            <Link to="/account-info">My Account</Link>
          </li>
          <li>
            <Link to="/my-airbnbs">My Airbnbs</Link>
          </li>
          <li>
            <Link to="/my-bookings">My Bookings</Link>
          </li>

        </ul>
      </aside>
      <main className="main">
        <div className="content">
          {/* Search button  */}
          <Route path="/" exact={true} component = {SearchForm} />
          <Route path="/" exact={true} component = {HomeScreen} />
          <Route path="/product/:id" component = {ProductScreen} />
          <Route path="/controlpanel" component = {ControlPanelScreen} />
          <Route path="/account-info" component = {AccountScreen} />
          <Route path="/chat-airbnb" component = {ChatScreen} />
          <Route path="/my-airbnbs" component = {myAirbnbsScreen} />
          <Route path="/my-bookings" component = {UserBookingsScreen} />
          <Route path="/add-new-airbnb" component = {NewAirbnbScreen} />
          <Route path="/user-info" component = {UserInfoScreen} />
          <Route path="/search-by-location" component = {SearchScreen} />
          <Route path="/explore" component = {RecommendScreen} />
          <Route path={"/recommendation-system"} component = {RecommendationSystemScreen} />
          <Route path={"/searches-views"} component = {SeachesViewsScreen} />
          <Route path={"/my-messages/" } component = {MessagesScreen} />
          <Route path={"/signup" } component = {Signup} />


        </div>

      </main>
      <footer className="footer">
        All right reserved.
      </footer>
    </div>
  </BrowserRouter>
    )
}
}

export default Home;