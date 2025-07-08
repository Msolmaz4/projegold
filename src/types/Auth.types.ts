import type { User } from "./User.types";

export interface CurrentData {
  id: string;
  name: string;
}

export interface CognitoUserGroup {
  groupID: string;
  groupName: string;
}

export interface CurrentCognitoUserType {
  username: string;
  salutation: "Mr" | "Mrs";
  customUsername: string;
  userSUB: string;
  firstName: string;
  lastName: string;
  phone: string;
  fax: string;
  email: string;
  emailVerified: boolean;
  currentGroup: CognitoUserGroup;
  groups: CognitoUserGroup[];
  userID: string;
}

export interface GlobalSettings {
  language: string;
  timezone: string;
  dateFormat: string;
}

export interface AuthDataProps {
  isLoading: boolean;
  isAuth: boolean;
  cognitoUser: CurrentCognitoUserType | null;
  userData: User | null;
}

export interface LoginErrorType {
  code?: string;
  stack?: string;
  errno?: number;
  message?: string;
}
