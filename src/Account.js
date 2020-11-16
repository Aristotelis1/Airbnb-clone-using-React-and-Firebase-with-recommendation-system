import React , { Component } from "react";
import fire from "./config/Fire";
import { BrowserRouter, Route, Link } from 'react-router-dom';



class Account extends Component{

    constructor(props)
    {
        super(props)
        this.state={
            email : "",
            username : "",
            phone : "",
            role : ""
        }
    }

    getAccountInfo(){
        var db = fire.firestore();
        var user = fire.auth().currentUser;

        var docRef = db.collection("userDetails").doc(user.email);
        docRef.get().then(function(doc) {
            if (doc.exists) {
                console.log("Document data:", doc.data());
                this.state.email = user.email;
                this.state.username = doc.data.name;
                this.state.phone = doc.data.phoneNumber;
                this.state.role = doc.data.role;
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
    }


    render(){
        return(
            <BrowserRouter>
                <div>{this.state.email}</div>
                <div>{this.state.phone}</div>
                <div>{this.state.username}</div>
                <div>{this.state.role}</div>
            </BrowserRouter>
        )
    }
}