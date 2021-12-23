import {createRouter, createWebHashHistory} from "vue-router";
const ROUTE_NAME_PREFIX = 'route_name';
const PAGE_REGEX_FILE = /\.vue$/;
/**
 *
 * @type {Array<import('vue-router').RouteRecordRaw>}
 */
let routes = [];
const pagesContext = require.context("../pages", true, /\.vue$/);
const getRouteByName = (name, routesList = routes) => {
    let find = null;
    routesList.forEach((r) => {
        if (r.name === name) {
            find = r;
        } else if (Array.isArray(r.children)) {
            find = getRouteByName(name, r.children);
        }
    });
    return find;
}

const normalizeRoutePath = (routePath) => {
    const withoutSuffix = routePath.replace(PAGE_REGEX_FILE, "");
    if (withoutSuffix.startsWith("_")) {
        return withoutSuffix.replace(/^_/, ":");
    }
    return withoutSuffix;
}

const addRoute = (paths, fullPath, parentRoute = {}) => {
    const routePath = paths[0];
    const normalizedRoutePath = normalizeRoutePath(routePath);
    const routeName = parentRoute.name ? `${parentRoute.name}_${normalizedRoutePath}` : `${ROUTE_NAME_PREFIX}_${normalizedRoutePath}`;
    if (routePath) {
        let route = getRouteByName(routeName, routes);
        if (route) {
            // route already add, continue with children
            route.children = route.children || [];
            addRoute(paths.slice(1), fullPath, route);
        } else {
            // add new route
            route = {
                name: routeName,
                path: normalizedRoutePath === 'index' ? "" : normalizedRoutePath
            };

            if (PAGE_REGEX_FILE.test(routePath)) {
                route.component = pagesContext(fullPath).default;
            } else {
                route.component = require("../components/Page.vue").default;
                route.children = route.children || [];
                addRoute(paths.slice(1), fullPath, route);
            }
            if (Array.isArray(parentRoute.children)) {
                parentRoute.children.push(route);
            } else {
                route.path = `/${route.path}`;
                routes.push(route);
            }
        }
    }
}

((context) => {
    context.keys().reverse().forEach(key => {
        if (key) {
            const paths = key.split("/").filter(p => p !== ".");
            addRoute(paths, key);
        }
    });
})(pagesContext);

// noinspection JSCheckFunctionSignatures
const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        ...routes,
        {
            name: "NotFound",
            path: "/:pathMatch(.*)*",
            component: import(/* webpackChunkName: 'page-not-found' */ "../components/NotFound.vue")
        }
    ],
});
export default router;
