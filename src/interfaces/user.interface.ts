import { Document } from "mongoose";


export default interface Iuser extends Document {
    username: string;
    email: string;
    password: string;
    is_admin?: boolean;
}