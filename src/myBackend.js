import axios from "axios";
import { addDoc, collection, getDoc, getDocs, query, where} from "firebase/firestore";
import { db } from "./firebaseApp";

const tokenKey = import.meta.env.VITE_SECRET_TOKEN

export const addTopic = async(name)=> {
    try {
        console.log(name);

        const collRef = collection(db, "topics")
        const q = query(collRef, where("name", "==", name)); // Kérdezd le azokat a dokumentumokat, amelyeknek a 'name' mezője megegyezik a paraméterrel
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            // Ha nem üres a querySnapshot, akkor már létezik ilyen nevű dokumentum
            console.log("Ez a téma már létezik!");
            return;
        }
        await addDoc(collRef, {name})
        
    } catch (error) {
        console.log(error); 
    }
}

export const addCard = async(topicId,card)=> {
    console.log(topicId);
    console.log(card);
    
    
    try {
        const subCollRef = collection(db, "topics", topicId, "cards")
        await addDoc(subCollRef, {...card})
    } catch (error) {
        console.log(error); 
    }
}

export const readTopicsOnce = async (setTopics, setLoading)=> {
    try {
        const docRef = collection(db, "topics")
        const snap = await getDocs(docRef)
        setTopics(snap.docs.map((d)=>({id:d.id, ...d.data()})))
        setLoading(false)
    } catch (error) {
        console.log("hiba a téma lekérésnél: ", error);
        return null
    }
}

export const readCardsOnce = async (topicId, setCards)=> {
    try {
        const subDocRef = collection(db, "topics", topicId, "cards")
        const snap = await getDocs(subDocRef)
        setCards(snap.docs.map((d)=>({id:d.id, ...d.data()})))
    } catch (error) {
        console.log("hiba a kártya lekérésnél: ", error);
        return []
    }
}