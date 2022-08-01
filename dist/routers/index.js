"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerRouter = void 0;
const express_1 = require("express");
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const dotenv_1 = require("dotenv");
const users_router_1 = __importDefault(require("./users/users.router"));
const auth_router_1 = __importDefault(require("./auth/auth.router"));
(0, dotenv_1.config)();
const MAX = Number(process.env.MAX_WINDOW_REQUEST_COUNT);
const WINDOWN = Number(process.env.WINDOW_DURATION_IN_SECOND);
const limitRequest = (0, express_rate_limit_1.default)({
    max: MAX,
    windowMs: WINDOWN,
    message: 'please wait...',
});
const registerRouter = () => {
    const router = (0, express_1.Router)();
    router.get('/', (req, res) => {
        res.render('./register/register.ejs');
    });
    router.get('/login', (req, res) => {
        res.render('./login/login.ejs');
    });
    // User Router
    router.use('/v1', (0, users_router_1.default)());
    // auth Router
    router.use('/auth', (0, auth_router_1.default)());
    return router;
};
exports.registerRouter = registerRouter;
exports.default = exports.registerRouter;
