"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const auth_controllers_1 = __importDefault(require("../../controllers/auth.controllers"));
const otp_controller_1 = __importDefault(require("../../controllers/otp.controller"));
const authRouter = () => {
    const routers = (0, express_1.Router)();
    routers.post('/register', auth_controllers_1.default.userRegister);
    routers.post('/login', auth_controllers_1.default.login);
    routers.post('/otp/verify', otp_controller_1.default.verifyOtp);
    return routers;
};
exports.authRouter = authRouter;
exports.default = exports.authRouter;
