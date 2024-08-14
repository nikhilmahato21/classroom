import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login, { action } from "./pages/Login";

import Dashboard from "./pages/Dashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import PrincipalDashboard from "./pages/PrincipalDashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    action: action,
  },

  {
    path: "dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "principal",
        element: <PrincipalDashboard/>,
      },
      {
        path: "teacher",
        element: <TeacherDashboard />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router}></RouterProvider>;
};

export default App;
