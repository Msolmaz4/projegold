import { ReactNode, createContext } from "react";
import { ToastOptions } from "react-toastify";

interface LayoutContextProps {
  activeView: string;
  setActiveView: (view: string) => void;
  menuOpen: boolean;
  setMenuOpen: (value: boolean) => void;
  menuLocked: boolean;
  setMenuLocked: (value: boolean) => void;
  subMenuOpen: boolean;
  setSubMenuOpen: (value: boolean) => void;
  notify: (message: ReactNode, options?: ToastOptions) => number | string;
}

const LayoutContext = createContext<LayoutContextProps>({
  activeView: "contactInfo",
  setActiveView: () => {},
  menuOpen: true,
  setMenuOpen: () => {},
  menuLocked: true,
  setMenuLocked: () => {},
  subMenuOpen: false,
  setSubMenuOpen: () => {},
  notify: () => "",
});

export default LayoutContext;
