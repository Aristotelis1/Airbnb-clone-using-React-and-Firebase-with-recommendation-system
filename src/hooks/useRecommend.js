import fire from "../config/Fire";
import { useState, useEffect } from 'react';
import useFirestore from "./useFirestore";


// recommendations for each user

const useRecommend = () => {

    const [docs, setDocs] = useState([]);
    const [finalDoc, setFinal] = useState([]);

    useEffect(() => {
        let db = fire.firestore();
        var user = fire.auth().currentUser;
        let documents = [];

        const unsub = db.collection('recommendations')
            .where("user_email","==",user.email)
            .orderBy('rating', 'desc')
            .limit(5)
            .onSnapshot((snap) => {
                snap.forEach(doc => {
                    documents.push({...doc.data(), id: doc.id});
                });
                setDocs(documents);
            });

            return () => unsub();

    }, ['recommendations']);

    return { docs }
}

export default useRecommend;