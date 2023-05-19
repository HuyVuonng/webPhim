import config from '../config';

import Home from '../Pages/Home';
import Movie from '../Pages/Movie';

const publicRoutes = [
    { path: config.routes.movie, component: Movie },
    { path: config.routes.home, component: Home },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
