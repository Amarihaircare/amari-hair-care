"use client";

import { ModalContext, ModalContextType } from "@/hooks/useModal";
import { useState } from "react";
import Modal from "../shared/Modal";

interface ModalProviderProps {
  children: React.ReactNode;
}

export const ModalProvider = ({ children }: ModalProviderProps) => {
  const [modal, setModal] = useState<ModalContextType["modal"]>();

  return (
    <ModalContext.Provider
      value={{
        modal,
        setModal,
      }}
    >
      {children}
      {modal && <Modal />}
    </ModalContext.Provider>
  );
};
