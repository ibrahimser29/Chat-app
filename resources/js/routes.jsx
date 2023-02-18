import React from 'react'
import {createBrowserRouter} from "react-router-dom";
import Login from "./pages/Login.jsx";
const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
]);
export default router;