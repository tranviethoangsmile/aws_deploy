"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_models_1 = __importDefault(require("../models/users.models"));
;
const getAllUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    users_models_1.default.find()
        .exec()
        .then(result => {
        return res.status(200).json({
            user: result,
            count: result.length
        });
    })
        .catch(err => {
        return res.status(500).json({
            message: err.message || 'không có dữ liệu'
        });
    });
});
const getUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield users_models_1.default.findById({ _id: req.params.id }).exec();
        if (user != null) {
            return res.status(200).setHeader('Content-Type', 'application/json').json(user).end();
        }
        return res.status(404).json({
            message: 'user not found'
        });
    }
    catch (error) {
        res.status(500).json(error);
    }
});
const deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield yield users_models_1.default.findById({ _id: req.params.id }).exec();
        if (user == null) {
            return res.status(404).json({ message: 'user not found' });
        }
        const deleteed = yield users_models_1.default.deleteOne({ _id: req.params.id });
        if (deleteed) {
            return res.status(200).json({
                message: 'success'
            });
        }
    }
    catch (error) {
        res.status(500).json(error);
    }
});
const updateUser = ({ filter, update, }) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(filter);
    const user = yield users_models_1.default.updateOne({
        _id: filter,
        is_verify_email: update
    });
    console.log(user);
    return "ok";
});
exports.default = {
    getAllUsers,
    getUser,
    deleteUser,
    updateUser
};
