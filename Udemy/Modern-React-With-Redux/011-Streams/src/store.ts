import { configureStore, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { streamsApi } from './api';

// stand-in for the course's Google OAuth: signing in just stores a user id
const authSlice = createSlice({
    name: 'auth',
    initialState: { userId: null as string | null },
    reducers: {
        signIn(state, action: PayloadAction<string>) {
            state.userId = action.payload;
        },
        signOut(state) {
            state.userId = null;
        },
    },
});

export const { signIn, signOut } = authSlice.actions;
export const authReducer = authSlice.reducer;

export const makeStore = () =>
    configureStore({
        reducer: { auth: authReducer, [streamsApi.reducerPath]: streamsApi.reducer },
        middleware: (getDefault) => getDefault().concat(streamsApi.middleware),
    });

export type RootState = ReturnType<ReturnType<typeof makeStore>['getState']>;
export const useUserId = () => useSelector((state: RootState) => state.auth.userId);
