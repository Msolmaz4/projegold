import { createContext } from "react";
import type { User, Category } from "types";

export type UpgradeUser = {
  id: number;
  name: string;
  imageFile?: Blob | MediaSource | null;
  image?: Blob | MediaSource;
};

interface UserContextProps {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  deleteUser: (id: number) => void;
  updateUser: (payload: UpgradeUser) => void;
  categories: Category[];
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
}

const UserContext = createContext<UserContextProps>({
  users: [],
  setUsers: () => {},
  deleteUser: () => {},
  updateUser: () => {},
  categories: [],
  setCategories: () => {},
});

export default UserContext;
