import React from "react";

import Navbar from "../../Components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import { RequireAuth } from "../RequireAuth/RequireAuth";
const Dashboard = () => {
  return (
    <>
      <RequireAuth>
        <Navbar />
        <Outlet />
      </RequireAuth>
    </>
  );
};

export default Dashboard;
