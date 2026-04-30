import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter a name'],
        unique: true
    },
    phone: {
        type: String,
        required: [true, 'Please enter a valid phone number'],
        unique: true,
        // Ensures the string has exactly 10 characters
        minLength: [10, 'Model number must have minimum 10 digits'],
        maxLength: [10, 'Model number must have maximum 10 digits'],
        // Ensures all characters are numeric digits
        match: [/^\d{10}$/, 'Model number must only contain 10 digits']        
    },
    socketID: {
        type: String,
        default: null
    },
})

userSchema.statics.login = async function (name, phone){
    const user = await this.findOne({name});
    if(user){
        if(phone === user.phone){
            return user;
        }else{
            throw Error('Incorrect phone number');
        }
    }else{
        throw Error('Incorrect user name');
    }
}

const User = mongoose.model('user', userSchema);
module.exports = User;