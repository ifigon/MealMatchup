import firebase from 'firebase';

// Firebase Config
var config = {
    apiKey: "AIzaSyD3Xc6UzuD85FqkgStaJL72yb_WDQCIv0Y",
    authDomain: "uw-foodwaste.firebaseapp.com",
    databaseURL: "https://uw-foodwaste.firebaseio.com",
    projectId: "uw-foodwaste",
    storageBucket: "uw-foodwaste.appspot.com",
    messagingSenderId: "432006812093"
};
firebase.initializeApp(config);

export const auth = firebase.auth();
export default firebase;