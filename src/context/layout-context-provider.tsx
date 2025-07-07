import { ReactNode, useState } from "react";
import { ToastContainer, ToastOptions, toast } from "react-toastify";
import LayoutContext from "./layout-context";

type LayoutContextProviderProps = {
  children: React.ReactNode;
};

const LayoutContextProvider: React.FC<LayoutContextProviderProps> = ({
  children,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuLocked, setMenuLocked] = useState(false);

  const [subMenuOpen, setSubMenuOpen] = useState(false);

  const [activeView, setActiveView] = useState("contactInfo");

  const notify = (message: ReactNode, options?: ToastOptions) =>
    toast(message, {
      type: "error",
      theme: options?.type === "success" ? "light" : "colored",
      ...(options ?? {}),
    });

  return (
    <LayoutContext.Provider
      value={{
        menuOpen,
        setMenuOpen,
        menuLocked,
        setMenuLocked,
        subMenuOpen,
        setSubMenuOpen,
        activeView,
        setActiveView,
        notify,
      }}
    >
      <ToastContainer />
      {children}
    </LayoutContext.Provider>
  );
};

export default LayoutContextProvider;
