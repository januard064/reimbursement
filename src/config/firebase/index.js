import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';

const firebaseConfig = {
    apiKey: "AIzaSyCh_Q9GhHnvSZlS46RDbm9eZ78nBx4fqlA",
    authDomain: "reimbursement-c71e6.firebaseapp.com",
    projectId: "reimbursement-c71e6",
    storageBucket: "reimbursement-c71e6.appspot.com",
    messagingSenderId: "413802675336",
    appId: "1:413802675336:web:877252293e79d04c28f33d",
    measurementId: "G-NK851QZQS5"
  };

  firebase.initializeApp(firebaseConfig);

  export const database = firebase.database();

  export default firebase;