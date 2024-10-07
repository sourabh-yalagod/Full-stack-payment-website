import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import Heading from "../components/Heading";
import { axiosInstance } from "../utilities/axiosInstance";
import { User, Coins, LucideBuilding2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { userAuth } from "../utilities/User";
import { useParams } from "react-router-dom";
import { ToastSuccess, ToastWarning } from "../utilities/Toast";
const Transactions = () => {
  const receiverBankId = useParams().bankId;

  const [accounts, setAccounts] = useState([]);
  const [bankId, setBankId] = useState(null);
  const [amount, setAmount] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const userAccounts = async () => {
    const response = await axiosInstance.get(
      `/user/user-account/${userAuth()}`
    );
    return response?.data;
  };
  const onSubmit = async (data) => {
    const response = await axiosInstance.patch(
      `bank/transfer/${receiverBankId}`,
      { senderBankId: bankId, amount: data?.amount }
    );
    if (response.data.success) {
      ToastSuccess(response.data.message);
    } else {
      ToastWarning(response.data.message);
    }
  };
  const { data } = useQuery({
    queryKey: ["userAccounts"],
    queryFn: userAccounts,
  });
  useEffect(() => {
    setAccounts(data?.user?.accounts);
  }, [data, bankId]);

  return (
    <div className="min-h-screen grid place-items-center w-full">
      <form
        className="relative shadow-[0.2px_0.2px_10px_0.01px_black] max-w-[500px] w-full border p-5 rounded-xl space-y-7"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Heading text={"Please select your account and Enter the Amount"} />
        <div className="relative">
          <InputBox
            {...register("amount", {
              required: "Amount is required",
              valueAsNumber: true,
              validate: (value) => value > 0 || "Amount must be positive",
            })}
            type="text"
            placeholder="$ Amount"
          />
          {errors.amount && (
            <p className="absolute text-red-500 text-xs -bottom-3 left-2">
              {errors.amount.message}
            </p>
          )}
        </div>

        <div className="relative flex gap-5 justify-between w-full">
          <div className="flex items-center gap-2">
            <Coins />
            <Heading text="Transfer from" />
          </div>
          <div className="flex items-center gap-2">
            <LucideBuilding2 />
            <select
              {...register("receiver", {
                required: "Receiver is required",
                validate: (value) =>
                  value !== "none" || "Please select a person",
              })}
              defaultValue={"none"}
              className="transition-all bg-transparent border delay-700 p-1 rounded-md"
            >
              <option value="none" disabled>
                None
              </option>
              {accounts?.map((account) => (
                <option
                  onClick={() => setBankId(account?._id)}
                  className="text-black"
                  key={account?._id}
                  value={account.id}
                >
                  {account?.name}
                </option>
              ))}
            </select>
            {errors.receiver && (
              <p className="absolute text-red-500 text-sm -bottom-4 left-1">
                {errors.receiver.message}
              </p>
            )}
          </div>
        </div>

        <Button
          text={`$ Transfer`}
          className={"bg-green-700 text-white"}
          type="submit"
        />
      </form>
    </div>
  );
};

export default Transactions;
