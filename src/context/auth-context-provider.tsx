import { useState, FC, ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "./auth-context";
import type { User } from "../types";
import { Users } from "../data";
type AuthContextProviderProps = {
  children: ReactNode;
};

const AuthContextProvider: FC<AuthContextProviderProps> = ({ children }) => {
  const [initAuth, setInitAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [userData, setUserData] = useState<User | null>(null);
  const [cognitoUser, setCognitoUser] = useState(null);
  const [globalSettings, setGlobalSettings] = useState(null);

  const navigate = useNavigate();

  const loginHandler = async (user: User) => {
    console.log(user, "authcontext");

    setIsLoading(true);

    try {
      const foundUser = Users.find(
        (u) => u.email === user.email && u.password === user.password
      );
      console.log(foundUser);

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

  const checkUserExists = async (username: string) => {
    // Kullanıcı var mı kontrol et, örnek false dönüyoruz
    return false;
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
        checkUserExists,
        cognitoUser,
        userData,
        globalSettings,
        setGlobalSettings,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
