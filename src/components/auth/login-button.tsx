"use client";
import React from 'react';
import { useRouter } from 'next/navigation';

interface LoginButtonProps {
  children: React.ReactNode;
}

const LoginButton: React.FC<LoginButtonProps> = ({ children }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push('/sign-in');
  };

  return (
    <div>
      <span onClick={handleClick} className="">
        {children}
      </span>
    </div>
  );
};

export default LoginButton;