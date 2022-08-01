"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRouter = void 0;
const express_1 = require("express");
const users_controller_1 = __importDefault(require("../../controllers/users.controller"));
const usersRouter = () => {
    const routers = (0, express_1.Router)();
    // Find All User
    routers.get('/user/findall', users_controller_1.default.getAllUsers);
    // Get user by id
    routers.get('/user/:id', users_controller_1.default.getUser);
    // Delete User
    routers.delete('/user/:id', users_controller_1.default.deleteUser);
    return routers;
};
exports.usersRouter = usersRouter;
exports.default = exports.usersRouter;
