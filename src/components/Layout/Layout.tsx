import React from "react";
import { Header } from "../Header/Header";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FunctionComponent<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <div className="my-20 mx-auto flex flex-col">{children}</div>
    </>
  );
};
