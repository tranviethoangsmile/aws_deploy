import express, {Request, Response, NextFunction, Application, ErrorRequestHandler} from 'express';
import createHttpError from 'http-errors';
import { config } from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import router from './routers';
import bodyParser from 'body-parser';
import path from 'path';
config();
const env = process.env
const CONNECT_DB: string = String(env.URL_MONGOOSEDB)
const PORT: number = Number(env.PORT) || 3000;


const app: Application = express();

// app.use(expressLayouts);
app.use(cookieParser());
app.use(express.json());
app.use(cors());
app.use(router());
app.use(bodyParser())
app.use(bodyParser.json());
app.set("views", path.resolve(__dirname, "front-ends"));
app.set('view engine', 'ejs');
const publicPath = path.resolve(__dirname, "public");
app.use("/public", express.static(publicPath));
app.use(express.static(__dirname + '../public'));
mongoose 
 .connect(CONNECT_DB)   
 .then(() => console.log("Database connected!"))
 .catch(err => console.log(err.message));

app.use((req: Request, res: Response, next: NextFunction) => {
    next(new createHttpError.NotFound());
})

const errorHandler: ErrorRequestHandler = (err,req, res, next) => {
    res.status(err.status || 500)
    res.send({
        status: err.status || 500,
        message: err.message || 'Không tìm thấy',
    })
}

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`APP RUNNING ON ${PORT}`);
})