import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const API_URL = 'https://jsonplaceholder.typicode.com';

export type Post = { id: number; userId: number; title: string; body: string };
export type User = { id: number; name: string };

export const blogApi = createApi({
    reducerPath: 'blogApi',
    baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
    endpoints: (build) => ({
        getPosts: build.query<Post[], void>({ query: () => '/posts?_limit=10' }),
        // RTK Query caches per argument: ten posts by one author fetch that user once
        getUser: build.query<User, number>({ query: (id) => `/users/${id}` }),
    }),
});

export const { useGetPostsQuery, useGetUserQuery } = blogApi;
