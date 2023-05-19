import { createSlice } from '@reduxjs/toolkit';

const ListMovie = createSlice({
    name: 'hobbys',
    initialState: {
        MovieHomeListRecomment: [],
        TVHomeList: [],
        MovieHomeListTrending: [],
        MovieHomeList: [],
    },
    reducers: {
        ADD_MovieHomeListRecoment: (state, action) => {
            state.MovieHomeListRecomment = action.payload;
        },
        ADD_TVHomeList: (state, action) => {
            state.TVHomeList = action.payload;
        },
        ADD_MovieHomeListTrending: (state, action) => {
            state.MovieHomeListTrending = action.payload;
        },
        ADD_MovieHomeList: (state, action) => {
            state.MovieHomeList = action.payload;
        },
    },
});

export default ListMovie;
