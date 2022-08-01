import { Request, Response, NextFunction} from 'express';
import _Otp from '../models/otp.model';
import _User from '../models/users.models';
import usersController from '../controllers/users.controller'
import bcrypt from 'bcrypt';


const createOtp =  async ({username, otp}: {username: string, otp: string}) => {
        const salt = await bcrypt.genSalt(10);
        const hastOtp = await bcrypt.hash(otp, salt);
        const OTP = await _Otp.create(
            {
                username: username,
                otp: hastOtp
            }
        )
        return OTP ? 1 : 0
};


const verifyOtp = async (req: Request, res: Response, next: NextFunction) => {
    const {otp, username} = req.body
    const otpData = await _Otp.find({
        username
    })

    if(!otpData.length){
      return res.status(401).json({
            message: 'user not found'
        })
    }

    const lastOtp = otpData[otpData.length - 1];
    const isValid = await bcrypt.compare(otp, lastOtp.otp);

    if(!isValid) {
        res.status(401).json({
            message: 'invalid OTP!!!'
        })
    }

    const modifiUser = await _User.findOne({
        username
    })

    const user = await usersController.updateUser({filter: modifiUser._id , update: true});
    console.log(user);
   return res.status(200).json({
        elements: user
    })
}



export default {
    createOtp,
    verifyOtp
}
