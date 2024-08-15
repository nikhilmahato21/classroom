import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login, { action } from "./pages/Login";

import Dashboard, { loader } from "./pages/Dashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import PrincipalDashboard from "./pages/PrincipalDashboard";
import StudentDashbaord from "./pages/StudentDashbaord";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    action: action,
  },

  {
    path: "dashboard",
    element: <Dashboard />,
    loader:loader,
    
  },
  {
    path: "dashboard/principal",
    element: <PrincipalDashboard/>,
  },
  {
    path: "dashboard/teacher",
    element: <TeacherDashboard />,
  },
  {
    path: "dashboard/student",
    element: <StudentDashbaord />,
  },
]);

const App = () => {
  return <RouterProvider router={router}></RouterProvider>;
};

export default App;
