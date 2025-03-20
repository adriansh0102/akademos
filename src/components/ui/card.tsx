import React, { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
}

const Card: React.FC<CardProps> = ({ children }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white p-4 text-black">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-lg p-6">
        {children}
      </div>
    </div>
  );
};

export default Card;