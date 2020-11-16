import fire from "../config/Fire";
import { useState, useEffect } from 'react';

// return users airbnbs
const useBookings = () => {

    const [docs, setDocs] = useState([]);

    useEffect(() => {
        let db = fire.firestore();
        var user = fire.auth().currentUser;

        const unsub = db.collection('bookings').where("user_email", "==", user.email).where("rated", "==", 0)
            .onSnapshot((snap) => {
                let documents = [];
                snap.forEach(doc => {
                    documents.push({...doc.data(), id: doc.id});
                });
                setDocs(documents);
            });

        // this is a cleanup function that react will run when
        // a component using the hook unmounts
        return () => unsub();

    }, ['bookings']);

    return { docs };

}

export default useBookings;