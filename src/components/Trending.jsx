import { initializeApp } from "firebase/app";
import { count, getFirestore } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore"; 


    
const addSearchTerm = (term) => {
    if {term}==}
    try {
    const docRef = await addDoc(collection(db, "users"), {
        movie: "${term}",
        count: 1
    });
    console.log("Document written with ID: ", docRef.id);
    } catch (e) {
    console.error("Error adding document: ", e);
    }
}