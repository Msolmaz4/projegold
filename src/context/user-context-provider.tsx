import { FC, ReactNode, useEffect, useState } from "react";
import type { User, Category } from "../types";
import { Users, Categories as InitialCategories } from "../data";
import UserContext from "./user-context";
export type UpgradeUser = {
  id: number;
  name: string;
  imageFile?: Blob | MediaSource | null;
  image?: Blob | MediaSource;
};
interface UserContextProviderProps {
  children: ReactNode;
}

const UserContextProvider: FC<UserContextProviderProps> = ({ children }) => {
  const [users, setUsers] = useState<User[]>((Users as User[]) || []);
  const [categories, setCategories] = useState<Category[]>(
    InitialCategories || []
  );
  console.log(Users, "check imported users");
  useEffect(() => {
    if (Users) setUsers(Users);
    if (InitialCategories) setCategories(InitialCategories);
  }, []);
  console.log(users, "ddddd");

  const deleteUser = (id: number) => {
    setUsers((prev) => prev.filter((user) => user.id !== id));
  };

  const updateUser = ({ id, name, image }: UpgradeUser) => {
    setUsers((prev) =>
      prev.map((user) => (user.id === id ? { ...user, name, image } : user))
    );
  };

  return (
    <UserContext.Provider
      value={{
        users,
        setUsers,
        deleteUser,
        updateUser,
        categories,
        setCategories,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
