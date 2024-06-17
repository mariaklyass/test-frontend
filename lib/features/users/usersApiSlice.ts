// import {
//   createSelector,
//   createEntityAdapter,
//   EntityState,
// } from "@reduxjs/toolkit";
// import { apiSlice } from "../api/apiSlice";

// export interface User {
//   id: string;
//   full_name: string;
//   login: string;
//   name: string;
// }

// export interface UsersResponse {
//   users: User[];
// }

// const usersAdapter = createEntityAdapter<User>({});

// const initialState = usersAdapter.getInitialState();

// export const usersApiSlice = apiSlice.injectEndpoints({
//   endpoints: (builder) => ({
//     getUsers: builder.query({
//       query: () => "/users",
//       validateStatus: (response, result) => {
//         return response.status === 200 && !result.isError;
//       },
//       transformResponse: (responseData) => {
//         const loadedUsers = responseData.map((user) => {
//           user.id = user.login;
//           return user;
//         });
//         return usersAdapter.setAll(initialState, loadedUsers);
//       },
//       providesTags: (result, error, arg) => {
//         if (result?.ids) {
//           return [
//             { type: "User", id: "LIST" },
//             ...result.ids.map((id) => ({ type: "User", id })),
//           ];
//         } else return [{ type: "User", id: "LIST" }];
//       },
//     }),
//   }),
// });

// export const { useGetUsersQuery } = usersApiSlice;

// export const selectUsersResult = usersApiSlice.endpoints.getUsers.select();

// const selectUsersData = createSelector(
//   selectUsersResult,
//   (usersResult) => usersResult.data
// );

// export const {
//   selectAll: selectAllUsers,
//   selectById: selectUserById,
//   selectIds: selectUserIds,
// } = usersAdapter.getSelectors(
//   (state) => selectUsersData(state) ?? initialState
// );
