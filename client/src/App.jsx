import React from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from './pages/Login';
import PrincipalDasbhoard from './pages/PrincipalDasbhoard';


const router = createBrowserRouter([
    {
      path: '/',
      element: <Login/>
    },
    {
      path:"/principal",
      element:<PrincipalDasbhoard/>
    }
])


const App = () => {
  return (
    <RouterProvider router={router}></RouterProvider>
  )
}

export default App