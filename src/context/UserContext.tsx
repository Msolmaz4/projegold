import { createContext, useContext, useEffect, useState } from "react";
import type { User } from "../types";
import { Users } from "../data";

type UserContextType = {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  deleteUser: (id: number) => void;
 upgrdateUser: (payload: UpgradeUser) => void;
};

type UpgradeUser = {
  id:number,
  name:string,
  image: File | null | string
}
 




const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [users, setUsers] = useState<User[]>(Users|| []);

  useEffect(() => {
    if(Users) setUsers(Users);
     
  }, []);

  const deleteUser = (id: number) => {
    setUsers(prev => prev.filter(user => user.id !== id));
  };

  

  const upgrdateUser = ({id,name,image}  : UpgradeUser)=>{
  setUsers(prev => {
    if (!prev) return [];
    return prev.map(user => (user.id === id ? { ...user, name, image } : user));
  });
  }

  return (
    <UserContext.Provider value={{ users, setUsers, deleteUser,upgrdateUser }}>
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