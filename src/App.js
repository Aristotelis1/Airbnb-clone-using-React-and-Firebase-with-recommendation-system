import React, { Component } from 'react';
import './App.css';
import fire from './config/Fire';
import Login from './Login';
import Home from './Home';

class App extends Component{
  constructor(props)
  {
    super(props);
    this.state={
      user : {}
    }
  }
  componentDidMount()
  {
    this.authListener();
  }
  authListener(){
    fire.auth().onAuthStateChanged((user)=>{
      if(user)
      {
        this.setState({user})
      }
      else{
        this.setState({user : null})
      }
    })
  }

  render(){
    return (
      <div className="App">
        {this.state.user ? (<Home/>) : (<Login/>)}
      </div>
    );
  }
}

// import HomeScreen from './screens/HomeScreen';
// import ProductScreen from './screens/ProductScreen';

// function App() {

//   const openMenu = () =>{
//     document.querySelector(".sidebar").classList.add('open');
//   }

//   const closeMenu = () =>{
//     document.querySelector(".sidebar").classList.remove('open');
//   }

//   return (
//   <BrowserRouter>
//       <div className="grid-container">
//       <header className="header">
//         <div className="brand">
//           <button onClick={openMenu}>
//             &#9776;
//           </button>
//           <Link to="/"> Airbnb Clone </Link>
//         </div>
//         <div className="header-links">
//           <a href="cart.html">Cart</a>
//           <a href="signin.html">Sign In</a>
//         </div>
//       </header>
//       <aside className="sidebar">
//         <h3>Shopping Categories</h3>
//         <button className="sidebar-close-button" onClick={closeMenu}>x</button>
//         <ul>
//           <li>
//             <a href="index.html">Pants</a>
//           </li>

//           <li>
//             <a href="index.html">Shirts</a>
//           </li>

//         </ul>
//       </aside>
//       <main className="main">
//         <div className="content">
//           <Route path="/product/:id" component = {ProductScreen} />
//           <Route path="/" exact={true} component = {HomeScreen} />
//         </div>

//       </main>
//       <footer className="footer">
//         All right reserved.
//       </footer>
//     </div>
//   </BrowserRouter>
//   );
// }

export default App;
