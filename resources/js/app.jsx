import React from 'react';
import { createRoot } from 'react-dom/client'
import Login from './pages/Login';
import 'bootstrap/dist/css/bootstrap.css';
import '../css/app.css'
export default function App(){
    return(
        <Login />
    );
}

if(document.getElementById('root')){
    createRoot(document.getElementById('root')).render(<App />)
}