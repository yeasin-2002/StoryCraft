"use client";

import { SessionProvider } from "next-auth/react";
import { FC } from "react";

interface ProviderWrapperProps {
  children: React.ReactNode;
}

export const ProviderWrapper: FC<ProviderWrapperProps> = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};
