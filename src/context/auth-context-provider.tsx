import { FC, ReactNode, useCallback, useEffect, useState } from "react";
import {
  confirmSignUp,
  fetchAuthSession,
  fetchUserAttributes,
  getCurrentUser,
  signOut,
} from "aws-amplify/auth";
import * as Sentry from "@sentry/react";
import {
  CognitoUserGroup,
  CurrentCognitoUserType,
  GlobalSettings,
  User,
} from "types";
import { getGlobalSettings } from "modules/basedata/globalsettings/api";
import { getUserRoleName } from "modules/usermanagement/roles/api";
import { getUser } from "modules/usermanagement/users/api";
import AuthContext from "./auth-context";
import utils from "utils";

type AuthContextProviderProps = {
  children: ReactNode;
};

const AuthContextProvider: FC<AuthContextProviderProps> = ({ children }) => {
  const [initAuth, setInitAuth] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [cognitoUser, setCognitoUser] = useState<CurrentCognitoUserType | null>(
    null,
  );
  const [userData, setUserData] = useState<User | null>(null);
  const [globalSettings, setGlobalSettings] = useState<GlobalSettings | null>(
    null,
  );

  const logoutHandler = async () => {
    await signOut();
    setCognitoUser(null);
    setUserData(null);
    setIsAuth(false);
  };

  const checkUserExists = (username: string) => {
    return new Promise<boolean>((resolve, reject) => {
      const code = "000000";
      confirmSignUp({
        username,
        confirmationCode: code,
        options: {
          // If set to False, the API will throw an AliasExistsException error if the phone number/email used already exists as an alias with a different user
          forceAliasCreation: false,
        },
      })
        .then((data) => utils.logger.info(data))
        .catch((err) => {
          switch (err.code) {
            case "UserNotFoundException":
              resolve(false);
              break;
            case "NotAuthorizedException":
              resolve(true);
              break;
            case "AliasExistsException":
              // Email alias already exists
              resolve(true);
              break;
            case "CodeMismatchException":
              resolve(true);
              break;
            case "ExpiredCodeException":
              resolve(true);
              break;
            default:
              reject("No case found for confirmSignUp()");
          }
        });
    });
  };

  const getUserSignedInAndAttributes = async () => {
    try {
      const [authSession, currentUser, userAttributes] = await Promise.all([
        fetchAuthSession(),
        getCurrentUser(),
        fetchUserAttributes(),
      ]);

      if (authSession.tokens) {
        return {
          isSignedIn: true,
          currentUser: currentUser,
          userAttributes: userAttributes,
        };
      }

      return {
        isSignedIn: false,
        currentUser: null,
        userAttributes: null,
      };
    } catch {
      return {
        isSignedIn: false,
        currentUser: null,
        userAttributes: null,
      };
    }
  };

  const loadUserGlobalSettings = useCallback(
    async (userID: string | undefined) => {
      try {
        if (userID) {
          const userData = await getUser(userID);
          console.log("User data loaded: ", userData);
          setUserData(userData);
          Sentry.setUser(userData);
        }

        const globalSettings = await getGlobalSettings();

        console.log("globalSettings data loaded: ", globalSettings);

        setGlobalSettings(globalSettings);
      } catch (err) {
        console.log("Error in loadUserGlobalSettings: ", err);
      }
    },
    [],
  );

  const loginHandler = useCallback(async () => {
    const { isSignedIn, currentUser, userAttributes } =
      await getUserSignedInAndAttributes();

    if (!isSignedIn || !currentUser || !userAttributes) {
      setCognitoUser(null);
      setUserData(null);
      setIsAuth(false);
      return;
    }

    const userID = userAttributes["custom:userID"];

    console.log("Loading user data for userID: ", userID);

    await loadUserGlobalSettings(userID);

    const group = userAttributes["custom:group"];

    const userGroups: CognitoUserGroup[] = group
      ? group.split(",").map((groupItem) => {
          return {
            groupID: groupItem,
            groupName: getUserRoleName(groupItem),
          };
        })
      : [];

    const currentUserGroup = userAttributes["custom:currentGroup"];

    const currentGroup: CognitoUserGroup = {
      groupID: currentUserGroup ?? "Admin",
      groupName: getUserRoleName(currentUserGroup ?? "Admin"),
    };

    const currentCognitoUser: CurrentCognitoUserType = {
      username: currentUser.username,
      salutation: userAttributes.gender
        ? (userAttributes.gender as "Mr" | "Mrs")
        : "Mr",
      customUsername: userAttributes["custom:username"] ?? "",
      userSUB: currentUser.userId,
      firstName: userAttributes.given_name ?? "",
      lastName: userAttributes.family_name ?? "",
      phone: userAttributes.phone_number ?? "",
      fax: userAttributes["custom:fax"] ?? "",
      email: userAttributes.email ?? "",
      emailVerified: userAttributes.email_verified === "true" ? true : false,
      currentGroup: currentGroup,
      groups: userGroups,
      userID: userID ?? "",
    };

    setCognitoUser(currentCognitoUser);
    setIsAuth(true);
  }, [loadUserGlobalSettings]);

  const reloadUserData = async () => {
    await loginHandler();
  };

  const initAuthProcess = useCallback(async () => {
    setIsLoading(true);
    await loginHandler();
    setIsLoading(false);
    setInitAuth(true);
  }, [loginHandler]);

  useEffect(() => {
    initAuthProcess();
  }, [initAuthProcess]);

  return (
    <AuthContext.Provider
      value={{
        initAuth: initAuth,
        isLoading: isLoading,
        loginHandler: loginHandler,
        logoutHandler: logoutHandler,
        reloadUserData: reloadUserData,
        checkUserExists: checkUserExists,
        isAuth: isAuth,
        cognitoUser: cognitoUser,
        userData: userData,
        globalSettings: globalSettings,
        setGlobalSettings: setGlobalSettings,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
