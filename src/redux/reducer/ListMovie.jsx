import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import httpRequest from '../../httpRequest/httprequest';

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
    extraReducers: (builder) => {
        builder
            .addCase(fetchMovieHomeListRecomment.fulfilled, (state, action) => {
                state.MovieHomeListRecomment = action.payload;
            })
            .addCase(fetchTVHomeList.fulfilled, (state, action) => {
                state.TVHomeList = action.payload;
            })
            .addCase(fetchMovieHomeListTrending.fulfilled, (state, action) => {
                state.MovieHomeListTrending = action.payload;
            })
            .addCase(fetchMovieHomeList.fulfilled, (state, action) => {
                state.MovieHomeList = action.payload;
            });
    },
});

export const fetchMovieHomeListRecomment = createAsyncThunk('home/fetchMovieHomeListRecomment', async () => {
    const res = await httpRequest.get('/movie/popular', { params: { api_key: import.meta.env.VITE_API_Key } });
    return res.data.results;
});
export const fetchTVHomeList = createAsyncThunk('home/fetchTVHomeList', async () => {
    const res = await httpRequest.get('/discover/tv', { params: { api_key: '7e4b5abe1ead162fa4cdab607fce59c0' } });

    return res.data.results;
});
export const fetchMovieHomeListTrending = createAsyncThunk('home/fetchMovieHomeListTrending', async () => {
    const res = await httpRequest.get('/trending/movie/day', {
        params: { api_key: '7e4b5abe1ead162fa4cdab607fce59c0' },
    });
    return res.data.results;
});
export const fetchMovieHomeList = createAsyncThunk('home/fetchMovieHomeList', async () => {
    const res = await httpRequest.get('/movie/now_playing', {
        params: { api_key: '7e4b5abe1ead162fa4cdab607fce59c0' },
    });
    return res.data.results;
});

export default ListMovie;
