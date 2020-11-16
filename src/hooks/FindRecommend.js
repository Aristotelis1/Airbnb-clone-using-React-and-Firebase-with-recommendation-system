import fire from "../config/Fire";


const FindRecommend = (recommends) => {

    //const [docs, setDocs] = useState([]);

    let airbnbs = [];

    if(recommends.length > 0)
    {
        let db = fire.firestore();

        recommends.forEach(function(rec) {
            console.log(rec.airbnb)
            var docRef = db.collection("airbnbs").doc(rec.airbnb);

            docRef.get().then(function(doc) {
                if (doc.exists) {
                    console.log("Document data:", doc.data());
                    airbnbs.push({...doc.data(), id: doc.id});
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            })
            .catch(function(error) {
                console.log("Error getting document:", error);
            });

        });

        console.log(airbnbs[0])
    }

    return { airbnbs }
}

export default FindRecommend;