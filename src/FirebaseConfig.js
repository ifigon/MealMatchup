import firebase from 'firebase';

// Firebase Config
var config = {
    apiKey: 'AIzaSyDkGr1MbN9tyX9ATW5gX-8_7mk2lCcuPTc',
    authDomain: 'foodwaste-dev.firebaseapp.com',
    databaseURL: 'https://foodwaste-dev.firebaseio.com',
    projectId: 'foodwaste-dev',
    storageBucket: 'foodwaste-dev.appspot.com',
    messagingSenderId: '63358892458'
};
firebase.initializeApp(config);

export const auth = firebase.auth();
export const accountsRef = firebase.database().ref('accounts');
export const deliveriesRef = firebase.database().ref('deliveries');
export const deliveryIndicesRef = firebase.database().ref('delivery_indices');
export const donatingAgenciesRef = firebase.database().ref('donating_agencies');
export const manualDeliveriesRef = firebase.database().ref('manual_deliveries');
export const umbrellasRef = firebase.database().ref('umbrellas');
export default firebase;