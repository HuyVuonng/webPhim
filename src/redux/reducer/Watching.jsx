import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import httpRequest from '../../httpRequest/httprequest';

const Watching = createSlice({
    name: 'hobbys',
    initialState: {
        MovieInfor: [],
        IdYT: [],
        Cast: [],
        KeyWords: [],
        Recommend: [],
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMovieInfor.fulfilled, (state, action) => {
                state.MovieInfor = action.payload;
            })
            .addCase(fetchIdYT.fulfilled, (state, action) => {
                state.IdYT = action.payload;
            })
            .addCase(fetchCast.fulfilled, (state, action) => {
                state.Cast = action.payload;
            })
            .addCase(fetchKeyWords.fulfilled, (state, action) => {
                state.KeyWords = action.payload;
            })
            .addCase(fetchRecommend.fulfilled, (state, action) => {
                state.Recommend = action.payload;
            })
            .addCase(fetchTVInfor.fulfilled, (state, action) => {
                state.MovieInfor = action.payload;
            })
            .addCase(fetchIdYTTVShow.fulfilled, (state, action) => {
                state.IdYT = action.payload;
            })
            .addCase(fetchCastTVSHow.fulfilled, (state, action) => {
                state.Cast = action.payload;
            })
            .addCase(fetchKeyWordsTVSHow.fulfilled, (state, action) => {
                state.KeyWords = action.payload;
            })
            .addCase(fetchRecommendTVShow.fulfilled, (state, action) => {
                state.Recommend = action.payload;
            });
    },
});

export const fetchMovieInfor = createAsyncThunk('watching/fetchMovieInfor', async (id) => {
    const res = await httpRequest.get(`/movie/${id}`, { params: { api_key: import.meta.env.VITE_API_Key } });
    document.title = res.data.original_title;
    return res.data;
});
export const fetchIdYT = createAsyncThunk('watching/fetchIdYT', async (id) => {
    const res = await httpRequest.get(`/movie/${id}/videos`, {
        params: { api_key: import.meta.env.VITE_API_Key },
    });
    const idYTFetch = res.data.results.find((item) => item.type === 'Trailer');

    return idYTFetch ? idYTFetch : '';
});
export const fetchCast = createAsyncThunk('watching/fetchCast', async (id) => {
    const res = await httpRequest.get(`/movie/${id}/credits`, {
        params: { api_key: import.meta.env.VITE_API_Key },
    });
    return res.data.cast;
});
export const fetchKeyWords = createAsyncThunk('watching/fetchKeyWords', async (id) => {
    const res = await httpRequest.get(`/movie/${id}/keywords`, {
        params: { api_key: import.meta.env.VITE_API_Key },
    });
    return res.data.keywords;
});
export const fetchRecommend = createAsyncThunk('watching/fetchRecommend', async (id) => {
    const res = await httpRequest.get(`/movie/${id}/similar`, {
        params: { api_key: import.meta.env.VITE_API_Key },
    });
    return res.data.results;
});

// tvShow
export const fetchTVInfor = createAsyncThunk('watching/fetchTVInfor', async (id) => {
    const res = await httpRequest.get(`/tv/${id}`, { params: { api_key: import.meta.env.VITE_API_Key } });
    document.title = res.data.original_name;
    return res.data;
});
export const fetchIdYTTVShow = createAsyncThunk('watching/fetchIdYTTVShow', async (id) => {
    const res = await httpRequest.get(`/tv/${id}/videos`, {
        params: { api_key: import.meta.env.VITE_API_Key },
    });
    const idYTFetch = res.data.results.find((item) => item.type === 'Trailer');

    return idYTFetch ? idYTFetch : '';
});
export const fetchCastTVSHow = createAsyncThunk('watching/fetchCastTVSHow', async (id) => {
    const res = await httpRequest.get(`/tv/${id}/credits`, {
        params: { api_key: import.meta.env.VITE_API_Key },
    });
    return res.data.cast;
});
export const fetchKeyWordsTVSHow = createAsyncThunk('watching/fetchKeyWordsTVSHow', async (id) => {
    const res = await httpRequest.get(`/tv/${id}/keywords`, {
        params: { api_key: import.meta.env.VITE_API_Key },
    });
    return res.data.keywords;
});
export const fetchRecommendTVShow = createAsyncThunk('watching/fetchRecommendTVShow', async (id) => {
    const res = await httpRequest.get(`/tv/${id}/similar`, {
        params: { api_key: import.meta.env.VITE_API_Key },
    });
    return res.data.results;
});

export default Watching;
