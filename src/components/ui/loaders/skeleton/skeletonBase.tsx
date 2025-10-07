import React from "react";

const Skeleton = ({ className = "", width, height, rounded = "md" }) => {
  const roundedClasses = {
    none: "",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    full: "rounded-full",
  };

  return (
    <div
      className={`animate-pulse bg-gray-300 ${roundedClasses[rounded]} ${className}`}
      style={{ width, height }}
    />
  );
};

export default Skeleton;
