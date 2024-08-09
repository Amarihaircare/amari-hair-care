import { useContext, createContext } from "react";

export interface ModalContextType {
  modal?: {
    title: string;
    description: string;
    variant: "success" | "error" | "warning";
  };
  setModal: React.Dispatch<
    React.SetStateAction<ModalContextType["modal"] | undefined>
  >;
}

export const ModalContext = createContext<ModalContextType | null>(null);

export const useModal = () => {
  const context = useContext(ModalContext);

  if (context === null) {
    throw new Error("useModal must be used within a ModalProvider");
  }

  return context;
};
