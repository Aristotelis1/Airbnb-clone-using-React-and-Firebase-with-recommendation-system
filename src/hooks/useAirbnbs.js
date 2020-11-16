import fire from "../config/Fire";
import { useState, useEffect } from 'react';

// return users airbnbs
const useAirbnbs = () => {

    const [docs, setDocs] = useState([]);

    useEffect(() => {
        let db = fire.firestore();
        var user = fire.auth().currentUser;

        const unsub = db.collection('airbnbs').where("user_email", "==", user.email)
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

    }, ['airbnbs']);

    return { docs };

}

export default useAirbnbs;