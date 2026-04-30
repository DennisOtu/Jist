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
        minLength: [10, 'Phone number must be 10 digits long'],
        maxLength: [10, 'Phone number must be 10 digits long'],
        // Ensures all characters are numbers
        match: [/^\d{10}$/, 'Phone number must contain only numerical values']        
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

export default User