import * as firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';
import Constants from 'expo-constants';

// Initialize Firebase if it has not been initialized yet.
if (!firebase.apps.length) {
    // Initialize Firebase
    firebase.initializeApp(Constants.manifest.extra.firebase);
}

export const getShops = async () => {
    const shopDoc = await firebase
        .firestore()
        .collection('shops')
        // .where('score', '>', 3)
        .orderBy('score', 'desc')
        .get();
    const shops = shopDoc.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    return shops;
};

export const signin = async () => {
    const userCredential = await firebase.auth().signInAnonymously();
    const { uid } = userCredential.user;
    const initialUser = {
        name: '',
        updatedAt: firebase.firestore.Timestamp.now(),
        createdAt: firebase.firestore.Timestamp.now(),
    };
    const userDoc = await firebase.firestore().collection('users').doc(uid).get();
    if (!userDoc.exists) {
        await firebase.firestore().collection('users').doc(uid).set(initialUser);
        return {
            id: uid,
            ...initialUser,
        };
    } else {
        return {
            id: uid,
            ...userDoc.data(),
        };
    }
};

export const updateUser = async (userId, params) => {
    await firebase.firestore().collection('users').doc(userId).update(params);
};

export const createReviewRef = async (shopId) => {
    // In some cases, it can be useful to create a document reference with an auto-generated ID, then use the reference later. For this use case, you can call doc():
    return await firebase.firestore().collection('shops').doc(shopId).collection('reviews').doc();
};

export const uploadImage = async (uri, path) => {
    // Turn an URI into a Blob
    const localUri = await fetch(uri);
    const blob = await localUri.blob();
    // Upload the image to Cloud Storage
    const ref = firebase.storage().ref().child(path);

    let downloadUrl = '';
    try {
        await ref.put(blob);
        downloadUrl = await ref.getDownloadURL();
    } catch (err) {
        console.log(err);
    }
    return downloadUrl;
};

export const getReviews = async (shopId) => {
    const reviewDocs = await firebase
        .firestore()
        .collection('shops')
        .doc(shopId)
        .collection('reviews')
        .orderBy('createdAt', 'desc')
        .get();
    return reviewDocs.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};
