import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import InputBox from "../components/InputBox";
import { Code, CoinsIcon, Map } from "lucide-react";
import { axiosInstance } from "../utilities/axiosInstance";

import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ToastSuccess, ToastWarning } from "../utilities/Toast";
import Button from "../components/Button";
import Heading from "../components/Heading";
import { userAuth } from "../utilities/User";
import { banks } from "../utilities/banks";

const CreateBankAccount = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const bankName = queryParams.get("bank");
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const id = userAuth();
    setUserId(id);
  }, []);
  const onSubmit = async (data) => {
    data.owner = userId;
    console.log(data);
    const response = await axiosInstance.post(
      `/bank/create-bank-account`,
      data
    );
    if (response?.data?.success) {
      ToastSuccess(response.data.message);
      navigate("/home");
    } else {
      ToastWarning(response.data.message);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border-slate-400 p-2 shadow-[0.02px_0.8px_10px_0.2px_black] space-y-2 border-[1px] w-full rounded-lg max-w-[450px]"
      >
        <div className="flex w-full py-6 items-center justify-between px-4">
          <Heading text={"Create Bank Account"} />
          <div>
            <img
              className="size-11 rounded-full"
              src="https://m.economictimes.com/thumb/msid-107312198,width-1200,height-900,resizemode-4,imgsize-6574/paytm-etonline.jpg"
              alt=""
            />
          </div>
        </div>
        <select
          className="w-full text-slate-500 p-2 border-b-2 rounded-md border-slate-600 relative bg-transparent"
          {...register("name", { required: "Bank is required" })}
        >
          {bankName && <option defaultValue={bankName}>{bankName}</option>}
          {banks?.map((bank) => {
            return <option key={bank?.id}>{bank.name}</option>;
          })}
        </select>
        <InputBox
          icon={<CoinsIcon />}
          keys="balance"
          label="balance"
          placeholder="minimum balance"
          {...register("balance", { required: "minimum balance is required" })}
        />
        {errors.balance && (
          <p className="text-red-500 text-xs pl-1">{errors.balance.message}</p>
        )}

        <InputBox
          keys="location"
          label="location"
          type="location"
          icon={<Map />}
          placeholder="location"
          {...register("location", {
            required: "location is required",
          })}
        />
        {errors.location && (
          <p className="text-red-500 text-xs pl-1">{errors.location.message}</p>
        )}

        <InputBox
          icon={<Code />}
          keys="pincode"
          label="pincode"
          type="pincode"
          placeholder="pincode"
          {...register("pincode", { required: "pincode is required" })}
        />
        {errors.pincode && (
          <p className="text-red-500 text-xs pl-1">{errors.pincode.message}</p>
        )}

        <div className="w-full text-[15px] pt-4 grid p-1 gap-3 text-white">
          <Button
            type="submit"
            text="Create Bank Account"
            className={"bg-blue-700"}
          />
          <Button
            type="reset"
            onclick={() => reset()}
            text="Clear"
            className={"bg-red-700"}
          />
        </div>
      </form>
    </div>
  );
};

export default CreateBankAccount;
