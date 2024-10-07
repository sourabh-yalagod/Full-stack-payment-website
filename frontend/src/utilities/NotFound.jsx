import React from "react";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate()
    return (
    <div className="h-screen grid">
      <div className="animate-pulse space-y-6 flex flex-col items-center mt-20">
        <div className="font-extrabold text-[50px] sm:text-[60px] md:text-[80px]">
          Oops . . . !
        </div>
        <div className="font-bold text-[40px]">404 Page.</div>
        <Button
          onclick={() => navigate(0)}
          text={"Refresh Page"}
          className="bg-yellow-600"
        />
        <Button
          onclick={() => navigate(-1)}
          text={"Go back"}
          className="bg-violet-700"
        />
        <Button
          onclick={() => navigate("/home")}
          text={"Home Page"}
          className="bg-blue-600"
        />
      </div>
    </div>
  );
};

export default NotFound;
