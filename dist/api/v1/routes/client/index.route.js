"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tour_route_1 = require("./tour.route");
const post_route_1 = require("./post.route");
const category_route_1 = require("./category.route");
const routesV1 = (app) => {
    const version = '/api/v1';
    app.use(version + '/tours', tour_route_1.tourRoutes);
    app.use(version + '/posts', post_route_1.postRoutes);
    app.use(version + '/categories', category_route_1.categoryRoutes);
};
exports.default = routesV1;
