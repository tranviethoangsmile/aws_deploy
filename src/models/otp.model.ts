import mongoose, { Schema, model, Document } from 'mongoose';
import Iotp from '../interfaces/otp.interface';

const OtpSchema: Schema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    otp: {
        type: String,
        allowNull: false,
    },
    time: {
        type: Date, 
        default: Date.now(),
        index: {
            expires: 86400
        }
    }
}
);

export default mongoose.model<Iotp>('otps', OtpSchema);
