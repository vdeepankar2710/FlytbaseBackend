const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const Joi = require('joi');
const User = require('../models/user');
// Signup route


const userSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
    userId:Joi.number().required(),
});

const createUser = async (req, res)=>{
    const { username, password, userId } = req.body;
    const { error } = userSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const existingUser = await User.findOne({ username: username, userId:userId });
        if (existingUser) {
            return res.status(409).json({ error: 'Username already exists' });
        }

        const passwordHash = bcrypt.hashSync(password, 10);
        await User.create({ username: username, password: passwordHash, userId:userId});
        res.status(201).json({ message: 'User created successfully' });

    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const loginUser = async (req, res) => {
    const { username, password, userId } = req.body;

    const { error } = userSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    const user = await User.findOne({ username: username, userId:userId });
    if (!user) {
        return res.status(401).json({ error: 'Invalid username or password' });
    }
    const verifiedUser  = bcrypt.compareSync(password, user.password, function(err, res) {
                            if(err) {
                                console.log('Comparison error: ', err);
                            }
                        })
    if (!verifiedUser) {
        return res.status(401).json({ error: 'Invalid username or password' });
    }

    const token = jwt.sign({ id: user.id, username: user.username, userId:userId }, process.env.JWT_SECRET_KEY, { expiresIn: '3h' });

    res.status(200).json({ token: token });
};

module.exports = { createUser, loginUser };