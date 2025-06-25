import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { User } from '../type';

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com' }),
  tagTypes: ['Users'], 
  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      query: () => 'users',
      providesTags: ['Users'],
    }),

    deleteUsers: builder.mutation<void, number>({
      query: (id) => ({
        url: `users/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Users'],
    }),
  }),
});


export const { useGetUsersQuery, useDeleteUsersMutation } = usersApi;
