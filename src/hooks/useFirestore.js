import fire from "../config/Fire";
import { useState, useEffect } from 'react';


// return collection from database firestore
const useFirestore = (collection) => {
    const [docs, setDocs] = useState([]);

    useEffect(() => {
        let db = fire.firestore();

        const unsub = db.collection(collection)
            .orderBy('email', 'asc')
            .onSnapshot((snap) => {
                let documents = [];
                snap.forEach(doc => {
                    documents.push({...doc.data(), id: doc.id});
                });
                setDocs(documents);
            });

            return () => unsub();
            // this is a cleanup function that react will run when
            // a component using the hook unmounts
    }, [collection]);

    return { docs };
}

export default useFirestore;