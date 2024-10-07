import React from "react";

const InputBox = React.forwardRef(
  (
    {
      label = "label",
      type = "text",
      placeholder = "placeholder",
      keys,
      icon,
      ...rest
    },
    ref
  ) => {
    return (
      <div key={keys} className="w-full relative p-1 py-2 max-w-[450px]">
        <input
          type={type}
          autoComplete="off"
          className="border-b-2 pb-1 bg-transparent pl-2 outline-none w-full border-slate-600 rounded-sm"
          placeholder={placeholder}
          ref={ref}
          {...rest}
        />
        <p className="absolute size-4 right-6 inset-y-2 cursor-pointer">
          {icon}
        </p>
      </div>
    );
  }
);

export default InputBox;
