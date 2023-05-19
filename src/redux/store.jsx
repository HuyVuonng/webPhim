import { configureStore } from '@reduxjs/toolkit';

import ListMovie from './reducer/ListMovie';
const store = configureStore({
    reducer: {
        ListMovie: ListMovie.reducer,
    },
});
export default store;
