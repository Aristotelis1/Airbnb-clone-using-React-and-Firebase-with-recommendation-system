import React, { useState, useEffect } from 'react';
import fire from "../config/Fire";
import { Link, Route } from 'react-router-dom';

function MessagesScreen(props) {

    const [messages, setMessages] = useState([]);
    const [msg, setMsg] = useState("");

    console.log(props.location.aboutProps.id)

    useEffect(() => {
        var db = fire.firestore();
        var msgs = [];

        const unsubscribe = db.collection("airbnbs").doc(props.location.aboutProps.id).collection("messages")
        .orderBy("user_email")
        .get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                msgs.push(doc.data())
                console.log(doc.id, "=>", doc.data());
                //console.log(doc.name);
            });
            setMessages(msgs);
    
        });
  
        return () => {
          //
        }

    }, []);


    const handleSubmit = (evt) => {
        evt.preventDefault();
        const user = fire.auth().currentUser;

        var db = fire.firestore();
        db.collection("airbnbs").doc(props.location.aboutProps.id).collection("messages").add({
            message: msg,
            user_email: user.email
        })

        alert("Your message was sent")
        

    }

    return (
        <div>
            { messages.map(doc => (
                <div className="chat-form" key={doc.id}>
                    <p>
                    message: {doc.message}
                    </p>
                    <li>
                        {doc.user_email} sent you a message
                    </li>
                    <form id="chat-form" onSubmit={handleSubmit}>
                    <input className = "change-form"
                                type="text"
                                value={msg}
                                placeholder = "Type your message"
                                onChange={e => setMsg(e.target.value)}
                    />
                    <input type="submit" value="Submit" />
                    </form>
                </div>
            ))}
        </div>
    )
}

export default MessagesScreen;