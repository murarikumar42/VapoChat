# VapoChat

VapoChat is a chatting app built with [React Native](https://reactnative.dev/), [React Native Elements](https://reactnativeelements.com/) and [Firebase](https://firebase.google.com/).

Features:
- Routing
- User authentication: Register/Login/Logout
- Creating group
- Send message to group
- Chat functionality: writing and receiving messages from your friends

This project is deployed on firebase: [VapoChat](https://vapochat-build.web.app/)
- Test user with credential `murari@gmail.com`/`123456`


## Start the app
Update firebase properties in `VapoChat/firebase.js`:
```bash
  apiKey: "Enter_firebase_api_key",
  authDomain: "Enter_domain_name",
  projectId: "Enter_project_id",
  storageBucket: "Enter_storage_bucket_id",
  messagingSenderId: "Enter_message_sender_id",
  appId: "Enter_app_id"
```
To start the app you need to enter the `VapoChat` folder:

```bash
$ cd VapoChat
```

Install all dependencies:

```bash
$ npm install
```

Run the app in the development mode:

```bash
$ npm start
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


