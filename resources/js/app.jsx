import React from 'react';
import { createRoot } from 'react-dom/client'
import {RouterProvider} from "react-router-dom";
import router from './routes.jsx';
import 'bootstrap/dist/css/bootstrap.css';
import '../css/app.css'
export default function App(){
    return(
        <React.StrictMode>
             <RouterProvider router={router} />
        </React.StrictMode>
    );
}

if(document.getElementById('root')){
    createRoot(document.getElementById('root')).render(<App />)
}