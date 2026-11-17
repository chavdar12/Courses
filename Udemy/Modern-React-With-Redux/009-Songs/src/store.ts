import { configureStore, createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type Song = { title: string; duration: string };

export const songs: Song[] = [
    { title: 'Morning Commit', duration: '3:12' },
    { title: 'Merge Conflict Blues', duration: '4:05' },
    { title: 'Green Build', duration: '2:47' },
    { title: 'Friday Deploy', duration: '3:58' },
];

const songsSlice = createSlice({
    name: 'songs',
    initialState: { list: songs, selected: null as Song | null },
    reducers: {
        selectSong(state, action: PayloadAction<Song>) {
            state.selected = action.payload;
        },
    },
});

export const { selectSong } = songsSlice.actions;
export const songsReducer = songsSlice.reducer;

export const makeStore = () => configureStore({ reducer: { songs: songsReducer } });
export type RootState = ReturnType<ReturnType<typeof makeStore>['getState']>;
