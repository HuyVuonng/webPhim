import config from '../config';

import Home from '../Pages/Home';

const publicRoutes = [{ path: config.routes.home, component: Home }];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
