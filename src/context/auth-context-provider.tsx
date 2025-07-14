import { useState, type FC, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "./auth-context";
import type { User } from "../types";
import CryptoJS from "crypto-js";
import { useUserContext } from "hooks";


type AuthContextProviderProps = {
  children: ReactNode;
};

const AuthContextProvider: FC<AuthContextProviderProps> = ({ children }) => {
  const { users } = useUserContext();
  const [initAuth, setInitAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [userData, setUserData] = useState<User | null>(null);

  const navigate = useNavigate();

  const loginHandler = async (user: Partial<User>) => {
    setIsLoading(true);
    const hashedPassword = CryptoJS.SHA256(user.password ?? "").toString();
    try {
      if (!user.email || !user.password) {
        throw new Error("E-Mail oder Passwort fehlt.");
      }

      const foundUser = users.find(
        (u) => u.email === user.email && u.password === hashedPassword
      );

      if (foundUser) {
        setUserData(foundUser);
        setIsAuth(true);
        setInitAuth(true);
        navigate("/");
      } else {
        throw new Error("Ungültige E-Mail oder Passwort.");
      }
    } catch (error) {
      console.error("Login failed", error);
      setUserData(null);
      setIsAuth(false);
      setInitAuth(true);
      alert("E-Mail oder Passwort ist falsch.");
    } finally {
      setIsLoading(false);
    }
  };

  const logoutHandler = async () => {
    setIsLoading(true);
    try {
      setUserData(null);
      setIsAuth(false);
      setInitAuth(true);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  const reloadUserData = () => {
    // users data add uprdade
  };

  return (
    <AuthContext.Provider
      value={{
        initAuth,
        isLoading,
        isAuth,
        loginHandler,
        logoutHandler,
        reloadUserData,
        userData,
        checkUserExists: async () => false,
        cognitoUser: null,
        globalSettings: null,
        setGlobalSettings: () => {},
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
