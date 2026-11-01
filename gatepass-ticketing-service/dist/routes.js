"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = require("express");
const router_1 = require("./app/Health/router");
exports.routes = (0, express_1.Router)();
exports.routes.use("/health", router_1.healthRouter);
//# sourceMappingURL=routes.js.map