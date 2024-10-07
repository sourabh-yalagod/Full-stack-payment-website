import React from "react";
import { ModeToggle } from "../components/mode-toggle";
import { banks } from "../utilities/banks";
import { useNavigate } from "react-router-dom";
const Banks = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen p-6">
      <h1 className="text-2xl sm:text-4xl flex justify-between font-bold text-center mb-10 text-blue-700">
        <ModeToggle />
        <p>Open A Free account</p>
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {banks?.map((bank) => (
          <div
            key={bank?.id}
            onClick={() => navigate(`/create-bank-account/?bank=${bank?.name}`)}
            className="shadow-md border-slate-700 border-[2px] hover:shadow-lg duration-300 rounded-lg p-6 border-t-4 hover:scale-105 transition-all"
          >
            <h2 className="text-2xl font-semibold mb-3">{bank?.name}</h2>
            <p className="text-gray-400 mb-2">
              <span className="font-semibold">Branch:</span> {bank?.branch}
            </p>
            <p className="text-gray-400 mb-2">
              <span className="font-semibold">Location:</span> {bank?.location}
            </p>
            <p className="text-gray-400">
              <span className="font-semibold">Pincode:</span> {bank?.pincode}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Banks;
