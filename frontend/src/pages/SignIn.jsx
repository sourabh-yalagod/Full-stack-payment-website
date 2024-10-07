import React from "react";
import { useForm } from "react-hook-form";
import InputBox from "../components/InputBox";
import { axiosInstance } from "../utilities/axiosInstance";
import { Link, useNavigate } from "react-router-dom";
import { ToastSuccess, ToastWarning } from "../utilities/Toast";
import Button from "../components/Button";
import { Lock, Mail } from "lucide-react";
import Heading from "../components/Heading";

const SignIn = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const response = await axiosInstance.post(`/user/signin`, data);
    if (response.data.success) {
      ToastSuccess(response?.data?.message);
      localStorage.setItem("token", response?.data?.token);
      navigate("/");
    } else {
      ToastWarning(response?.data?.message);
    }
  };

  return (
    <div className="min-h-screen w-full grid place-items-center px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border-slate-400 shadow-[0.1px_0.1px_6px_0.01px_black] space-y-3 border-[1px] w-full p-3 rounded-lg max-w-[550px]"
      >
        <div className="flex w-full py-2 items-center justify-between px-4">
          <Heading text="Sign-In" />
          <div>
            <img
              className="size-10 rounded-full"
              src="https://m.economictimes.com/thumb/msid-107312198,width-1200,height-900,resizemode-4,imgsize-6574/paytm-etonline.jpg"
              alt=""
            />
          </div>
        </div>

        <InputBox
          keys="email"
          label="Email"
          type="text"
          icon={<Mail className="size-5" />}
          placeholder="Email or Username"
          {...register("identifier", {
            required: "Email or Username is required",
          })}
        />
        {errors.identifier && (
          <p className="text-red-500 text-xs pl-1">
            {errors.identifier.message}
          </p>
        )}
        <InputBox
          keys="password"
          icon={<Lock className="size-5" />}
          label="Password"
          type="password"
          placeholder="password"
          {...register("password", { required: "Password is required" })}
        />
        {errors.password && (
          <p className="text-red-500 text-xs pl-1">{errors.password.message}</p>
        )}

        <div className="w-full pt-5 text-[15px] flex justify-around gap-3 text-white">
          <Button
            type="reset"
            onclick={() => reset()}
            text="Clear"
            className={"bg-red-700"}
          />
          <Button
            type="submit"
            // className="border bg-gradient-to-bl from-blue-600 bg-opacity-90 to-pink-600 rounded-sm px-2 p-1"
            text="Sign-In"
            className={"bg-blue-700"}
          />
          <Button
            type="button"
            onclick={() => navigate(-1)}
            // className="border bg-gradient-to-bl from-blue-600 bg-opacity-90 to-pink-600 rounded-sm px-2 p-1"
            text="Back"
            className={"bg-green-700"}
          />
        </div>
        <div className="flex gap-3 mx-auto w-full justify-center py-2">
          <p>
            don't have account{" "}
            <Link className="underline pl-1 text-blue-800" to={"/register"}>
              Sign-Up
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
