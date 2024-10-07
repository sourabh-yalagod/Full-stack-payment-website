import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import Heading from "../components/Heading";
import { axiosInstance } from "../utilities/axiosInstance";
import { User, Coins, Building } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { ToastSuccess, ToastWarning } from "../utilities/Toast";

const Deposite = () => {
  const [accounts, setAccounts] = useState([]);
  const [paylaod, setPayload] = useState({});
  const [amount, setAmount] = useState(null);
  const { userId } = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setPayload({ ...paylaod, amount: data.amount });
    const response = await axiosInstance.patch(
      `/bank/deposite-money/${paylaod?.bankId}`,
      { amount: data?.amount }
    );
    console.log(response?.data);
    if (response?.data?.success) {
      ToastSuccess(response?.data?.message);
    } else {
      ToastWarning(response?.data?.message);
    }
  };
  const userAccounts = async () => {
    const response = await axiosInstance.get(`/user/user-account/${userId}`);
    return response?.data;
  };

  const { data } = useQuery({
    queryKey: ["userAccounts", userId],
    queryFn: userAccounts,
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    if (data) {
      setAccounts(data?.user?.accounts || []);
    }
  }, [data, userId]);

  return (
    <div className="min-h-screen grid place-items-center w-full">
      <form
        className="relative shadow-[0.2px_0.2px_10px_0.01px_black] max-w-[500px] w-full border p-5 rounded-xl space-y-7"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Heading text={"Please select the Receiver and Enter the Amount"} />
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
            <Heading text="Deposite to " />
          </div>
          <div className="flex items-center gap-2">
            <Building />
            <select
              {...register("bank", {
                required: "Bank is required",
                validate: (value) => value !== "none" || "Please select a Bank",
              })}
              defaultValue={"none"}
              className="transition-all bg-transparent border delay-700 p-1 rounded-md"
            >
              <option value="none" disabled>
                None
              </option>
              {accounts?.map((account) => (
                <option
                  className="dark:text-black bg-transparent"
                  key={account?._id}
                  onClick={(pre) => setPayload({ ...pre, bankId: account._id })}
                  value={account.name}
                >
                  {account?.name}
                </option>
              ))}
            </select>
            {errors.bank && (
              <p className="absolute text-red-500 text-sm -bottom-7 right-1">
                {errors.bank.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4 justify-around">
          <Button
            text={`$ Deposite`}
            // onclick={()=>}
            className={"bg-green-700 text-white"}
            type="submit"
          />
          <Button
            text={`Back`}
            onclick={()=>navigate(-1)}
            className={"bg-red-700 text-white"}
          />
          <Button
            text={`View Profile`}
            onclick={() => navigate(`/user-accounts/${userId}`)}
            // onclick={()=>}
            className={"bg-green-700 text-white"}
            type="submit"
          />
        </div>
      </form>
    </div>
  );
};

export default Deposite;
