import React, { useState, useEffect } from 'react';
import { Link, Route } from 'react-router-dom';
import fire from "../config/Fire";

function ChatScreen(props){

    const [msg, setMsg] = useState("");
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        var db = fire.firestore();
        var msgs = [];
  
        // const fetchData = async () => {
        //   const {data} = await axios.get(`http://localhost:5000/api/products`);
        //   setProduct(data);
        // }
        // fetchData();
        const user = fire.auth().currentUser;
  
        const unsubscribe = db.collection("airbnbs").doc(props.location.aboutProps.id).collection("messages").where("user_email","==",user.email).get().then(function(querySnapshot) {
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

    //console.log(props.location.aboutProps.id);

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

    return  (
        <div>
            { messages.map(doc => (
                <div className="chat-form" key={doc.id}>
                    <p>
                    {doc.message}
                    </p>
                </div>
            ))}
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
    )
}

export default ChatScreen;