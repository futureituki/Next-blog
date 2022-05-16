import firebase from 'firebase/app'
import 'firebase/auth';
import 'firebase/firestore';
import firebaseConfig from './firebase.config.js'
if(firebase.apps.length===0){
  firebase.initializeApp(firebaseConfig)
}
export const db = firebase.firestore();
export const auth = firebase.auth();


