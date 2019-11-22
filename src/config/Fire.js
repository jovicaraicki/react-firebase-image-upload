import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const config = {
    apiKey: 'AIzaSyCTK23ApaKGed1T0q3zhnzE-qaZE65CFxE',
    authDomain: 'fb-cloud-functions-e686c.firebaseapp.com',
    databaseURL: 'https://fb-cloud-functions-e686c.firebaseio.com',
    projectId: 'fb-cloud-functions-e686c',
    storageBucket: 'fb-cloud-functions-e686c.appspot.com',
    messagingSenderId: '525147760480',
    appId: '1:525147760480:web:cb55106adba11ac0b56005'
}

const fire = firebase.initializeApp(config);

export default fire;