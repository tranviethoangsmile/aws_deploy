import mongoose, { Schema, model, Document } from 'mongoose';
import Iuser from '../interfaces/user.interface';

const UserSchema: Schema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        allowNull: false,
        required: true,
    },
    is_admin: {
        type: Boolean,
        default: false
    },
    is_verify_email: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true
}
);

export default mongoose.model<Iuser>('User', UserSchema);
