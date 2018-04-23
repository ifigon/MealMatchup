import firebase from 'firebase';

// Firebase Config
var config = {
    apiKey: 'AIzaSyD3Xc6UzuD85FqkgStaJL72yb_WDQCIv0Y',
    authDomain: 'uw-foodwaste.firebaseapp.com',
    databaseURL: 'https://uw-foodwaste.firebaseio.com',
    projectId: 'uw-foodwaste',
    storageBucket: 'uw-foodwaste.appspot.com',
    messagingSenderId: '432006812093'
};
firebase.initializeApp(config);

export const auth = firebase.auth();
export const accountsRef = firebase.database().ref('accounts');
export const deliveriesRef = firebase.database().ref('deliveries');
export const deliveryIndicesRef = firebase.database().ref('delivery_indices');
export const donatingAgenciesRef = firebase.database().ref('donating_agencies');
export default firebase;