import React from "react";

const Button = ({ type, text, onclick, className, icon }) => {
  return (
    <button
      type={type}
      onClick={onclick}
      className={`${className} py-1 px-2 sm:px-4 sm:p-2 sm:text-[15px] font-semibold flex text-[14px] items-center max-w-fit gap-3 justify-center w-full rounded-sm`}
    >
      {icon}
      {text}
    </button>
  );
};

export default Button;
