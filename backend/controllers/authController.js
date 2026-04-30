import User from '../models/user.js'
import jwt from 'jsonwebtoken';

const maxAge = 24 * 60 * 60

const createJWT = id => {
    return jwt.sign({ id }, 'chatroom secret', {
        expiresIn: maxAge // token expiration time calculated in seconds
    })
}

//Error handling
const alertError = (err) => {
    let errors = { name: '', phone: '' }
    console.log('err message',err.message);
    console.log('err code',err.code);
    
    if (err.message.includes('user validation failed')) {

        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message
        })
    }
    return errors
}

export const signup = async (req, res) => {
    const { name, phone} = req.body;
    try {
        const user = await User.create({ name, phone });
        const token = createJWT(user._id);
        // create a jwt cookie that expires after 1 day
	    // expiration date calculated in miliseconds
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
        res.status(201).json({ user });
    } catch (error) {
        let errors = alertError(error);
        res.status(400).json({ errors });
    }
}

export const login = async (req, res) => {
    const { name, phone } = req.body;
    try {
        const user = await User.login(name, phone );
        const token = createJWT(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
        res.status(201).json({ user });
    } catch (error) {
        let errors = alertError(error);
        res.status(400).json({ errors });
    }
}

export const verifyUser = (req, res, next)=>{
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token,'chatroom secret',async (err,decodedToken)=>{
            if(err){
                console.log(err.message);
            }else{
                let user = await User.findById(decodedToken.id);
                res.json(user);
                next();
            }
        })
    }else{
        next();
    }
}

export const logout = (req, res) => {
    res.cookie('jwt',"",{maxAge:1});
    res.status(200).json({logout: true});
}