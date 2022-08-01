import { Router } from 'express';
import authControllers from '../../controllers/auth.controllers';
import otpControll from '../../controllers/otp.controller';

export const authRouter = () => {
    const routers = Router();

    routers.post('/register', authControllers.userRegister)

    routers.post('/login', authControllers.login)

    routers.post('/otp/verify', otpControll.verifyOtp)

    return routers;
}

export default authRouter;