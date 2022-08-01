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
const otp_model_1 = __importDefault(require("../models/otp.model"));
const users_models_1 = __importDefault(require("../models/users.models"));
const users_controller_1 = __importDefault(require("../controllers/users.controller"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const createOtp = ({ username, otp }) => __awaiter(void 0, void 0, void 0, function* () {
    const salt = yield bcrypt_1.default.genSalt(10);
    const hastOtp = yield bcrypt_1.default.hash(otp, salt);
    const OTP = yield otp_model_1.default.create({
        username: username,
        otp: hastOtp
    });
    return OTP ? 1 : 0;
});
const verifyOtp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { otp, username } = req.body;
    const otpData = yield otp_model_1.default.find({
        username
    });
    if (!otpData.length) {
        return res.status(401).json({
            message: 'user not found'
        });
    }
    const lastOtp = otpData[otpData.length - 1];
    const isValid = yield bcrypt_1.default.compare(otp, lastOtp.otp);
    if (!isValid) {
        res.status(401).json({
            message: 'invalid OTP!!!'
        });
    }
    const modifiUser = yield users_models_1.default.findOne({
        username
    });
    const user = yield users_controller_1.default.updateUser({ filter: modifiUser._id, update: true });
    console.log(user);
    return res.status(200).json({
        elements: user
    });
});
exports.default = {
    createOtp,
    verifyOtp
};
