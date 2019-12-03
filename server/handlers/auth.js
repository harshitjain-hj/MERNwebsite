const db = require('../models');

exports.register = async (req, res, next) => {
    try {
        const user = await db.User.create(req.body);
        // sanatizing the post 
        const { id, username } = user;

        // 201 user successfully registered
        res.status(201).json({ id, username});
    } catch (err) {
        if(err.code === 11000) {
            err.message = 'Sorry, that username is already taken';
        }

        next(err);
    }
};

exports.login = async (req, res, next) => {
    try {
        const user = await db.User.findOne({ username: req.body.username });
        const {id, username} = user;
        const valid = await user.comparePassword(req.body.password);

        if(valid) {
            res.json({
                id,
                username
            });
        } else {
            throw new Error('Invalid Username/Password');
        }

    } catch (err) {
    err.message = 'Invalid Username/Password'

        next(err);
    }
};