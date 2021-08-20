import firebase from 'firebase/app'
import 'firebase/firestore';
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA1DZHHtkBMsLJkhy4VE0NeEnSoXwZGHVo",
  authDomain: "vapochat-build.firebaseapp.com",
  projectId: "vapochat-build",
  storageBucket: "vapochat-build.appspot.com",
  messagingSenderId: "216374402681",
  appId: "1:216374402681:web:996f5b93ed6e9fb6133ea8"
};

  let app;

  if(firebase.apps.length===0){
    app=firebase.initializeApp(firebaseConfig);
  }
  else{
    app=firebase.app(); 
  }

  const db=firebase.firestore();
  const auth=firebase.auth();

  export {db, auth} ;
  