// main.jsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from './router'; // 👈 this is new
import {UserProvider} from './UserContext.jsx'
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCzA641YzEP11HusDQWVvItzbrF7Ih0B8Q",
  authDomain: "full-stack-react-23346.firebaseapp.com",
  projectId: "full-stack-react-23346",
  storageBucket: "full-stack-react-23346.firebasestorage.app",
  messagingSenderId: "169126658090",
  appId: "1:169126658090:web:983628056b806c142ac353"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
        <RouterProvider router={router} />
    </UserProvider>
  </React.StrictMode>
);
