"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { FC } from "react";

interface ProviderWrapperProps {
  children: React.ReactNode;
}
const queryClient = new QueryClient();
export const ProviderWrapper: FC<ProviderWrapperProps> = ({ children }) => {
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </SessionProvider>
  );
};
