import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const PrivateRouters = () => {
  const [id, setId] = useState(null);
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      console.log(decodedToken);
    }
  }, [token]);

  if (!token) {
    return <Navigate to="/signin" />;
  }

  return <Outlet />;
};

export default PrivateRouters;
