import { createContext, useContext, useEffect, useState } from "react";
import type { User } from "../types/User.types";
import type { Category } from "../types";
import { Users, Categories as InitialCategories } from "../data";

type UserContextType = {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  deleteUser: (id: number) => void;
  updateUser: (payload: UpgradeUser) => void;
  categories: Category[];
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
};

type UpgradeUser = {
  id: number;
  name: string;
  imageFile?: Blob | MediaSource | null;
  image?: Blob | MediaSource;
};

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [users, setUsers] = useState<User[]>((Users as User[]) || []);

  const [categories, setCategories] = useState<Category[]>(
    InitialCategories || []
  );

  useEffect(() => {
    if (Users) setUsers(Users);
    if (InitialCategories) setCategories(InitialCategories);
  }, []);

  const deleteUser = (id: number) => {
    setUsers((prev) => prev.filter((user) => user.id !== id));
  };

  const updateUser = ({ id, name, image }: UpgradeUser) => {
    setUsers((prev) =>
      prev.map((user) => (user.id === id ? { ...user, name, image } : user))
    );
  };

  // console.log("usersContext", users);
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

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export default UserContext;
