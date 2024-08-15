import React from "react";
import { Outlet, redirect } from "react-router-dom";
import customFetch from "../utils/customFetch";

export const loader = async () => {
  try {
    const { data } = await customFetch.get("/users/current-user");
    console.log(data.user.role);
    if (data.user.role === "Principal") {
      return redirect("/dashboard/principal");
    }else if (data.user.role === "Teacher"){
        return redirect("/dashboard/teacher");
    }else{
        return redirect("/dashboard/student");
    }
    return data;
  } catch (error) {
    return redirect("/");
  }
};

const Dashboard = () => {
  return (
    <div>
      dashboard
    </div>
  );
};

export default Dashboard;
