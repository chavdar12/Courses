import { configureStore } from '@reduxjs/toolkit';
import { blogApi } from './api';

export const makeStore = () =>
    configureStore({
        reducer: { [blogApi.reducerPath]: blogApi.reducer },
        middleware: (getDefault) => getDefault().concat(blogApi.middleware),
    });
