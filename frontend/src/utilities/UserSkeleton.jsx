import React from "react";

const UserSkeleton = ({ number = 7 }) => {
  const array = new Array(number).fill(null);
  return (
    <div className="space-y-4 px-4 mt-10"> 
      {array.map((e) => {
        return (
          <div key={Math.random()} className="w-full flex px-3 justify-between dark:border-slate-400 border-[1px] items-center p-2 rounded-md shadow-[0.2px_0.2px_7px_0.1px_black] animate-pulse">
            <div className="w-full items-center flex gap-2">
              <div className="h-9 w-9 rounded-full bg-slate-300 dark:bg-slate-600"></div>
              <div className="grid place-items-center">
                <div className="h-4 w-24 bg-slate-300 dark:bg-slate-600 rounded-md"></div>
                <div className="mt-2 h-3 w-16 bg-slate-300 dark:bg-slate-600 rounded-md"></div>
              </div>
            </div>
            <div className="h-10 w-24 bg-blue-300 dark:bg-blue-700 rounded-md"></div>
          </div>
        );
      })}{" "}
    </div>
  );
};

export default UserSkeleton;
