import { configureStore } from '@reduxjs/toolkit';

import ListMovie from './reducer/ListMovie';
import Watching from './reducer/Watching';
const store = configureStore({
    reducer: {
        ListMovie: ListMovie.reducer,
        Watching: Watching.reducer,
    },
});
export default store;
