
import React from 'react';

interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
}

const Logo = ({ className, width = 120, height = 120 }: LogoProps) => {
  return (
    <div className={`flex items-center justify-center bg-white rounded-lg p-2 ${className}`}>
      <img
        src="/lovable-uploads/f310098c-0344-443f-bd59-45246c3cdaca.png"
        alt="Yessal Laundry Logo"
        width={width}
        height={height}
        className="object-contain"
      />
    </div>
  );
};

export default Logo;
