import React from 'react';

const TravelStatus = ({ status, date }) => {
  return (
    <div className="flex items-center space-x-2 bg-secondary/10 px-3 py-1 rounded-full text-secondary text-xs font-bold">
      <span className="animate-pulse w-2 h-2 rounded-full bg-secondary"></span>
      <span>{status} · {date}</span>
    </div>
  );
};

export default TravelStatus;
