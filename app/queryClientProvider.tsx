"use client";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactNode } from "react";

const queryClient = new QueryClient();

type Props = {
  children: ReactNode;
};

export const AppQueryClientProvider = ({ children }: Props) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
