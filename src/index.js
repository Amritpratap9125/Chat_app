import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBwrT4j6FUZ-uHXlGLqILO2DBPk39p2D54",
  authDomain: "chatapp-1f5de.firebaseapp.com",
  databaseURL: "https://chatapp-1f5de-default-rtdb.firebaseio.com",
  projectId: "chatapp-1f5de",
  storageBucket: "chatapp-1f5de.appspot.com",
  messagingSenderId: "223881689557",
  appId: "1:223881689557:web:dcdb60480764795927255c",
  measurementId: "G-VQL29RWXQ1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
