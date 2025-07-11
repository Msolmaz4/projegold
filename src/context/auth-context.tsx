import { createContext } from "react";
import type {
  AuthDataProps,
  CurrentCognitoUserType,
  GlobalSettings,
  User,
} from "../types";

interface ContextProps extends AuthDataProps {
  initAuth: boolean;
  isLoading: boolean;
  isAuth: boolean;
  loginHandler: (user: Partial<User>) => Promise<void>;
  logoutHandler: () => Promise<void>;
  reloadUserData: () => void;
  checkUserExists: (username: string) => Promise<boolean>;
  cognitoUser: CurrentCognitoUserType | null;
  userData: User | null;
  globalSettings: GlobalSettings | null;
  setGlobalSettings: (value: GlobalSettings | null) => void;
}

const AuthContext = createContext<ContextProps>({
  initAuth: false,
  isLoading: false,
  isAuth: false,
  loginHandler: async () => {},
  logoutHandler: async () => {},
  reloadUserData: async () => {},
  checkUserExists: () => {
    return new Promise((resolve) => {
      resolve(false);
    });
  },
  cognitoUser: null,
  userData: null,
  globalSettings: null,
  setGlobalSettings: () => {},
});

export default AuthContext;
