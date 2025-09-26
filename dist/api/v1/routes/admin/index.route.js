"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tour_route_1 = require("./tour.route");
const category_route_1 = require("./category.route");
const auth_route_1 = require("./auth.route");
const routesV1Admin = (app) => {
    const version = '/api/v1/admin';
    app.use(version + '/tours', tour_route_1.tourRoutes);
    app.use(version + '/categories', category_route_1.categoryRoutes);
    app.use(version + '/auth', auth_route_1.authRoutes);
};
exports.default = routesV1Admin;
