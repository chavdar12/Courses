import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const API_URL: string = import.meta.env.VITE_API_URL ?? 'http://localhost:3001';

export type Stream = { id: number; title: string; description: string; userId: string };
export type StreamInput = Pick<Stream, 'title' | 'description'>;

export const streamsApi = createApi({
    reducerPath: 'streamsApi',
    baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
    tagTypes: ['Stream'],
    endpoints: (build) => ({
        getStreams: build.query<Stream[], void>({
            query: () => '/streams',
            providesTags: ['Stream'],
        }),
        getStream: build.query<Stream, number>({
            query: (id) => `/streams/${id}`,
            providesTags: ['Stream'],
        }),
        createStream: build.mutation<Stream, StreamInput & { userId: string }>({
            query: (body) => ({ url: '/streams', method: 'POST', body }),
            invalidatesTags: ['Stream'],
        }),
        editStream: build.mutation<Stream, StreamInput & { id: number }>({
            query: ({ id, ...body }) => ({ url: `/streams/${id}`, method: 'PATCH', body }),
            invalidatesTags: ['Stream'],
        }),
        deleteStream: build.mutation<void, number>({
            query: (id) => ({ url: `/streams/${id}`, method: 'DELETE' }),
            invalidatesTags: ['Stream'],
        }),
    }),
});

export const {
    useGetStreamsQuery,
    useGetStreamQuery,
    useCreateStreamMutation,
    useEditStreamMutation,
    useDeleteStreamMutation,
} = streamsApi;
