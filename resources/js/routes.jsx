import React from 'react'
import {createBrowserRouter} from "react-router-dom";
import Chats from './pages/Chats.jsx';
import Login from "./pages/Login.jsx";
import Register from './pages/Register.jsx';
const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/chats",
      element: <Chats />,
    },
]);
export default router;