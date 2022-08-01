import { Document } from "mongoose";


export default interface Iotp extends Document {
    username: string;
    otp: string
}