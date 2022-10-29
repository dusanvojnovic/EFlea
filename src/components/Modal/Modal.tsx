/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

export interface BackdropProps {
  onClick: () => void;
}

export const Backdrop: React.FunctionComponent<BackdropProps> = ({
  onClick,
}) => {
  return ReactDOM.createPortal(
    <div
      onClick={onClick}
      className="fixed top-0 left-0 z-20 h-full w-full bg-black/90"
    />,
    document.getElementById("backdrop")!
  );
};

export interface ModalOverlayProps {
  children: React.ReactNode;
}

export const ModalOverlay: React.FunctionComponent<ModalOverlayProps> = ({
  children,
}) => {
  return ReactDOM.createPortal(
    <div className="fixed top-[50%] left-[50%] z-50 w-[60vw] -translate-y-1/2 -translate-x-1/2 rounded-xl bg-yellow-200">
      {children}
    </div>,
    document.getElementById("overlays")!
  );
};

export interface ModalProps {
  children: React.ReactNode;
  onClick: () => void;
}

export const Modal: React.FunctionComponent<ModalProps> = ({
  children,
  onClick,
}) => {
  const [isBrowser, setIsBrowser] = useState<boolean>(false);

  useEffect(() => {
    setIsBrowser(typeof window !== "undefined");
  }, []);

  return isBrowser ? (
    <>
      <Backdrop onClick={onClick} />
      <ModalOverlay>{children}</ModalOverlay>
    </>
  ) : null;
};
