import React from "react";
import { CircleDollarSign } from "lucide-react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
const Users = ({ user }) => {
  const navigate = useNavigate();
  return (
    <div className="w-full flex px-3 justify-between dark:border-slate-400 border-[1px] items-center p-2 rounded-md shadow-[0.2px_0.2px_7px_0.1px_black]">
      <div className="w-full items-center flex gap-2">
        <p className="h-9 w-9 grid place-content-center text-xl rounded-full bg-slate-700 text-white">
          {user?.username[0].toUpperCase()}
        </p>
        <div className="grid text-[14px] sm:text-[16px] md:text-[18px] lg:text-[22px] place-items-center">
          <p>{user?.name}</p>
          <p className="text-[9px] sm:text-[12px] md:text-[15px] lg:text-[18px] ">
            @{user?.username}
          </p>
        </div>
      </div>
      <Button
        onclick={() => navigate(`/user-accounts/${user._id}`)}
        icon={<CircleDollarSign className="size-5" />}
        className={"bg-blue-600 text-white"}
        text="Inspect"
      />
    </div>
  );
};

export default Users;
