"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tour_route_1 = require("./tour.route");
const post_route_1 = require("./post.route");
const category_route_1 = require("./category.route");
const topic_route_1 = require("./topic.route");
const search_route_1 = require("./search.route");
const membership_route_1 = require("./membership.route");
const routesV1 = (app) => {
    const version = '/api/v1';
    app.use(version + '/tours', tour_route_1.tourRoutes);
    app.use(version + '/posts', post_route_1.postRoutes);
    app.use(version + '/categories', category_route_1.categoryRoutes);
    app.use(version + '/topics', topic_route_1.topicRoutes);
    app.use(version + '/search', search_route_1.searchRoutes);
    app.use(version + '/membership', membership_route_1.membershipRoutes);
};
exports.default = routesV1;
