import React , { Component } from "react";
import fire from "./config/Fire";


class Signup extends Component {
    constructor(props)
{
    super(props);
    // Get a reference to the database service
    //var database = fire.database();
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

writeUserData(name, email, phoneNumber, role) {
    //const userId = Math.floor(Math.random() * 1000); 
    var db = fire.firestore();

    db.collection("userDetails").add({
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

render() {
    return(
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

                <button onClick={this.signup} className = "signup">Signup</button>

            </form>
        </div>
    )
}

}

export default Signup;