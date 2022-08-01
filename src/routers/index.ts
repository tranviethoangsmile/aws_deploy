import { Router } from "express";
import rateLimit from 'express-rate-limit';
import { config } from 'dotenv';
import usersRouter from './users/users.router'
import authRouter from './auth/auth.router'
config();
const MAX:number = Number(process.env.MAX_WINDOW_REQUEST_COUNT);
const WINDOWN:number = Number(process.env.WINDOW_DURATION_IN_SECOND);

const limitRequest = rateLimit({
    max:  MAX,
    windowMs: WINDOWN,
    message: 'please wait...',
})
export const registerRouter = () => {
    const router = Router();
    router.get('/', (req, res) => {
        res.render('./register/register.ejs')
    })

    router.get('/login', (req, res) => {
        res.render('./login/login.ejs');
    })
    // User Router
    router.use('/v1',usersRouter())
    // auth Router
    router.use('/auth',authRouter())

    return router;
}

export default registerRouter;
