import mongoose from 'mongoose';

let userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    favouriteLocations: [
        {
            city: { type: String, required: true },
            country: { type: String, required: true },
        }
    ]
});

const User = mongoose.model('User', userSchema);

export default User;