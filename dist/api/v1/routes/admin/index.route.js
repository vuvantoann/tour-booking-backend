"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tour_route_1 = require("./tour.route");
const routesV1Admin = (app) => {
    const version = '/api/v1/admin';
    app.use(version + '/tours', tour_route_1.tourRoutes);
};
exports.default = routesV1Admin;
