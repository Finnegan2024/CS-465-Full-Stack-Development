const mongoose = require('mongoose');
const User = require('../models/user');
const { rawListeners } = require('../models/travlr');
const passport = require('passport');

const register = async(req, res) => {
    // ensure all params are present
    if (!req.body.name || !req.body.email || !req.body.password) {
        return res.status(400).json({
            'message': 'All fields required'
        });
    }

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: ''
    });
    user.setPassword(req.body.password) // set user password
    const q = await user.save();

    if(!q) {
        // db return no data
        return res.status(400).json(err)
    } else {
        // return jwt
        const token = user.generateJWT();
        return res.status(200).json(token)
    }
};

const login = (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({
            'message': 'All fields required'
        });
    }
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return res.status(400).json(err);
        }
        if (user) {
            const token = user.generateJWT();
            res.status(200).json({ token });
        } else {
            res.status(400).json(info);
        }
    })(req, res);
};

module.exports = {
    register,
    login
};