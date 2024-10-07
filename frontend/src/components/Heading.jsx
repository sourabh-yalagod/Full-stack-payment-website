import React from "react";

const Heading = ({ text, style }) => {
  return (
    <h1 className={`font-semibold text-xl text-center ${style}`}>{text}</h1>
  );
};

export default Heading;
