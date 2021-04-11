import * as firebase from 'firebase';
import "firebase/firestore";
import {Shop} from "../types/shop"
import Constants from "expo-constants"
// Initialize Firebase if it has not been initialized yet.
if (!firebase.apps.length) {
    // Initialize Firebase
    firebase.initializeApp(Constants.manifest.extra.firebase);
}

export const getShops = async() => {
    const snapshot = await firebase.firestore().collection("shops").get()
    const shops = snapshot.docs.map(doc => doc.data() as Shop);
    return shops
}