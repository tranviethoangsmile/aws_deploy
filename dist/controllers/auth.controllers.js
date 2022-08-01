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
const bcrypt_1 = __importDefault(require("bcrypt"));
const users_models_1 = __importDefault(require("../models/users.models"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = require("dotenv");
const otp_generator_1 = __importDefault(require("otp-generator"));
const otp_controller_1 = __importDefault(require("../controllers/otp.controller"));
(0, dotenv_1.config)();
const SECRET_KEY = process.env.JWT_ACCESS_KEY;
const userRegister = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let { username, email, password } = req.body;
    console.log(username, email, password);
    const checkUser = yield users_models_1.default.findOne({
        username
    });
    if (checkUser) {
        return res.status(401).json({
            message: 'user already exists'
        });
    }
    const checkEmail = yield users_models_1.default.findOne({
        email
    });
    if (checkEmail) {
        return res.status(401).json({
            message: 'email already exists'
        });
    }
    const otp = otp_generator_1.default.generate(6, {
        digits: true,
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        specialChars: false,
    });
    console.log('OTP: >>', otp);
    const newOtp = yield otp_controller_1.default.createOtp({
        username,
        otp
    });
    console.log('OTP:>>', newOtp);
    const salt = yield bcrypt_1.default.genSalt(10);
    const hash = yield bcrypt_1.default.hash(password, salt);
    const user = new users_models_1.default({
        username: username,
        email: email,
        password: hash
    });
    return user.save()
        .then(result => {
        res.status(200).json({
            user: result,
        });
    })
        .catch(err => {
        res.status(500).json({
            message: err.message || 'không thành công',
        });
    });
});
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let { username, password } = req.body;
    try {
        const userLogin = yield users_models_1.default.findOne({ username: username });
        if (!userLogin) {
            res.status(404).json('wrong username!!!');
        }
        ;
        const validPassword = yield bcrypt_1.default.compare(password, userLogin.password);
        if (!validPassword) {
            res.status(404).json('wrong password!!!');
        }
        if (userLogin && validPassword) {
            const token = jsonwebtoken_1.default.sign({
                id: userLogin._id,
                admin: userLogin.is_admin,
            }, SECRET_KEY, {
                expiresIn: "30s"
            });
            res.status(200).json({ userLogin, token });
        }
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.default = {
    userRegister, login
};
