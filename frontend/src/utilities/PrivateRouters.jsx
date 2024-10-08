import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { userAuth } from "./User";

const PrivateRouters = () => {
  const token = userAuth();

  if (!token) {
    return <Navigate to="/signin" />;
  }

  return <Outlet />;
};

export default PrivateRouters;
