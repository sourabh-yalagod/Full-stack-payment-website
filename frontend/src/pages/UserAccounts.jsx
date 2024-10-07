import React, { useState } from "react";
import Heading from "../components/Heading";
import { useNavigate, useParams } from "react-router-dom";
import { axiosInstance } from "../utilities/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import PendingSkeleton from "../utilities/PendingSkeleton";
import ErrorSkeleton from "../utilities/ErrorSkeleton";
import { Eye, EyeOff } from "lucide-react";

const UserAccounts = () => {
  const { userId } = useParams();
  const [showBalance, setShowBalance] = useState(false);
  const navigate = useNavigate();
  const userAccounts = async () => {
    const response = await axiosInstance.get(`/user/user-account/${userId}`);
    return response.data;
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["userAccounts", userId],
    queryFn: userAccounts,
  });

  if (isError) {
    return <ErrorSkeleton />;
  }

  if (isLoading) {
    return <PendingSkeleton />;
  }
  const { user } = data || {};
  return (
    <div className="min-h-screen p-5 w-full">
      <Heading
        style={"font-bold text-3xl"}
        text={`Details of '${user.username.toUpperCase()}'`}
      />
      <div className="w-full max-w-4xl p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md mx-auto my-6">
        <div className="flex items-center justify-between border-b pb-4 mb-4">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 flex items-center justify-center rounded-full bg-blue-500 text-white text-xl">
              {user?.name?.[0].toUpperCase()}
            </div>
            <div>
              <h2 className="text-lg font-semibold dark:text-white">
                {user?.name}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                @{user?.username}
              </p>
            </div>
          </div>
          <p className="text-sm text-gray-400 dark:text-gray-500">
            Customer ID : {user?._id}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex gap-2 items-center">
            <h4 className="text-sm font-medium text-gray-600 dark:text-gray-300">
              Name :
            </h4>
            <p className="text-sm dark:text-white">{user?.name}</p>
          </div>
          <div className="flex gap-2 items-center">
            <h4 className="text-sm font-medium text-gray-600 dark:text-gray-300">
              Email :
            </h4>
            <p className="text-sm dark:text-white">{user?.email}</p>
          </div>
          <div className="flex gap-2 items-center">
            <h4 className="text-sm font-medium text-gray-600 dark:text-gray-300">
              Created At
            </h4>
            <p className="text-sm dark:text-white">
              {new Date(user?.createdAt).toLocaleDateString()}
            </p>
          </div>

          <div className="flex gap-2 items-center">
            <h4 className="text-sm font-medium text-gray-600 dark:text-gray-300">
              Updated At
            </h4>
            <p className="text-sm dark:text-white">
              {new Date(user?.updatedAt).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="mt-10">
          <h4 className="text-2xl dark:text-white text-center">
            Bank Accounts beloges to {user?.username}
          </h4>
          <hr className="w-full py-4" />
          <h4 className="text-sm font-semibold dark:text-white">
            Note : please select the account to send / Receive Money
          </h4>
          <h5
            onClick={() => setShowBalance(!showBalance)}
            className="flex items-center gap-3 cursor-pointer pt-4"
          >
            Show Balance :{" "}
            {showBalance ? (
              <Eye className="size-4" />
            ) : (
              <EyeOff className="size-4" />
            )}
          </h5>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            {user?.accounts?.map((account, index) => (
              <div
                onClick={() => navigate(`/transfer-money/${account._id}`)}
                key={index}
                className="p-4 hover:shadow-[0.2px_0.2px_10px_1px_black] border hover:scale-95 transition-all cursor-pointer space-y-1 rounded-lg dark:border-gray-700 dark:bg-gray-700 bg-gray-100"
              >
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  Account {index + 1}
                </p>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  Bank Account No : {account?._id}
                </p>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  Bank : {account?.name}
                </p>
                <p className="text-sm dark:text-white">
                  Location : {account?.location || "No details available"}
                </p>
                <p className="text-sm flex gap-5 items-center dark:text-white">
                  Balance :{" "}
                  {showBalance
                    ? account?.balance
                    : "******" || "No details available"}
                </p>
                <p className="text-sm dark:text-white">
                  Created Date :{" "}
                  {new Date(account?.createdAt).toDateString() ||
                    "No details available"}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAccounts;
