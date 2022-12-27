import React from "react";
import ReactDOM from "react-dom/client";
// import "./index.css";
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC5K9i_qPPGgjSt4OdDUq7db7OyLqLeEaY",
  authDomain: "birdstreak.firebaseapp.com",
  projectId: "birdstreak",
  storageBucket: "birdstreak.appspot.com",
  messagingSenderId: "327211715170",
  appId: "1:327211715170:web:e799e7b79a54c36e41df3b",
  measurementId: "G-45DTZ6PG4J",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
