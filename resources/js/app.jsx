import React from 'react';
import { createRoot } from 'react-dom/client'
import '../css/app.css'
export default function App(){
    return(
        <h1>How To Install React in Laravel aa with Vite</h1>
    );
}

if(document.getElementById('root')){
    createRoot(document.getElementById('root')).render(<App />)
}