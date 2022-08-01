import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/users.models';
import jwt from 'jsonwebtoken'
import { config } from 'dotenv';
import OtpGenerator from 'otp-generator';
import otpControll from '../controllers/otp.controller';

config();
const SECRET_KEY: string = process.env.JWT_ACCESS_KEY
const userRegister = async (req:Request, res: Response, next: NextFunction) => {
    let { username, email, password } = req.body;
    console.log(username, email, password);
    
    const checkUser = await User.findOne(
        {
        username
        }
    )
    if(checkUser) {
        return res.status(401).json({
            message: 'user already exists'
        })
    }

    const checkEmail = await User.findOne({
        email
    })

    if(checkEmail) {
        return res.status(401).json({
            message: 'email already exists'
        })
    }

    const otp = OtpGenerator.generate(6,{
        digits: true,
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        specialChars: false,
    })

    console.log('OTP: >>', otp);

    const newOtp = await otpControll.createOtp({
        username,
        otp
    })

    console.log('OTP:>>', newOtp);


    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = new User({
        username: username,
        email: email,
        password: hash
    })

    return user.save()
    .then(result => {
        res.status(200).json({
            user: result,
        });
    })
    .catch(err => {
        res.status(500).json({
            message: err.message || 'không thành công',
        })
    })
};

const login = async (req:Request, res: Response, next: NextFunction) => {
    let { username, password} = req.body;
    try {
        const userLogin = await User.findOne({ username: username})

        if(!userLogin){
             res.status(404).json('wrong username!!!')
        };

        const validPassword = await bcrypt.compare(password, userLogin.password)

        if(!validPassword){
            res.status(404).json('wrong password!!!')
        }

        if(userLogin && validPassword) {
            const token = jwt.sign({
                id: userLogin._id,
                admin: userLogin.is_admin,
            },SECRET_KEY, {
                expiresIn: "30s"
            })
            res.status(200).json({userLogin, token})
        }
    } catch (error) {
        res.status(500).json(error);
    }
  
}

export default {
    userRegister,login
}