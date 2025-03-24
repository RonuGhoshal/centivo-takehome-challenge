import mongoose from 'mongoose';
const { Schema, Types } = mongoose;

const userSchema = new Schema({
    _id: Types.ObjectId,
    name: String,
    email: String,
    age: Number
});

export default mongoose.model('User', userSchema);