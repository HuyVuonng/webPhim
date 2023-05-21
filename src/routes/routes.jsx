import React from 'react';
import config from '../config';

// import Home from '../Pages/Home';
// import Movie from '../Pages/Movie';
// import TV from '../Pages/TV';
// import Country from '../Pages/Country';
// import Genre from '../Pages/Genre/Genre';
// import Search from '../Pages/Search';

const Home = React.lazy(() => import('../Pages/Home'));
const Movie = React.lazy(() => import('../Pages/Movie'));
const TV = React.lazy(() => import('../Pages/TV'));
const Country = React.lazy(() => import('../Pages/Country'));
const Genre = React.lazy(() => import('../Pages/Genre'));
const Search = React.lazy(() => import('../Pages/Search'));
const Watch = React.lazy(() => import('../Pages/Watch'));

const publicRoutes = [
    { path: config.routes.movie, component: Movie },
    { path: config.routes.tv, component: TV },
    { path: config.routes.country, component: Country },
    { path: config.routes.genre, component: Genre },
    { path: config.routes.search, component: Search },
    { path: config.routes.watch, component: Watch },
    { path: config.routes.home, component: Home },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
