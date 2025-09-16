import './index.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from './router'; 
import {UserProvider} from './UserContext.jsx'
import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyCzA641YzEP11HusDQWVvItzbrF7Ih0B8Q",
  authDomain: "full-stack-react-23346.firebaseapp.com",
  projectId: "full-stack-react-23346",
  storageBucket: "full-stack-react-23346.firebasestorage.app",
  messagingSenderId: "169126658090",
  appId: "1:169126658090:web:983628056b806c142ac353"
};
const app = initializeApp(firebaseConfig);

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
        <RouterProvider router={router} />
    </UserProvider>
  </React.StrictMode>
);
