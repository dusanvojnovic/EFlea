import React from "react";
import { Header } from "../Header/Header";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FunctionComponent<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};
