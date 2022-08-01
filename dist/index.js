"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_errors_1 = __importDefault(require("http-errors"));
const dotenv_1 = require("dotenv");
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const routers_1 = __importDefault(require("./routers"));
const body_parser_1 = __importDefault(require("body-parser"));
const path_1 = __importDefault(require("path"));
(0, dotenv_1.config)();
const env = process.env;
const CONNECT_DB = String(env.URL_MONGOOSEDB);
const PORT = Number(env.PORT) || 3000;
const app = (0, express_1.default)();
// app.use(expressLayouts);
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use((0, routers_1.default)());
app.use((0, body_parser_1.default)());
app.use(body_parser_1.default.json());
app.set("views", path_1.default.resolve(__dirname, "front-ends"));
app.set('view engine', 'ejs');
const publicPath = path_1.default.resolve(__dirname, "public");
app.use("/public", express_1.default.static(publicPath));
app.use(express_1.default.static(__dirname + '../public'));
mongoose_1.default
    .connect(CONNECT_DB)
    .then(() => console.log("Database connected!"))
    .catch(err => console.log(err.message));
app.use((req, res, next) => {
    next(new http_errors_1.default.NotFound());
});
const errorHandler = (err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        status: err.status || 500,
        message: err.message || 'Không tìm thấy',
    });
};
app.use(errorHandler);
app.listen(PORT, () => {
    console.log(`APP RUNNING ON ${PORT}`);
});
