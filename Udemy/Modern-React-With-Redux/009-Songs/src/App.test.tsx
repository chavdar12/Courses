import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import App from './App';
import { makeStore, selectSong, songs, songsReducer } from './store';

test('selectSong stores the selected song', () => {
    const state = songsReducer(undefined, selectSong(songs[2]));
    expect(state.selected).toEqual(songs[2]);
    expect(state.list).toBe(songs);
});

test('lists the songs and shows the one the user selects', async () => {
    render(
        <Provider store={makeStore()}>
            <App />
        </Provider>,
    );
    expect(screen.getAllByRole('listitem')).toHaveLength(songs.length);
    expect(screen.getByText('Select a song')).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: 'Select Green Build' }));
    expect(screen.getByRole('region', { name: 'Details' })).toHaveTextContent(
        'Green BuildLength: 2:47',
    );
});
