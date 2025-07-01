
import { useState } from "react";

import type { User } from '../types'
import { Users } from '../data'
import { useGetUsersQuery } from "../app/userApi";


export const useUser = () => {

    console.log(Users, 'biyim data')
    const { data, isLoading, error } = useGetUsersQuery();
    //console.log(data)
    const [users, setUsers] = useState<User[]>();

    const deleteUser = async (id: number) => {
        console.log(id, "delerusecontext");

        const newData = users?.filter((user) => user.id !== id);
        setUsers(newData);
    };


    return {
        setUsers,
        users,
        isLoading,
        error,
        deleteUser,
    };


}