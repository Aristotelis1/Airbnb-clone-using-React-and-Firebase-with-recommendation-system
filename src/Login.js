import React , { Component } from "react";
import fire from "./config/Fire";
import ControlPanelScreen from "./screens/ControlPanelScreen";
import Signup from './Signup'
import { BrowserRouter, Route, Link } from 'react-router-dom';

class Login extends Component{
constructor(props)
{
    super(props);
    // Get a reference to the database service
    //var database = fire.database();
    this.login = this.login.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.signup = this.signup.bind(this);
    this.state={
        email : "",
        password : "",
        name : "",
        phoneNumber : "",
        role : ""
    }
}

login(e){
    e.preventDefault();
    fire.auth().signInWithEmailAndPassword(this.state.email,this.state.password).then((u)=>{
        this.checkAdmin()
        console.log(u)
    }).catch((err)=>{
        console.log(err);
    })
}

writeUserData(name, email, phoneNumber, role) {
    //const userId = Math.floor(Math.random() * 1000); 
    var db = fire.firestore();

    db.collection("userDetails").doc(email).set({
        name: name,
        email : email,
        phoneNumber : phoneNumber,
        role : role
    })
    .then(function() {
        console.log("Document successfully written!");
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });
    
    // fire.database().ref('userDetails/' + userId).set({
    //   name: name,
    //   email: email,
    //   phoneNumber : phoneNumber,
    //   role : role
    // });
  }


signup(e){

    e.preventDefault();
    fire.auth().createUserWithEmailAndPassword(this.state.email,this.state.password).then((u)=>{
        this.writeUserData(this.state.name,this.state.email,this.state.phoneNumber, this.state.role)
        console.log(u)
    }).catch((err)=>{
        console.log(err);
    })
}
handleChange(e){
    this.setState({
        [e.target.name] : e.target.value
    })
}
render()
{
    return(
        <BrowserRouter>
        <div>
            <form>
                <input
                type="email"
                id="email"
                name="email"
                placeholder="enter email address"
                onChange={this.handleChange}
                value={this.state.email}
                />
                <input
                name="password"
                type= "password"
                onChange={this.handleChange}
                id="password"
                placeholder="enter password"
                value={this.state.password}
                />
                
                <button onClick={this.login} className = "signin">Login</button>
                <input
                type="email"
                id="name"
                name="name"
                placeholder="enter your username"
                onChange={this.handleChange}
                value={this.state.name}
                />
                <input
                name="phoneNumber"
                type= "email"
                onChange={this.handleChange}
                id="phoneNumber"
                placeholder="enter your phone"
                value={this.state.phoneNumber}
                />
                <input
                name="role"
                type= "email"
                onChange={this.handleChange}
                id="role"
                placeholder="enter your role between: leaseholder, viewer"
                value={this.state.role}
                />
                <select id="role" type="email">
                    <option value={this.state.role} onChange={this.handleChange}>Viewer</option>
                    <option value={this.state.role} onChange={this.handleChange}>Leaseholder</option>
                </select>

                <button onClick={this.signup} className = "signup">Signup</button>
            </form>
        </div>
        </BrowserRouter>
    )
}
}
export default Login;