import { useState, FC, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "./auth-context";
import type { User } from "../types";
import CryptoJS from "crypto-js";

import { useUserContext } from "../hooks/user/useUserContext";
type AuthContextProviderProps = {
  children: ReactNode;
};

const AuthContextProvider: FC<AuthContextProviderProps> = ({ children }) => {
  const { users } = useUserContext();
  const [initAuth, setInitAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [userData, setUserData] = useState<User | null>(null);
  const [cognitoUser, setCognitoUser] = useState(null);

  const navigate = useNavigate();

  const loginHandler = async (user: User) => {
    setIsLoading(true);

    try {
      const foundUser = users.find(
        (u) =>
          u.email == user.email &&
          u.password == CryptoJS.SHA256(user.password).toString()
      );
      console.log(foundUser, "auth");
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
    // Kullanıcı verisini yenilemek için işlev ekle
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
        cognitoUser,
        userData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
