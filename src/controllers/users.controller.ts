import { Request, Response, NextFunction} from 'express';
import User from '../models/users.models';


interface IupdateDate {
    username?: string,
    email?: string, 
    is_verify_email?: boolean,
    is_admin?: boolean

};

const getAllUsers = async (req:Request, res: Response, next: NextFunction) => {
    User.find()
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
    })
};

const getUser = async (req:Request, res: Response, next: NextFunction) => {
    try {
        const user = await User.findById({_id: req.params.id}).exec();
        if(user != null) {
           return res.status(200).setHeader('Content-Type', 'application/json').json(user).end();
        }
       return res.status(404).json({
            message: 'user not found'
        })
    } catch (error) {
        res.status(500).json(error)
    }
    
};

const deleteUser = async (req:Request, res: Response, next: NextFunction) => {
    try {
       const user = await await User.findById({_id: req.params.id}).exec();
       if(user == null) {
           return res.status(404).json({message: 'user not found'})
       }

       const deleteed = await User.deleteOne({_id: req.params.id})
       if(deleteed) {
           return res.status(200).json({
               message: 'success'
            })
       }
    } catch (error) {
        res.status(500).json(error)
    }
};

const updateUser = async ({
    filter,
    update,
}: {
    filter: string,
    update: boolean,
}) => {

    console.log(filter);
    const user = await User.updateOne({
        _id: filter,
        is_verify_email: update
    })

    console.log(user)
    return "ok";
};

export default {
    getAllUsers,
    getUser,
    deleteUser,
    updateUser
}
