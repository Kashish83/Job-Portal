import React from "react";

const StatsCard = ({ title, value }) => {
  return (
    <div className="bg-white shadow p-4 rounded-md w-48 text-center transition transform hover:-translate-y-1 hover:shadow-lg">
      <h3 className="text-gray-500 text-sm">{title}</h3>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
    </div>
  );
};

export default StatsCard;
