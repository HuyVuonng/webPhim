import config from '../config';

import Home from '../Pages/Home';
import Movie from '../Pages/Movie';

const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.movie, component: Movie },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
