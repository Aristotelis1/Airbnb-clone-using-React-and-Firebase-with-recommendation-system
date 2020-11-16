import React, { useState, useEffect } from 'react';
import fire from "../config/Fire";



function AccountScreen(props) {

    const [userDetails, setUserDetails] = useState();
    
    const [newName, setNewName] = useState("");
    const [newPhone, setNewPhone] = useState("");

    const HandleName = (evt) => {
        evt.preventDefault();
        var db = fire.firestore();
        var user = fire.auth().currentUser;

        if(user){
            db.collection("userDetails").doc(user.email).update({
                name: newName,
            })
        }

        alert("Name was changed");
    }

    const HandlePhone = (evt) => {
        evt.preventDefault();

        var db = fire.firestore();
        var user = fire.auth().currentUser;
        if(user){
            db.collection("userDetails").doc(user.email).update({
                phoneNumber: newPhone,
            })
        }
        alert("Phone number was changed");
    }

    useEffect(() => {


        var db = fire.firestore();
        var user = fire.auth().currentUser;

        if(user){

            const unsubscribe =  db.collection("userDetails").doc(user.email).onSnapshot((snapshot) =>  {
                // console.log("Snapshot", snapshot[0].data());
                // setUserDetails(snapshot[0].data());

                setUserDetails(snapshot.data());
                
            });

            return unsubscribe;
        }

    }, []);

    let user_email
    if(userDetails === undefined)
    {
        user_email = (<li>Loading...</li>)
    }else {
        // user_email = users.map(usr => {
        //     return (<li key={ usr.id }>{ usr.name }</li>)
        //   })
        
        user_email = (
            <li>
                email: {userDetails.email}, name: {userDetails.name}, phoneNumber: {userDetails.phoneNumber} 
            </li>)
    }
    
    return (
    <div>
        <h3>Account Info</h3>
        <ul> { user_email } </ul>
        <form onSubmit={HandleName}>
            Change your username:
            <input
            type="text"
            value={newName}
            placeholder = "type your new username"
            onChange={e => setNewName(e.target.value)}
            />
            <input type="submit" value="Submit" />
        </form>
        <form onSubmit={HandlePhone}>
            Change your phone number:
            <input
            type="text"
            value={newPhone}
            placeholder = "type your new phone number"
            onChange={e => setNewPhone(e.target.value)}
            />
            <input type="submit" value="Submit" />
        </form>

    </div>)
}


export default AccountScreen;