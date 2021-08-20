import firebase from 'firebase/app'
import 'firebase/firestore';
import "firebase/auth";

const firebaseConfig = {
  apiKey: "Enter_firebase_apikey",
  authDomain: "vapochat-build.firebaseapp.com",
  projectId: "vapochat-build",
  storageBucket: "vapochat-build.appspot.com",
  messagingSenderId: "Enter_message_senderid",
  appId: "Enter_app_id"
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
  
