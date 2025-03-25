import React from "react";

interface AuthImagePatternProps {
  title: string;
  subtitle: string;
}

const AuthImagePattern: React.FC<AuthImagePatternProps> = ({ title, subtitle }) => {
  return (
    <div className="hidden lg:flex items-center justify-center bg-[#030F0F] p-12 relative overflow-hidden">
      {/* Floating Abstract Shapes */}
      <div className="absolute inset-0 flex justify-center items-center">
        <div className="relative w-64 h-64">
          <div className="absolute w-16 h-16 bg-primary/20 rounded-full top-0 left-0 animate-bounce"></div>
          <div className="absolute w-12 h-12 bg-secondary/30 rounded-lg bottom-4 right-8 animate-spin"></div>
          <div className="absolute w-20 h-20 bg-accent/20 rounded-xl top-12 right-12 animate-ping"></div>
          <div className="absolute w-24 h-24 bg-primary/40 rounded-full bottom-6 left-6 animate-pulse"></div>
        </div>
      </div>

      {/* Text Content */}
      <div className="relative z-10 max-w-md text-center">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="text-[#00DF82]/80 text-lg">{subtitle}</p>
      </div>
    </div>
  );
};

export default AuthImagePattern;
