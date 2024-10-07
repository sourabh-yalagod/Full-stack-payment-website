import React from "react";
import { useForm } from "react-hook-form";
import InputBox from "../components/InputBox";
import { Lock, Mail, PersonStandingIcon, User } from "lucide-react";
import { axiosInstance } from "../utilities/axiosInstance";

import { Link, useNavigate } from "react-router-dom";
import { ToastSuccess, ToastWarning } from "../utilities/Toast";
import Button from "../components/Button";

const Register = () => {
  const navigate = useNavigate();
  const nagivate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const response = await axiosInstance.post("/user/register", data);
    if (response.data.success) {
      ToastSuccess(response?.data?.message);
      navigate("/signin");
    } else {
      nagivate("/signin");
      ToastWarning(response?.data?.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border-slate-400 pb-4 border-[1px] w-full rounded-lg max-w-[450px]"
      >
        <div className="flex w-full py-6 items-center justify-between px-4">
          <h1 className="font-extrabold text-2xl">Create Account</h1>
          <div>
            <img
              className="size-11 rounded-full"
              src="https://m.economictimes.com/thumb/msid-107312198,width-1200,height-900,resizemode-4,imgsize-6574/paytm-etonline.jpg"
              alt=""
            />
          </div>
        </div>
        <InputBox
          icon={<PersonStandingIcon />}
          keys="name"
          label="name"
          placeholder="name"
          {...register("name", { required: "name is required" })}
        />
        {errors.name && (
          <p className="text-red-500 text-xs pl-1">{errors.name.message}</p>
        )}
        <InputBox
          icon={<User />}
          keys="username"
          label="Username"
          placeholder="username"
          {...register("username", { required: "Username is required" })}
        />
        {errors.username && (
          <p className="text-red-500 text-xs pl-1">{errors.username.message}</p>
        )}

        <InputBox
          keys="email"
          label="Email"
          type="email"
          icon={<Mail />}
          placeholder="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Invalid email address",
            },
          })}
        />
        {errors.email && (
          <p className="text-red-500 text-xs pl-1">{errors.email.message}</p>
        )}

        <InputBox
          icon={<Lock />}
          keys="password"
          label="Password"
          type="password"
          placeholder="password"
          {...register("password", { required: "Password is required" })}
        />
        {errors.password && (
          <p className="text-red-500 text-xs pl-1">{errors.password.message}</p>
        )}

        <div className="w-full text-[15px] py-5 flex justify-around gap-3 text-white">
          <Button
            type="submit"
            // className="border bg-gradient-to-bl from-blue-600 bg-opacity-90 to-pink-600 rounded-sm px-2 p-1"
            text="Create User"
            className={"bg-blue-700"}
          />
          <Button
            type="reset"
            onclick={() => reset()}
            text="Clear"
            className={"bg-red-700"}
          />
        </div>
        <div className="flex gap-3 mx-auto w-full justify-center py-2">
          <p>
            have already account{" "}
            <Link className="underline pl-1 text-blue-800" to={"/signin"}>
              Sign-In
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
